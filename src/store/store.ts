import { configureStore, combineReducers } from "@reduxjs/toolkit";
import itemReducer from "./reducers/itemReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({itemReducer, userReducer});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];