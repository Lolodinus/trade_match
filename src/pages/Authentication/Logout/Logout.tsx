import React from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { logout } from "../../../store/reducers/user/ActionCreators";
import { sendNotification } from "../../../store/reducers/notification/ActionCreators";

// Components
import { Form } from "../../../components";

// Styles
import styles from "./Logout.module.scss";


const Logout =  () => {
    const dispatch = useAppDispatch();

    const onSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await dispatch(logout());
            dispatch(sendNotification("You are logged out", "INFO"));
        } catch (error) {
            dispatch(sendNotification("Error. Failed to logout.", "FAIL"))
        }
    }

    return (
        <div className={ styles.logout }>
            <div className={ styles.logout__title } >Logout</div>
            <Form btnName="Logout" onSubmit={ onSubmit } />
            
        </div>
    )
}

export default Logout;