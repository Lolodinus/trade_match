import React, { useEffect, useState } from "react";

interface IOptionValidation {
    minLength?: number;
    maxLength?: number;
    email?: true;
    password?: true;
    confirmPassword?: string;
}

type Error =  { [key: string]: string }

const useErrorCheck = (value: any, options: IOptionValidation) => {
    const [errors, setError] = useState<Error>();
    useEffect(() => {
        console.log("render");
        let errors: Error = {};
        for (let option in options) {
            switch (option) {
                case "minLength":
                    if (value as number && value.length < options[option]!) {
                        errors[option] = `Минимальная длина ${options[option]}`
                    };
                    break;
                case "maxLength":
                    if (value as number && value.length > options[option]!) {
                        errors[option] = `Максимальная длина ${options[option]}`
                    };
                    break;
                case "email":
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!re.test(String(value).toLowerCase())) {
                        errors[option] = "Некорректный email";
                    }
                    break;
                default:
                    break;
            }
        }
        console.log(errors, "wtf")
        setError(errors);
    }, [value])

    return errors;
}


const useValidation = (initialValue: any, options: IOptionValidation, setError?: (errrors: Error) => void) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setDirty] = useState(false);
    const errors = useErrorCheck(value, options);
    if (setError && errors) setError(errors);


    const onChange = (value: any) => {
        setValue(value);
    }

    const onBlur = (value: any) => {
        setDirty(true);
        setValue(value);
    }

    // console.log(value, errors, "render useValidation");
    return {errors, onChange, onBlur};
}


export default useValidation;