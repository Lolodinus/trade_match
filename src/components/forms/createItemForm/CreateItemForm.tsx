import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { sendNotification } from "../../../store/reducers/notification/ActionCreators";
import { adminePanelSlice } from "../../../store/reducers/adminePanel/AdminPanelReducer";
import { useAppDispatch } from "../../../hooks/redux";
import TradeMatchItem from "../../../services/TradeMatch/TradeMatchItem";
import { getRandomNumber } from "../../../utils/getRandomNumber";

// Components
import { Form } from "../";
import { UploadImage, SelectItem, SelectType } from "../../";

// Types
import {
	IFirestorModelItem,
	IFirestorUpdateModelItem
} from "../../../interface/firestoreModel";
import { IOption } from "../../../interface/components";


const SUPPORT_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/svg"];

const schema = yup.object().shape({
    title: yup.string()
		.typeError("Should be a string")
		.min(3, "Min length 3")
		.max(20, "Max length 20")
		.required("Field required"),
	price: yup.number().typeError("Should be a number").required("Field required"),
    image: yup.object({
        file: yup
            .mixed()
            .required("Field required")
            .test(
                "FILE_SIZE", 
                "Uploaded file is too big.", 
                (value) => {
                    return !value || (value && value.size <= 4 * 1024 * 1024)
                }
            )
            .test(
                "FILE_FORMAT", 
                "The file format is not supported. The file should be an image.", 
                (value) => {
                    return !value || (value && SUPPORT_FORMATS.includes(value.type))
                }
            ),
        update: yup.boolean().required(),
    }).required("Field required"),
    type: yup.object({
        value: yup.string().required("Field required"),
        id: yup.string()
    }).required("Field required"),
}).required();

type Inputs = {
	title: string;
	price: number;
	image: { file: File | undefined; update: boolean } | undefined;
	type: IOption;
	childItem?: IOption;
	parentItem?: IOption;
};

const CreateItemForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		getValues,
		setError,
		clearErrors,
		reset
	} = useForm<Inputs>({
        resolver: yupResolver(schema),
    });
	const selectTypeName: keyof Inputs = "type";
	const selectChildItemName: keyof Inputs = "childItem";
	const selectParentItemName: keyof Inputs = "parentItem";
	const imageInputName: keyof Inputs = "image";
	
	const dispatch = useAppDispatch();
	const tradeMatch = new TradeMatchItem("item/");

	const onSubmit = async (data: Inputs) => {
		try {
			let item: IFirestorModelItem = {
				title: data.title,
				price: +data.price,
				type: data.type?.id,
				random: {
					0: getRandomNumber(1000),
					1: getRandomNumber(1000),
					2: getRandomNumber(1000)
				}
			};
			
			if (data.childItem) item = { ...item, child: data.childItem.id };
			if (data.parentItem) item = { ...item, parent: data.parentItem.id };
			tradeMatch.createItem<IFirestorModelItem, IFirestorUpdateModelItem>(
			item,
			data.image?.file,
			{}
			);
			reset();
			dispatch(
				sendNotification(
					"Item created", 
					"SUCCESS"
				)
			);
			dispatch(adminePanelSlice.actions.itemReset());
		} catch (error) {
			dispatch(
				sendNotification(
					"Error. Failed to create item.", 
					"FAIL"
				)
			);
		}
	};

	return (
		<Form
			btnName={"Create"}
			fields={[
				{
					label: "Title",
					body: (
						<input
							type="text"
							placeholder="Input title"
							{...register("title")}
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
							{...register("price")}
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
						/>
					),
					error: errors.image?.file?.message
				},
				{
					label: "Type",
					body: (
						<SelectType
							name={selectTypeName}
							selectedOption={ getValues(selectTypeName) }
							setSelectedOption={(option: IOption) => {
								clearErrors(selectTypeName);
								setValue(selectTypeName, option, { shouldValidate: true });
							}}
							onBlurSelectHandler= { (isOpen) => {
								if (!getValues(selectTypeName) && !isOpen) {
									setError(
										selectTypeName,
										{ type: "empty field", message: "Field Required"},
										{ shouldFocus: true }
									);
								};
							}}
						/>
					),
					error: errors.type?.message || errors.type?.value?.message
				},
				{
					label: "Parent Item",
					body: (
						<SelectItem
							name={selectParentItemName}
							selectedOption={ getValues(selectParentItemName) }
							setSelectedOption={ (option: IOption) => {
								setValue(selectParentItemName, option, { shouldValidate: true });
							} }
							exceptions={ [getValues(selectChildItemName)?.id] }
						/>
					)
				},
				{
					label: "Child Item",
					body: (
						<SelectItem
							name={selectChildItemName}
							selectedOption={ getValues(selectChildItemName)}
							setSelectedOption={(option: IOption) => {
								setValue(selectChildItemName, option, { shouldValidate: true });
							}}
							exceptions={ [getValues(selectParentItemName)?.id] }
						/>
					)
				}
			]}
			onSubmit={handleSubmit(onSubmit)}
		/>
	);
};

export default CreateItemForm;
