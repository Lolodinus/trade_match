import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { sendNotification } from "../../../store/reducers/notification/ActionCreators";
import { adminePanelSlice } from "../../../store/reducers/adminePanel/AdminPanelReducer";
import TradeMatchItem from "../../../services/TradeMatch/TradeMatchItem";
import { getRandomNumber } from "../../../utils/getRandomNumber";
import { useAppDispatch } from "../../../hooks/redux";

// Components
import { Form, SelectType, UploadImage } from "../../";

// Types
import { IOption } from "../../../interface/components";
import {
    IFirestorModelTrader,
    IFirestorUpdateModelTrader
} from "../../../interface/firestoreModel";


const SUPPORT_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/svg"];

const schema = yup.object().shape({
    traderName: yup.string().typeError("Should be a string").required("Field required"),
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
    }).required(),
    type: yup.object({
        value: yup.string().required("Field required"),
        id: yup.string()
    }).required("Field required"),
}).required();

type Inputs = {
    traderName: string;
	image: { file: File | undefined; update: boolean } | undefined;
	type: IOption;
};

const CreateTraderForm = () => {
    const dispatch = useAppDispatch();
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
	const typeSelectName: keyof Inputs = "type";
	const imageInputName: keyof Inputs = "image";
	const tradeMatch = new TradeMatchItem("trader/");

	const onSubmit = async (data: Inputs) => {
		try {
			let item: IFirestorModelTrader = {
				name: data.traderName,
				type: data.type?.id,
				random: {
					0: getRandomNumber(1000),
					1: getRandomNumber(1000),
					2: getRandomNumber(1000)
				}
			};
			tradeMatch.createItem<IFirestorModelTrader, IFirestorUpdateModelTrader>(
			item,
			{},
			data.image?.file,
			);
			reset();
			dispatch(
				sendNotification(
					"Trader created", 
					"SUCCESS"
				)
			);
			dispatch(adminePanelSlice.actions.traderReset());
		} catch (error) {
			dispatch(
				sendNotification(
					"Error. Failed to create trader.", 
					"FAIL"
				)
			);
		}
	};

    return(
        <Form 
            btnName="Create"
            onSubmit={handleSubmit(onSubmit)}
            fields={[
				{
					label: "Trader name",
					body: (
                        <input
                            type="text"
                            placeholder="Input trader name"
                            {...register("traderName")}
                        />
                    ),
					error: errors.traderName?.message
				},
				{
					label: "Trader Image",
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
					label: "Trader Type",
					body: (
                        <SelectType
                            name={typeSelectName}
                            selectedOption={ getValues(typeSelectName) }
                            setSelectedOption={(option: IOption) => {
                                clearErrors(typeSelectName);
                                setValue(typeSelectName, option, { shouldValidate: true });
                            }}
                            onBlurSelectHandler= { (isOpen) => {
                            	if (!getValues(typeSelectName) && !isOpen) {
                            		setError(
                            			typeSelectName,
                            			{ type: "empty field", message: "Field Required"},
                            			{ shouldFocus: true }
                            		);
                            	};
                            }}
					    />
                    ),
					error: errors.type?.value?.message
				},
            ]}
        />
    );
}


export default CreateTraderForm;