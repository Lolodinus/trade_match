import {createAsyncThunk} from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { itemSlice } from "./itemReducer";
import TradeMatchItem from "../../services/TradeMatch/TradeMatchItem";
import { firestoreDb } from "../../services/firebase";
import { transformDataToItem } from "../../services/firebase/transformData";

// Type
import { IItem } from "../../interface/tradeMatch";

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
        
    }
}