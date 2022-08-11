import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { sendNotification } from "../../../store/reducers/notification/ActionCreators";
import { adminePanelSlice } from "../../../store/reducers/adminePanel/AdminPanelReducer";
import { isError, isType } from "../../../utils/objIsType";
import TradeMatch from "../../../services/TradeMatch/TradeMatchItem";
import { firestoreDb } from "../../../services/Firebase";
import { useAppDispatch } from "../../../hooks/redux";
import PATHS from "../../../const/link";

// Components
import { Form } from "../";
import { UploadImage, SelectType } from "../../";

// Types
import { ITrader } from "../../../interface/tradeMatch";
import { IOption } from "../../../interface/components";
import { IFirestorUpdateModelTrader, IFirestorModelTrader } from "../../../interface/firestoreModel";


const SUPPORT_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/svg"]

interface IUpdateTraderFormProps {
  trader?: ITrader;
}

type Inputs = {
  name: string;
  type: IOption;
  image: { file: File | undefined; update: boolean } | undefined;
};

const schema = yup.object().shape({
    name: yup.string().typeError("Should be a string").required("Field required"),
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

const UpdateTraderForm = (props: IUpdateTraderFormProps) => {
	const { trader } = props;
	const tradeMatch = new TradeMatch("trader/");
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
	const typeSelectName: keyof Inputs = "type";
	const imageInputName: keyof Inputs = "image";

	const setType = async(trader: ITrader) => {
		const typeRef = firestoreDb.getDocRef("type/", trader.type);
		const type = await firestoreDb.getDoc(typeRef);
		if (!isType(type, ["id", "value"])) return;
		setValue("type", {
			id: type.id,
			label: type.value
		});
	}

	useEffect(() => {
		if (!trader) return;
		if(!getValues("name")) setValue("name", trader.name);
		if(!getValues("type")) setType(trader);
	}, [trader, watch(["type"])]);
	

	const onSubmit = async (data: Inputs) => {
		try {
			if (!trader) return;
			const updateData: IFirestorUpdateModelTrader = {};
			if (trader.name !== data.name) updateData.name = data.name;
			if (data.type.id && trader.type !== data.type.id) updateData.type = data.type.id;
			if ( data.image?.update && !data.image?.file) {
				return setError("image.file", {
					type: "File required", 
					message: "Field required"
				});
			}
			tradeMatch.upadateItem<IFirestorModelTrader, IFirestorUpdateModelTrader>(trader.id, updateData, {
				file: data.image?.file,
				imageUrl: data.image?.update 
					?  trader.imgUrl 
					: undefined,
			});
			navigate(`/${ PATHS.adminPanell }/${ PATHS.traderList }`);
			dispatch(sendNotification("Trader updated", "SUCCESS"));
			dispatch(adminePanelSlice.actions.traderReset());
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
						placeholder="Input trader name"
						{...register("name")}
						/>
					),
					error: errors.name?.message
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
						existImage={trader?.imgUrl}
						/>
					),
					error: errors.image?.file?.message,
					insideLabel: false
				},
				{
					label: "Type",
					body: <SelectType
						name={typeSelectName}
						selectedOption={ getValues(typeSelectName) }
						setSelectedOption={ (option: IOption) => {
							setValue(typeSelectName, option, { shouldValidate: true });
						} }
					/>,
					error: errors.type?.value?.message
				}
			]}
			onSubmit={ handleSubmit(onSubmit) }
		/>
	);
};

export default UpdateTraderForm;