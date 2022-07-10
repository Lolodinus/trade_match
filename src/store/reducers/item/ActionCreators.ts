import {createAsyncThunk} from "@reduxjs/toolkit";
import { firestoreDb } from "../../../services/firebase";
import { transformDataToItem } from "../../../services/firebase/transformData";

// Type
import { IItem } from "../../../interface/tradeMatch";
import { getRandomNumber } from "../../../utils/getRandomNumber";


export const fetchItems = createAsyncThunk(
    'item/fetchItem',
    async (limit: number, thunkAPI) => {
        try {
            const data = await firestoreDb.getDocs("item/", {
                sortBy: `random.${ getRandomNumber(2) }`,
                docLimit: limit
            });
            if(!data) return;
            const item: IItem[] = transformDataToItem(data);
            return item;
        } catch (e) {
            return thunkAPI.rejectWithValue("Failed to load items.")
        }
    }
)
