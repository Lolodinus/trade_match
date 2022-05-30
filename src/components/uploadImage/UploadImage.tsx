import React, { useEffect, useRef, useState } from "react";
import { fileValidation } from "../../utils/validation";

// Component
import { Button } from "../";

// Styles
import styles from "./UploadImage.module.scss";
import imgPreview from "./img/preview.png";

// Types
type allowedExtantion = ".jpg" | ".jpeg" | ".png" | ".svg";

interface IUploadImageProps {
  imageFile: IImageFile | undefined;
  setImageFile: React.Dispatch<React.SetStateAction<IImageFile | undefined>>;
  option?: {
    allowedExtantion?: allowedExtantion[];
    maxSize?: number;
    minSize?: number;
  };
}

interface IImageFile {
  file: File | undefined;
  error?: {
    message: string;
  };
}

const UploadImage = (props: IUploadImageProps) => {
  const { imageFile, setImageFile, option } = props;
  const [preview, setPreview] = useState<string | undefined>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (!imageFile?.file) {
      setPreview(undefined);
    }
  }, [imageFile]);
  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    if (option) {
      let error = fileValidation(e.target.files[0], { ...option });
      if (error) {
        return setImageFile({ file: undefined, error: { message: error } });
      }
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        if (reader.result instanceof ArrayBuffer || !reader.result) {
          return;
        }
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    console.log(e.target.files[0]);
    setImageFile({
      file: e.target.files[0]
    });
  };

  const onClickHandler = () => {
    inputRef.current?.click();
  };

  const resetPreview = () => {
    if (inputRef instanceof HTMLInputElement) {
      inputRef.value = "";
    }
    setPreview(undefined);
    setImageFile(undefined);
  };

  return (
    <div className={styles.uploader}>
      <input
        className={styles.uploader__input}
        id="uploadImage"
        type="file"
        accept={
          option?.allowedExtantion
            ? option.allowedExtantion.join(",")
            : ".jpeg,.jps,.png"
        }
        onChange={imageHandler}
        ref={inputRef}
      />
      <div className={styles.uploader__preview}>
        {preview ? (
          <img
            className={styles["uploader__preview-img"]}
            src={preview}
            alt="preview"
          />
        ) : (
          <img
            className={`${styles["uploader__preview-img"]} ${styles.default}`}
            src={imgPreview}
            alt="preview default"
          />
        )}
        <button
          className={styles["uploader__preview-btn"]}
          type="button"
          onClick={resetPreview}
        >
          X
        </button>
      </div>
      <div className={styles["uploader__button-wrapper"]}>
        <Button
          typeButton={"ABSOLUTE_BUTTON"}
          content={
            <div className={styles.uploader__button}>
              +
              <p className={styles["uploader__button-description"]}>
                Upload image
              </p>
            </div>
          }
          type="button"
          onClick={() => {
            onClickHandler();
          }}
        />
      </div>
    </div>
  );
};

export default UploadImage;
export { IImageFile };
