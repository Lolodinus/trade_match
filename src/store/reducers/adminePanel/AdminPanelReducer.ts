import { createSlice } from "@reduxjs/toolkit";
import { fetchAllItems, fetchAllTrader } from "./ActionCreators";

// Type
import { PayloadAction } from "@reduxjs/toolkit";
import { IItem, ITrader } from "../../../interface/tradeMatch";


interface IItemState {
    items: IItem[];
    traders: ITrader[];
    isLoading: boolean;
    error: string;
}

const initialState: IItemState = {
    items: [],
    traders: [],
    isLoading: false,
    error: ""
}

export const adminePanelSlice = createSlice({
    name: "adminePanel",
    initialState,
    reducers: {
        itemDelete(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        traderDelete(state, action: PayloadAction<string>) {
            state.traders = state.traders.filter(trader => trader.id !== action.payload);
        },
        itemReset(state) {
            state.items = [];
        },
        traderReset(state) {
            state.traders = [];
        },
    },
    extraReducers: {
        [fetchAllItems.fulfilled.type]: (state, action: PayloadAction<IItem[]>) => {
            state.isLoading = false;
            state.error = ""
            state.items = action.payload;
        },
        [fetchAllItems.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchAllItems.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
        
        [fetchAllTrader.fulfilled.type]: (state, action: PayloadAction<ITrader[]>) => {
            state.isLoading = false;
            state.error = ""
            state.traders = action.payload;
        },
        [fetchAllTrader.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchAllTrader.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        }
    }
})

export default adminePanelSlice.reducer;