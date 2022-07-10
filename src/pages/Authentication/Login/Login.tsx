import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppDispatch } from "../../../hooks/redux";
import { login } from "../../../store/reducers/user/ActionCreators";
import { firebaseError } from "../../../services/firebase";
import { isError } from "../../../utils/objIsType";

// Components
import { Form, Button } from "../../../components";

// Styles
import styles from "./Login.module.scss";

// Types
import { SubmitHandler } from "react-hook-form";

type Inputs = {
    email: string;
    password: string;
};


const schema = yup.object().shape({
    email: yup.string().typeError("Should be a string").email("Invalid email").required("Field required"),
    password: yup.string().required("Field required"),
}).required();


const Login = () => {
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
            await dispatch(login({
                password: data.password,
                email: data.email
            }));
            navigate("/");
        } catch (error) {
            if (isError(error)) {
                firebaseError.firebaseSingInError(error.message, setAuthError);
            };
        };
    }

    return (
        <div className={styles.login}>
            <div className={styles.login__title} >Login</div>
            <Form 
                btnName="Login"
                fields={[
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
                ]}
                onSubmit={handleSubmit(onSubmit)}
                error={ authError }
            />
            <hr className={styles.login__separator}/>
            <Button 
                typeButton="ACSENT_BUTTON"
                size="WIDE" 
                onClick={() => navigate("/authentication/registration")}
            >
                {"Registration"}
            </Button>
        </div>
    )
}

export default Login;