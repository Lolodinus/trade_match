import { createSlice } from "@reduxjs/toolkit";

// Type
import { PayloadAction } from "@reduxjs/toolkit";

interface IGameState {
    money: number;
    day: number;
    bagItem: number;
    maxBagItem: number;
}

const initialState: IGameState = {
    money: 1000,
    day: 1,
    bagItem: 0,
    maxBagItem: 10,
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
    }
})

export const { getMoney, spendMoney, nextDay, addItem, removeItem } = gameSlice.actions;

export default gameSlice.reducer;