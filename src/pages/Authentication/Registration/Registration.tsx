import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppDispatch } from "../../../hooks/redux";
import { sendNotification } from "../../../store/reducers/notification/ActionCreators";
import { regisrtation } from "../../../store/reducers/user/ActionCreators";
import { isError } from "../../../utils/objIsType";
import { firebaseError } from "../../../services/firebase";
import PATHS from "../../../const/link";

// Components
import { Form } from "../../../components";

// Styles
import styles from "./Registration.module.scss";

// Types
type Inputs = {
    login: string;
    email: string;
    password: string;
    confirmPassword: string;
};


const schema = yup.object().shape({
    login: yup.string().typeError("Should be a string").min(5, "Minimum length 5").max(12, "Maximum length 12").required("Field required"),
    email: yup.string().typeError("Should be a string").email("Invalid email").required("Field required"),
    password: yup.string().typeError("Should be a string").min(6, "Minimum length 6").max(25, "Maximum length 25").required("Field required"),
    confirmPassword: yup.string().typeError("Should be a string").oneOf([yup.ref("password")], "Password does not match").required("Field required")
}).required();

const Registration = () => {
    const navigate = useNavigate();
    const [authError, setAuthError] = useState(""); 
    const dispatch = useAppDispatch();
    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            await dispatch(regisrtation({
                login: data.login,
                password: data.password,
                email: data.email
            }));
            navigate(PATHS.main);
            dispatch(sendNotification("You are registered", "SUCCESS"));
        } catch (error) {
            if (isError(error)) {
                firebaseError.firebaseCreateUserError(error.message, setAuthError);
            }
            dispatch(sendNotification("Error. Failed to registration.", "FAIL"));
        }
    }

    return (
        <div className={ styles.registration }>
            <div className={styles.registration__title} >Registration</div>
            <Form 
                btnName="Registration"
                fields={[
                    {
                        label: "Login",
                        body: <input 
                            type="text" 
                            placeholder="Login"
                            {...register("login", {
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
                        />,
                        error: errors.login?.message
                    },
                    {
                        label: "Email",
                        body: <input 
                            type="email"
                            placeholder="example@example.com"
                            {...register("email", {
                                required: "Required field",
                                minLength: {
                                value: 3,
                                message: "Min length 3"
                                },
                                maxLength: {
                                value: 50,
                                message: "Max length 50"
                                }
                            })} 
                        />,
                        error: errors.email?.message
                    },
                    {
                        label: "Password",
                        body: <input 
                            type="password"
                            placeholder="Password"
                            {...register("password", {
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
                        />,
                        error: errors.password?.message
                    },
                    {
                        label: "Confirm password",
                        body: <input 
                            type="password"
                            placeholder="Confirm password"
                            {...register("confirmPassword", {
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
                        />,
                        error: errors.confirmPassword?.message
                    },
                ]}
                onSubmit={handleSubmit(onSubmit)}
                error={ authError }
            />
        </div>
    )
}

export default Registration;