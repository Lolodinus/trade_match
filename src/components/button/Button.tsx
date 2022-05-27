import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

// Styles
import styles from "./Button.module.scss";

// Types
type ButtonType = "ACSENT_BUTTON" | "DEFAULT_BUTTON" | "ABSOLUTE_BUTTON";
interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  content: React.ReactNode;
  typeButton: ButtonType;
}

const Button = (props: IButtonProps) => {
  const { content, typeButton, ...atributes } = props;
  const getBtnTypeClass = (typeButton: ButtonType) => {
    switch (typeButton) {
      case "ACSENT_BUTTON": {
        return styles.acsent;
      }
      case "DEFAULT_BUTTON": {
        return styles.default;
      }
      case "ABSOLUTE_BUTTON": {
        return styles.absolute;
      }
      default: {
        return styles.default;
      }
    }
  };
  return (
    <button
      className={`${styles.button} ${getBtnTypeClass(typeButton)}`}
      {...atributes}
    >
      {content}
    </button>
  );
};

export default Button;
