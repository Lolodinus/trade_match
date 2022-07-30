import { AppDispatch } from "../../store";
import { addNotification } from "./NotificationReducer";
import getRandobId from "../../../utils/getRandomId";
import { isError } from "../../../utils/objIsType";

// Type
import { NotificationType } from "../../../interface/components";


export const sendNotification = (message: string, type: NotificationType) => async (dispatch: AppDispatch) => {
    try {
        const id = getRandobId();
        dispatch(addNotification({id, message, type}));
    } catch (error) {
        if(isError(error)) {
            throw new Error(error.message)
        }
    }
}
