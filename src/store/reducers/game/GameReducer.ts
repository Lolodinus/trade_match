import { createSlice } from "@reduxjs/toolkit";

// Type
import { PayloadAction } from "@reduxjs/toolkit";

interface IGameState {
    money: number;
    day: number;
}

const initialState: IGameState = {
    money: 1000,
    day: 1
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
    }
})

export const { getMoney, spendMoney, nextDay } = gameSlice.actions;

export default gameSlice.reducer;