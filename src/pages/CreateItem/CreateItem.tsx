import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { firestoreDb } from "../../services/firebase";
import { transformDataToType } from "../../services/firebase/transformData";
import tradeMatch from "../../services/tradeMatch";

// Components
import { Button, UploadImage, Select } from "../../components";

// Styles
import styles from "./CreateItem.module.scss";

// Types
import IOption from "../../interface/select";
import { IImageFile } from "../../components/uploadImage/UploadImage";
import { ISelectedOption } from "../../components/select/Select";
import {
  IFirestorModelItem,
  IFirestorUpdateModelItem
} from "../../interface/firestoreModel";
type Inputs = {
  title: string;
  price: number;
};
interface IErrorMessageProps {
  error: { message?: string };
}

const ErrorMessage = (props: IErrorMessageProps) => {
  const {
    error: { message }
  } = props;
  return <div className={styles.error}>{message || "Error"}</div>;
};

const CreateItem = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();
  const [types, setTypes] = useState<IOption[] | undefined>();
  const [imageFile, setImageFile] = useState<IImageFile | undefined>();
  const [selectedType, setSelectedType] = useState<
    ISelectedOption | undefined
  >();
  const formRef = useRef<HTMLFormElement | null>(null);
  useEffect(() => {
    if (types) return;
    fetchTypeOption()
      .then((types) => {
        setTypes(types);
      })
      .catch((error) => console.log(error));
  });
  const onSubmit = async (data: any) => {
    if (!imageFile?.file) {
      return setImageFile({
        file: undefined,
        error: { message: "Field requered" }
      });
    }
    if (!selectedType?.option) {
      return setSelectedType({
        option: undefined,
        error: { message: "Field requered" }
      });
    }
    const item: IFirestorModelItem = {
      title: data.title,
      price: data.price,
      type: selectedType.option
    };
    formRef.current?.reset();
    setImageFile(undefined);
    setSelectedType(undefined);
    tradeMatch.createItem<IFirestorModelItem, IFirestorUpdateModelItem>(
      item,
      "item",
      imageFile.file,
      {}
    );
  };
  const fetchTypeOption = async () => {
    const data = await firestoreDb.getDocs("type");
    return transformDataToType(data);
  };
  return (
    <div className={styles.create}>
      <form
        className={styles.form}
        onSubmit={handleSubmit<Inputs>(onSubmit)}
        ref={formRef}
      >
        <label className={styles.form_label}>
          Title
          <input
            className={styles.form_input}
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
          {errors?.title && <ErrorMessage error={errors.title} />}
        </label>
        <label className={styles.form_label}>
          Price
          <input
            className={styles.form_input}
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
          {errors?.price && <ErrorMessage error={errors.price} />}
        </label>
        <div className={styles.form_label}>
          Image {imageFile?.error?.message}
          {imageFile?.error?.message && (
            <ErrorMessage error={imageFile?.error} />
          )}
          <UploadImage
            imageFile={imageFile}
            setImageFile={setImageFile}
            option={{
              maxSize: 1024 * 1024 * 4,
              allowedExtantion: [".jpeg", ".jpg", ".png", ".svg"]
            }}
          />
        </div>
        {types && (
          <label className={styles.form_label}>
            Type
            <Select
              options={types}
              placeHolder={"Select item type"}
              setSelectedOption={setSelectedType}
              selectedOption={selectedType}
            />
          </label>
        )}
        <Button
          content={"Create"}
          typeButton={"ACSENT_BUTTON"}
          type={"submit"}
        />
      </form>
    </div>
  );
};

export default CreateItem;
