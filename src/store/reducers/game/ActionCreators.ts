import {createAsyncThunk} from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import { firestoreDb } from "../../../services/firebase";
import { transformDataToTrader, transformDataToType } from "../../../services/firebase/transformData";
import { gameSlice } from "./GameReducer";
import { getRandomNumber } from "../../../utils/getRandomNumber";
import { isError } from "../../../utils/objIsType";

// Type
import { IType, ITrader } from "../../../interface/tradeMatch";


export const fetchTypes = () => async (dispatch: AppDispatch) => {
    try {
        const data = await firestoreDb.getDocs("type/");
        if(!data) throw new Error("Failed fetch types");
        const types: IType[] = transformDataToType(data);
        dispatch(gameSlice.actions.setTypes(types));
    } catch (error) {
        if(isError(error)) {
            throw new Error(error.message)
        }
    }
}

export const fetchTraders = createAsyncThunk(
    'game/fetchTraders',
    async (limit: number, thunkAPI) => {
        try {
            console.log("start")
            const data = await firestoreDb.getDocs("trader/", {
                sortBy: `random.${ getRandomNumber(2) }`,
                docLimit: limit
            });
            console.log(data, "work!!!");
            if(!data) return;
            const traders: ITrader[] = transformDataToTrader(data);
            return traders;
        } catch (e) {
            return thunkAPI.rejectWithValue("Failed to load traders")
        }
    }
)