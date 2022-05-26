import React, { useRef, useState } from "react";

// Styles
import styles from "./UploadImage.module.scss";
import imgPreview from "./img/preview.png";

// Types
interface IUploadImageProps {
  setImageFile: Function;
}

const UploadImage = (props: IUploadImageProps) => {
  const { setImageFile } = props;
  const [preview, setPreview] = useState<string | undefined>();
  const inputRef = useRef(null);

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
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
    setImageFile(e.target.files[0]);
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
        accept=".jpeg,.jps,.png"
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
      <label className={styles.uploader__button} htmlFor="uploadImage">
        +<p className={styles["uploader__button-description"]}>Upload image</p>
      </label>
    </div>
  );
};

export default UploadImage;
