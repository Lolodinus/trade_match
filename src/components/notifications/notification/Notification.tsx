import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faCircleCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { deleteNotification } from "../../../store/reducers/notification/NotificationReducer";

// Styles
import styles from "./Notification.module.scss";

// Types
import { INotification, NotificationType } from "../../../interface/components";


interface INotificationProps {
    notification: INotification
}

const Notification = (props: INotificationProps) => {
    const { id, message, type } = props.notification;
    const [exit, setExit] = useState(false);
    const [width, setWidth] = useState(0);
    const [intervalID, setIntervalID] = useState<NodeJS.Timer>();
    const dispatch = useAppDispatch();
    
    const notificationClass = (type: NotificationType) => {
        switch (type) {
            case "SUCCESS":
                return styles.success;
            case "FAIL":
                return styles.fail;
            case "INFO":
                return styles.info;
            default:
                return "";
        }
    }

    const getNotificationIcon = (type: NotificationType) => {
        switch (type) {
            case "SUCCESS":
                return <FontAwesomeIcon icon={ faCircleCheck } />;
            case "FAIL":
                return <FontAwesomeIcon icon={ faTriangleExclamation } />;
            case "INFO":
                return <FontAwesomeIcon icon={ faCircleInfo } />;
            default:
                return "";
        }
    }

    const handleStartTimer = () => {
        const id = setInterval(() => {
          setWidth(prev => {
            if (prev < 100) {
              return prev + 0.5;
            }
    
            clearInterval(id);
            return prev;
          });
        }, 20);
    
        setIntervalID(id);
    };
    
    const handlePauseTimer = () => {
        clearInterval(intervalID);
    };
    
    const handleCloseNotification = () => {
        handlePauseTimer();
        setExit(true);
        setTimeout(() => {
            dispatch(deleteNotification(id));
        }, 400)
    };
    
    useEffect(() => {
        if (width === 100) {
            handleCloseNotification()
        }
    }, [width])
        
    useEffect(() => {
        handleStartTimer();
    }, []);

    return (
        <div 
            className={ `${ styles.notification } ${ exit ? styles.hide : styles.show } ${ notificationClass(type) }` }
            onMouseEnter={handlePauseTimer}
            onMouseLeave={handleStartTimer}
        >   
            <div className={ styles.notification__wrapper }>
                <span className={ styles.notification__icon }>
                    { getNotificationIcon(type) }
                </span>
                <p className={ styles.notification__text }>
                    { message }
                </p>
            </div>
            <span className={ styles.notification__bar } style={ {left: `-${100 - width}%`} }/>
        </div>
    )
}


export default Notification;