import { configureStore, combineReducers } from "@reduxjs/toolkit";
import itemReducer from "./reducers/itemReducer";

const rootReducer = combineReducers({itemReducer});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];