import {createAsyncThunk} from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { itemSlice } from "./itemReducer";
import { userSlice } from "./userReducer";
import TradeMatchItem from "../../services/TradeMatch/TradeMatchItem";
import { firestoreDb } from "../../services/firebase";
import { transformDataToItem } from "../../services/firebase/transformData";
import firebaseAuth from "../../services/firebase/firebaseAuth";

// Type
import { IItem, IUser } from "../../interface/tradeMatch";
import { IFirebaseModelCreateUser, IFirebaseModelSingIn } from "../../interface/firestoreModel/IFirebaseModelUser";
import { isError } from "../../utils/objIsType";

const tradeItem = new TradeMatchItem("item/");

export const fetchItems = createAsyncThunk(
    'item/fetchAll',
    async (_, thunkAPI) => {
        try {
            const data = await firestoreDb.getDocs("item");
            const item: IItem[] = transformDataToItem(data);
            return item;
        } catch (e) {
            return thunkAPI.rejectWithValue("Failed to load items.")
        }
    }
)

export const itemDelete = (item: IItem) => async (dispatch: AppDispatch) => {
    try {
        tradeItem.deleteItem(item.id, item.imgUrl);
        dispatch(itemSlice.actions.itemDelete(item.id));
    } catch (error) {
        if(isError(error)) {
            throw new Error(error.message)
        }
    }
}

export const regisrtation = (userData: IFirebaseModelCreateUser) => async (dispatch: AppDispatch) => {
    try {
        const user = await firebaseAuth.createUser(userData);
        if (!user) return;
        dispatch(userSlice.actions.setUser(user));
    } catch (error) {
        if(isError(error)) {
            throw new Error(error.message)
        }
    }
}

export const login = (userData: IFirebaseModelSingIn) => async (dispatch: AppDispatch) => {
    try {
        const user = await firebaseAuth.singIn(userData);
        if (!user) return;
        dispatch(userSlice.actions.setUser(user));
    } catch (error) {
        if(isError(error)) {
            throw new Error(error.message)
        }
    }
}

export const authentication = () => (dispatch: AppDispatch) => {
    firebaseAuth.authState((user) => dispatch(userSlice.actions.setUser(user)));
}

export const logout = () => async (dispatch: AppDispatch) => {
    try {
        await firebaseAuth.singOut();
        dispatch(userSlice.actions.resetUser());
    } catch (error) {
        if(isError(error)) {
            throw new Error(error.message)
        }
    }
}