import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import TradeMatchItem from "../../services/TradeMatch/TradeMatchItem";
import { firestoreDb } from "../../services/firebase";
import { transformDataToType } from "../../services/firebase/transformData";

// Components
import { Form, UploadImage, Select } from "../";

// Types
import {
  IFirestorModelItem,
  IFirestorUpdateModelItem
} from "../../interface/firestoreModel";

type Inputs = {
  title: string;
  price: number | string;
  image: { file: File | undefined; update: boolean } | undefined;
  type: string | undefined;
};

const CreateItemForm = () => {
  const [types, setTypes] = useState<string[] | undefined>();

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
  const selectName: keyof Inputs = "type";
  const imageInputName: keyof Inputs = "image";

  const tradeMatch = new TradeMatchItem("item/");

  const onSubmit = async (data: any) => {
    let item: IFirestorModelItem = {
      title: data.title,
      price: data.price,
      type: data.type
    };
    tradeMatch.createItem<IFirestorModelItem, IFirestorUpdateModelItem>(
      item,
      data.image.file,
      {}
    );
    reset();
  };
  const fetchTypeOption = async () => {
    const data = await firestoreDb.getDocs("type");
    return transformDataToType(data);
  };
  useEffect(() => {
    fetchTypeOption()
      .then((types) => {
        setTypes(
          types.map((type) => {
            return type.value;
          })
        );
      })
      .catch((error) => console.log(error));
  }, []);
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
                  value: 12,
                  message: "Max length 12"
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
          body: types ? (
            <Select
              name={selectName}
              placeHolder={"Select item type"}
              options={types}
              selectedOption={getValues(selectName)}
              setSelectedOption={(value: string | undefined) => {
                setValue(selectName, value, { shouldValidate: true });
              }}
              setError={(message) => {
                setError(
                  "type",
                  { type: "empty field", message },
                  { shouldFocus: true }
                );
              }}
              clearErrors={() => clearErrors(selectName)}
              option={{
                required: true
              }}
            />
          ) : null,
          error: errors.type?.message
        }
      ]}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default CreateItemForm;
