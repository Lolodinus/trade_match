import { createSlice } from "@reduxjs/toolkit";
import { fetchTraders } from "./ActionCreators";

// Type
import { PayloadAction } from "@reduxjs/toolkit";
import { IType, ITrader } from "../../../interface/tradeMatch";

interface IGameState {
    money: number;
    day: number;
    bagItem: number;
    maxBagItem: number;
    types: IType[],
    traders: ITrader[],
    isLoading: boolean;
    error: string;
}

const initialState: IGameState = {
    money: 200,
    day: 1,
    bagItem: 0,
    maxBagItem: 10,
    types: [],
    traders: [],
    isLoading: true,
    error: ""
}

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        getMoney(state, action: PayloadAction<number>) {
            state.money = state.money + action.payload;
        },
        spendMoney(state, action: PayloadAction<number>) {
            state.money = state.money - action.payload;
        },
        nextDay(state) {
            state.day = state.day + 1;
        },
        addItem(state) {
            state.bagItem = state.bagItem + 1;
        },
        removeItem(state) {
            state.bagItem = state.bagItem - 1;
        },
        setTypes(state, action: PayloadAction<IType[]>) {
            state.types = action.payload;
        }
    },
    extraReducers: {
        [fetchTraders.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchTraders.fulfilled.type]: (state, action: PayloadAction<ITrader[]>) => {
            state.isLoading = false;
            state.error = ""
            state.traders = action.payload;
        },
        [fetchTraders.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
    }
})

export const { getMoney, spendMoney, nextDay, addItem, removeItem } = gameSlice.actions;

export default gameSlice.reducer;