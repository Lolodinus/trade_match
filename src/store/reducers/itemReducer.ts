import { createSlice } from "@reduxjs/toolkit";
import { fetchItems } from "./ActionCreators";

// Type
import { PayloadAction } from "@reduxjs/toolkit";
import { IItem } from "../../interface/tradeMatch";

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

export const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        itemDelete(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload);
        }
    },
    extraReducers: {
        [fetchItems.fulfilled.type]: (state, action: PayloadAction<IItem[]>) => {
            state.isLoading = false;
            state.error = ""
            state.items = action.payload;
        },
        [fetchItems.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchItems.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
    }
})

export default itemSlice.reducer;