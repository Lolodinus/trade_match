import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TradeMatch from "../../services/TradeMatch/TradeMatchItem";
import { firestoreDb } from "../../services/firebase";
import { transformDataToType } from "../../services/firebase/transformData";

// Components
import { Form, UploadImage, Select } from "../";

// Types
import { IItem } from "../../interface/tradeMatch";
import { IFirestorUpdateModelItem } from "../../interface/firestoreModel/";
interface IUpdateItemFormProps {
  item: IItem | undefined;
}
type Inputs = {
  title: string;
  price: number | string;
  type: string | undefined;
  image: { file: File | undefined; update: boolean } | undefined;
};

const UpdateItemForm = (props: IUpdateItemFormProps) => {
  const { item } = props;
  const [types, setTypes] = useState<string[] | undefined>();
  const tradeMatch = new TradeMatch("item/");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    setError,
    clearErrors
  } = useForm<Inputs>();
  const selectName: keyof Inputs = "type";
  const imageInputName: keyof Inputs = "image";

  const fetchTypeOption = async () => {
    const data = await firestoreDb.getDocs("type");
    return transformDataToType(data);
  };

  const onSubmit = async (data: any) => {
    if (!item) return;
    const updateData: IFirestorUpdateModelItem = {};
    if (data.image?.update) {
      if (item.imgUrl) tradeMatch.deleteImgByUrl(item.imgUrl);
      if (data.image?.file && data.image?.file instanceof File) {
        updateData.imgUrl = await tradeMatch.uploadImage(
          data.image.file,
          item.id
        );
      } else {
        tradeMatch.deleteItemField(item.id, "imgUrl");
      }
    }
    if (item.title !== data.title) updateData.title = data.title;
    if (item.price !== data.price) updateData.price = data.price;
    if (data.type && item.type !== data.type) updateData.type = data.type ;
    if (updateData && updateData !== {}) {
      tradeMatch.upadateItem<IFirestorUpdateModelItem>(item.id, updateData);
    }
    navigate("/list");
  };
  // set item
  useEffect(() => {
    if (!item) return;
    setValue("title", item.title);
    setValue("price", item.price);
    setValue("type", item.type);
  }, [item]);

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
              existImage={item?.imgUrl}
            />
          ),
          error: errors.image?.file?.message,
          insideLabel: false
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

export default UpdateItemForm;
