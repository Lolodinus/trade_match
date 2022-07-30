import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

// Styles
import styles from "./Button.module.scss";

// Types
type ButtonType = "ACSENT_BUTTON" | "TRANSPARENT_BUTTON";
type ButtonSize = "SMALL" | "MEDIUM"| "LARGE" | "WIDE" | "MAX";
interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<
	HTMLButtonElement>,HTMLButtonElement> {
	typeButton: ButtonType;
	size?: ButtonSize;
	children?: React.ReactNode;
}

const Button = (props: IButtonProps) => {
  	const { children, typeButton, size, ...atributes } = props;
  
	const getBtnTypeClass = (typeButton: ButtonType) => {
		switch (typeButton) {
			case "ACSENT_BUTTON": {
				return styles.acsent;
			}
			case "TRANSPARENT_BUTTON": {
				return styles.transparent;
			}
			default: {
				return "";
			}
		}
	};

	const getButtonSize = (size: ButtonSize) => {
		switch (size) {
			case "SMALL": {
				return styles.small;
			}
			case "MEDIUM": {
				return styles.medium;
			}
			case "LARGE": {
				return styles.large;
			}
			case "WIDE": {
				return styles.wide;
			}
			case "MAX": {
				return styles.max;
			}
			default: {
				return "";
			}
		}
	}

	return (
			<button
				className={`${styles.button} ${getBtnTypeClass(typeButton)} ${size ? getButtonSize(size) : ""}`}
				{...atributes}
			>
				{children}
			</button>
		);
};

export default Button;
