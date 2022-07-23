import { SelectHTMLAttributes, DetailedHTMLProps } from "react";


export interface IOption {
    id: string;
    label: string;
    [key: string]: any
}

export interface ISelectProps extends DetailedHTMLProps<SelectHTMLAttributes<
	HTMLSelectElement>, HTMLSelectElement> {
        options: IOption[];
        setSelectedOption: (value: IOption) => void;
        onBlurSelectHandler?: (isOpen: boolean) => void;
        selectedOption: IOption | undefined;
}