import { createSlice } from "@reduxjs/toolkit";

// Type
import { PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "../../../interface/components";

interface IAlertState {
    notifications: INotification[]
}

const initialState: IAlertState = {
    notifications: [],
}

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        addNotification(state, action: PayloadAction<INotification>) {
            state.notifications.push(action.payload);
            return state;
        },
        deleteNotification(state, action: PayloadAction<string>) {
            const notificationIndex = state.notifications.findIndex(notification => notification.id === action.payload);
            if (notificationIndex >= 0) state.notifications.splice(notificationIndex, 1);
        },
    }
})

export const { deleteNotification, addNotification } = notificationSlice.actions;

export default notificationSlice.reducer;