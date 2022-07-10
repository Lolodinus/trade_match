import { createSlice } from "@reduxjs/toolkit";

// Type
import { PayloadAction } from "@reduxjs/toolkit";

interface IGameState {
    money: number;
}

const initialState: IGameState = {
    money: 1000,
}

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        getMoney(state, action: PayloadAction<number>) {
            console.log(typeof state.money, typeof action.payload);
            state.money = state.money + action.payload;
        },
        spendMoney(state, action: PayloadAction<number>) {
            state.money = state.money - action.payload;
        }
    }
})

export const { getMoney, spendMoney } = gameSlice.actions;

export default gameSlice.reducer;