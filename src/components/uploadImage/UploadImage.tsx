import React, { useEffect, useRef, useState } from "react";
import { fileValidation } from "../../utils/validation";

// Components
import {Button} from "../";

// Styles
import styles from "./UploadImage.module.scss";
import imgPreview from "./img/preview.png";

// Types
type allowedExtantion = ".jpg" | ".jpeg" | ".png" | ".svg";

interface IValidationOption {
  allowedExtantion?: allowedExtantion[];
  maxSize?: number;
  minSize?: number;
}

interface IUploadImageProps {
  name: string;
  imageFile: { file: File | undefined; update: boolean } | undefined;
  setImageFile: (
    value: { file: File | undefined; update: boolean } | undefined
  ) => void;
  option?: IValidationOption;
  setError: (message: string) => void;
  existImage?: string;
}

const UploadImage = (props: IUploadImageProps) => {
  const { name, imageFile, setImageFile, setError, option, existImage } = props;
  const [itemImage, setItemImage] = useState<string | undefined>();
  const [preview, setPreview] = useState<string | undefined>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const uploadBtnRef = useRef<HTMLButtonElement | null>(null);

  // set exist image for preview
  useEffect(() => {
    if (!existImage) return;
    setItemImage(existImage);
  }, [existImage]);

  useEffect(()=> {
    console.log(itemImage, preview);
  }, [itemImage, preview])

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const imageFile = e.target.files[0];
    if (!imageValid(imageFile, option)) return;
    setImagePreview(imageFile);
    setImageFile({ file: imageFile, update: true });
  };

  const imageValid = (
    file: File,
    option: IValidationOption | undefined
  ): boolean => {
    if (!option) return true;
    const error = fileValidation(file, { ...option });
    if (!error) return true;
    setError(error);
    uploadBtnRef.current?.focus();
    return false;
  };

  const setImagePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        if (reader.result instanceof ArrayBuffer || !reader.result) {
          return;
        }
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  // image action
  const resetPreview = () => {
    if (inputRef instanceof HTMLInputElement) {
      inputRef.value = "";
    }
    setPreview(undefined);
    setImageFile(undefined);
  };
  const deleteImageFile = () => {
    setItemImage(undefined);
    setImageFile({ file: undefined, update: true });
  };

  return (
    <div className={styles.uploader}>
      <div className={styles.uploader__preview}>
        {preview || itemImage ? (
          <img
            className={styles["uploader__preview-img"]}
            src={preview || itemImage}
            alt="preview"
          />
        ) : (
          <img
            className={`${styles["uploader__preview-img"]} ${styles.default}`}
            src={imgPreview}
            alt="preview default"
          />
        )}
        <div className={styles["uploader__preview-action"]}>
          { preview && <button
            className={styles["uploader__preview-btn"]}
            type="button"
            onClick={resetPreview}
          >
            <i className="fa-solid fa-xmark" />
          </button>
          }
          {(itemImage && !preview) && (
            <button
              className={styles["uploader__preview-btn"]}
              type="button"
              onClick={deleteImageFile}
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
          )}
        </div>
      </div>
      <div className={styles["uploader__button-wrapper"]}>
        <label htmlFor="uploadImage">
          <input
            className={styles.uploader__input}
            id="uploadImage"
            type="file"
            accept={
              option?.allowedExtantion
                ? option.allowedExtantion.join(",")
                : ".jpeg,.jps,.png,.svg"
            }
            onChange={onChangeImageHandler}
            ref={inputRef}
            name={name}
          />
          {/* <button 
            className={styles.uploader__button}
            type="button"
            ref={uploadBtnRef}
            onClick={() => {inputRef.current?.click()}}
          >
            +
            <p className={styles["uploader__button-description"]}>
              Upload image
            </p>
          </button> */}
          <Button 
            content={
              <>
                <span className={styles["uploader__button-icon"]}>+</span>
                <p className={styles["uploader__button-description"]}>
                  Upload image
                </p>
              </>
            }
            typeButton={"ACSENT_CONTENT_BUTTON"}
            onClick={() => {inputRef.current?.click()}}
            ref={uploadBtnRef}
            type="button"
          />

        </label>
      </div>
    </div>
  );
};

export default UploadImage;
