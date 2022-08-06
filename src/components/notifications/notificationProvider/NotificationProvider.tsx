import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

// Components
import { Notification } from "../";

// Styles
import styles from "./NotificationProvider.module.scss";


const NotificationProvider = () => {
	const { notifications } = useAppSelector(state => state.notificationReducer);
    const reversedNotification = [...notifications].reverse();
    return (
        <div className={ styles.notifications }>
            { notifications?.length > 0 && reversedNotification.map(notification => {
                return <Notification key={ notification.id } notification={ notification } />
            })}
        </div>
    )
}


export default NotificationProvider;