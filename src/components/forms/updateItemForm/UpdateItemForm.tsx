import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import TradeMatch from "../../../services/TradeMatch/TradeMatchItem";
import { firestoreDb } from "../../../services/Firebase";
import { adminePanelSlice } from "../../../store/reducers/adminePanel/AdminPanelReducer";
import PATHS from "../../../const/link";

// Components
import { Form } from "../";
import { UploadImage, SelectItem, SelectType } from "../../";

// Types
import { IItem } from "../../../interface/tradeMatch";
import { IOption } from "../../../interface/components";
import { IFirestorUpdateModelItem, IFirestorModelItem } from "../../../interface/firestoreModel";
import { isError, isItem, isType } from "../../../utils/objIsType";
import { useAppDispatch } from "../../../hooks/redux";
import { sendNotification } from "../../../store/reducers/notification/ActionCreators";


const SUPPORT_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/svg"]
interface IUpdateItemFormProps {
  item: IItem | undefined;
}
type Inputs = {
  title: string;
  price: number;
  type: IOption;
  childItem?: IOption,
  parentItem?: IOption,
  image: { file: File | undefined; update: boolean } | undefined;
};

const schema = yup.object().shape({
    title: yup.string()
		.typeError("Should be a string")
		.min(3, "Min length 3")
		.max(20, "Max length 20")
		.required("Field required"),
	price: yup.number()
		.typeError("Should be a number")
		.required("Field required"),
    image: yup.object({
        file: yup
            .mixed()
            .test(
                "FILE_SIZE", 
                "Uploaded file is too big.", 
                (value) => {
                    return !value || (value && value.size <= 4 * 1024 * 1024)
                }
            )
            .test(
                "FILE_FORMAT", 
                "Uploaded file is too big.", 
                (value) => {
                    return !value || (value && SUPPORT_FORMATS.includes(value.type))
                }
            ),
        update: yup.boolean().required(),
    }).required(),
    type: yup.object({
        value: yup.string(),
        id: yup.string()
    }),
}).required();

const UpdateItemForm = (props: IUpdateItemFormProps) => {
	const { item } = props;
	const tradeMatch = new TradeMatch("item/");
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		setValue,
		setError,
		watch
	} = useForm<Inputs>({
		defaultValues: {
			image: {
				file: undefined,
				update: false
			},
		},
        resolver: yupResolver(schema),
    });
	const selectTypeName: keyof Inputs = "type";
	const selectChildItemName: keyof Inputs = "childItem";
	const selectParentItemName: keyof Inputs = "parentItem";
	const imageInputName: keyof Inputs = "image";

	const setType = async(item: IItem) => {
		const typeRef = firestoreDb.getDocRef("type/", item.type);
		const type = await firestoreDb.getDoc(typeRef);
		if (!isType(type, ["id", "value"])) return;
		setValue("type", {
			id: type.id,
			label: type.value
		});
	}

	const setItem = async(item: IItem, type: "child" | "parent") => {
		if ( type === "child" && item.child) {
			const itemRef = firestoreDb.getDocRef("item/", item.child);
			const itemDoc = await firestoreDb.getDoc(itemRef);
			if (!isItem(itemDoc, ["id", "title"])) return;
			setValue("childItem", {
				id: itemDoc.id,
				label: `${itemDoc.title} (${itemDoc.id})`
			});
		}
		if ( type === "parent" && item.parent) {
			const itemRef = firestoreDb.getDocRef("item/", item.parent);
			const itemDoc = await firestoreDb.getDoc(itemRef);
			if (!isItem(itemDoc, ["id", "title"])) return;
			setValue("parentItem", {
				id: itemDoc.id,
				label: `${itemDoc.title} (${itemDoc.id})`
			});
		}
	}

	useEffect(() => {
		if (!item) return;
		if(!getValues("title")) setValue("title", item.title);
		if(!getValues("price")) setValue("price", item.price);
		if(!getValues("type")) setType(item);
		if(!getValues("childItem") && item.child) setItem(item, "child");
		if(!getValues("parentItem") && item.parent) setItem(item, "parent");
	}, [item, watch(["type", "childItem"])]);
	

	const onSubmit = async (data: Inputs) => {
		try {
			if (!item) return;
			const updateData: IFirestorUpdateModelItem = {};
			if (item.title !== data.title) updateData.title = data.title;
			if (item.price !== data.price) updateData.price = +data.price;
			if (data.type.id && item.type !== data.type.id) updateData.type = data.type.id;
			if (data.childItem?.id && item.child !== data.childItem.id) updateData.child = data.childItem.id;
			if (data.parentItem?.id && item.parent !== data.parentItem.id) updateData.parent = data.parentItem.id;
			if ( data.image?.update && !data.image?.file) {
				return setError("image.file", {
					type: "File required", 
					message: "Field required"
				});
			}
			tradeMatch.upadateItem<IFirestorModelItem, IFirestorUpdateModelItem>(item.id, updateData, {
				file: data.image?.file,
				imageUrl: data.image?.update 
					?  item.imgUrl 
					: undefined,
			});
			navigate(`/${PATHS.adminPanell}`);
			dispatch(sendNotification("Item updated", "SUCCESS"));
			dispatch(adminePanelSlice.actions.itemReset());
		} catch (error) {
			dispatch(sendNotification("Error. Failed to update item.", "FAIL"));
		}
	};

	return (
		<Form
			btnName={"Update"}
			fields={[
				{
					label: "Title",
					body: (
						<input
							type="text"
							placeholder="Input title"
							{...register("title", {
								required: "Required field",
								minLength: {
								value: 3,
								message: "Min length 3"
								},
								maxLength: {
								value: 20,
								message: "Max length 20"
								}
							})}
						/>
					),
					error: errors.title?.message
				},
				{
					label: "Price",
					body: (
						<input
							type="number"
							placeholder="Input price"
							{...register("price", {
								required: "Required field",
								maxLength: {
								value: 12,
								message: "Max length 12"
								}
							})}
						/>
					),
					error: errors.price?.message
				},
				{
					label: "Image",
					body: (
						<UploadImage
							name={imageInputName}
							imageFile={getValues(imageInputName)}
							setImageFile={(
								value: { file: File | undefined; update: boolean } | undefined
							) => {
								setValue(imageInputName, value, { shouldValidate: true });
							}}
							existImage={item?.imgUrl}
						/>
					),
					error: errors.image?.file?.message,
					insideLabel: false
				},
				{
					label: "Type",
					body: <SelectType
						name={selectTypeName}
						selectedOption={ getValues(selectTypeName) }
						setSelectedOption={ (option: IOption) => {
							setValue(selectTypeName, option, { shouldValidate: true });
						} }
					/>,
					error: errors.type?.message
				},
				{
					label: "Parent Item",
					body: <SelectItem
						name={selectParentItemName}
						selectedOption={ getValues(selectParentItemName) }
						setSelectedOption={ (option: IOption) => {
							setValue(selectParentItemName, option, { shouldValidate: true });
						} }
						exceptions={ [item?.id, getValues(selectChildItemName)?.id] }
					/>
				},
				{
					label: "Child Item",
					body: <SelectItem
						name={selectChildItemName}
						selectedOption={ getValues(selectChildItemName) }
						setSelectedOption={ (option: IOption) => {
							setValue(selectChildItemName, option, { shouldValidate: true });
						} }
						exceptions={ [item?.id, getValues(selectParentItemName)?.id] }
					/>
				}
			]}
			onSubmit={handleSubmit(onSubmit)}
		/>
	);
};

export default UpdateItemForm;
