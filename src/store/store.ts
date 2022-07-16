import { configureStore, combineReducers } from "@reduxjs/toolkit";
import adminPanelReducer from "./reducers/adminePanel/AdminPanelReducer";
import itemReducer from "./reducers/item/itemReducer";
import userReducer from "./reducers/user/UserReducer";
import gameReducer from "./reducers/game/GameReducer";
import bagReducer from "./reducers/bag/BagReducer";

const rootReducer = combineReducers({
    adminPanelReducer, 
    itemReducer, 
    userReducer, 
    gameReducer,
    bagReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];