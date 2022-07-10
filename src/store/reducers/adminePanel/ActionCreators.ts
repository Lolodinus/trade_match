import {createAsyncThunk} from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import { adminePanelSlice } from "./AdminPanelReducer";
import { firestoreDb } from "../../../services/firebase";
import { transformDataToItem } from "../../../services/firebase/transformData";
import TradeMatchItem from "../../../services/TradeMatch/TradeMatchItem";

// Type
import { IItem } from "../../../interface/tradeMatch";
import { isError } from "../../../utils/objIsType";


const tradeItem = new TradeMatchItem("item/");

export const fetchAllItems = createAsyncThunk(
    'adminePanel/fetchAllItem',
    async (_, thunkAPI) => {
        try {
            const data = await firestoreDb.getDocs("item/");
            if(!data) return;
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
        dispatch(adminePanelSlice.actions.itemDelete(item.id));
    } catch (error) {
        if(isError(error)) {
            throw new Error(error.message)
        }
    }
}