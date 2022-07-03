import React from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { logout } from "../../../store/reducers/ActionCreators";

// Components
import { Form } from "../../../components";

// Styles
import styles from "./Logout.module.scss";


const Logout =  () => {
    const dispatch = useAppDispatch();

    const onSubmit = () => {
        dispatch(logout())
        
    }

    return (
        <div className={ styles.logout }>
            <div className={ styles.logout__title } >Logout</div>
            <Form btnName="Logout" onSubmit={ onSubmit } />
            
        </div>
    )
}

export default Logout;