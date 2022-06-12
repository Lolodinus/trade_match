import React from "react";

// Components
import { Button } from "../";

// Styles
import styles from "./Form.module.scss";

// Types
interface Field {
  label: string;
  body: React.ReactNode;
  error?: string | undefined;
  insideLabel?: boolean;
}
interface IFormProps {
  btnName: string;
  fields: Field[];
  onSubmit: React.FormEventHandler;
}
interface IErrorMessageProps {
  message: string;
}

const ErrorMessage = (props: IErrorMessageProps) => {
  const { message } = props;
  return <div className={styles.error}>{message || "Error"}</div>;
};

function Form(props: IFormProps) {
  const { btnName, fields, onSubmit } = props;
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {fields.map((field, index) => {
        if (!field.insideLabel) {
          return <div className={styles.form_label} key={index}>
            {field.label}
            {field.error ? <ErrorMessage message={field.error} /> : null}
            {field.body}
          </div>
        }
        return (
          <label className={styles.form_label} key={index}>
            {field.label}
            {field.error ? <ErrorMessage message={field.error} /> : null}
            {field.body}
          </label>
        );
      })}
      <Button content={btnName} typeButton={"ACSENT_BUTTON"} type={"submit"} />
    </form>
  );
}

export default Form;
