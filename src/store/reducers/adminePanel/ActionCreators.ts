import {createAsyncThunk} from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import { adminePanelSlice } from "./AdminPanelReducer";
import { firestoreDb } from "../../../services/Firebase";
import transform from "../../../utils/transformData";
import TradeMatchItem from "../../../services/TradeMatch/TradeMatchItem";
import { isError } from "../../../utils/objIsType";

// Type
import { IItem, ITrader } from "../../../interface/tradeMatch";


const tradeItem = new TradeMatchItem("item/");
const traderItem = new TradeMatchItem("trader/");

export const fetchAllItems = createAsyncThunk(
    'adminePanel/fetchAllItem',
    async (_, thunkAPI) => {
        try {
            const collectionRef = firestoreDb.getCollectionRef("item/");
            const data = await firestoreDb.getAllDocs(collectionRef);
            if(!data) return;
            const item: IItem[] = transform.toItem(data);
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

export const fetchAllTrader = createAsyncThunk(
    'adminePanel/fetchAllTrader',
    async (_, thunkAPI) => {
        try {
            const collectionRef = firestoreDb.getCollectionRef("trader/");
            const data = await firestoreDb.getAllDocs(collectionRef);
            if(!data) return;
            const traders: ITrader[] = transform.toTrader(data);
            return traders;
        } catch (e) {
            return thunkAPI.rejectWithValue("Failed to load items.")
        }
    }
)

export const traderItemDelete = (item: ITrader) => async (dispatch: AppDispatch) => {
    try {
        traderItem.deleteItem(item.id, item.imgUrl);
        dispatch(adminePanelSlice.actions.traderDelete(item.id));
    } catch (error) {
        if(isError(error)) {
            throw new Error(error.message)
        }
    }
}