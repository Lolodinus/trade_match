import React from "react";
import { useForm } from "react-hook-form";
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
import { isError } from "../../../utils/objIsType";
import { useAppDispatch } from "../../../hooks/redux";
import { sendNotification } from "../../../store/reducers/notification/ActionCreators";

type Inputs = {
	title: string;
	childItem?: IOption,
	parentItem?: IOption,
	price: number;
	image: { file: File | undefined; update: boolean } | undefined;
	type: IOption;
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
	} = useForm<Inputs>();
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
						option={{
							maxSize: 1024 * 1024 * 4,
							allowedExtantion: [".jpeg", ".jpg", ".png", ".svg"]
						}}
						setError={(message) => {
							setError(
							"image.file",
							{ type: "file", message },
							{ shouldFocus: true }
							);
						}}
						/>
					),
					error: errors.image?.file?.message
				},
				{
					label: "Type",
					body: <SelectType
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
						exceptions={ [getValues(selectChildItemName)?.id] }
					/>
				},
				{
					label: "Child Item",
					body: <SelectItem
						name={selectChildItemName}
						selectedOption={ getValues(selectChildItemName)}
						setSelectedOption={(option: IOption) => {
							setValue(selectChildItemName, option, { shouldValidate: true });
						}}
						exceptions={ [getValues(selectParentItemName)?.id] }
					/>
				}
			]}
			onSubmit={handleSubmit(onSubmit)}
		/>
	);
};

export default CreateItemForm;
