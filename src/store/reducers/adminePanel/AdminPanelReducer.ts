import { createSlice } from "@reduxjs/toolkit";
import { fetchAllItems } from "./ActionCreators";

// Type
import { PayloadAction } from "@reduxjs/toolkit";
import { IItem } from "../../../interface/tradeMatch";


interface IItemState {
    items: IItem[]
    isLoading: boolean,
    error: string
}

const initialState: IItemState = {
    items: [],
    isLoading: false,
    error: ""
}

export const adminePanelSlice = createSlice({
    name: "adminePanel",
    initialState,
    reducers: {
        itemDelete(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload);
        }
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
        }
    }
})

export default adminePanelSlice.reducer;