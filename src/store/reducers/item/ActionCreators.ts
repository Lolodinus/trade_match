import {createAsyncThunk} from "@reduxjs/toolkit";
import { firestoreDb } from "../../../services/Firebase";
import transform from "../../../utils/transformData";
import { getRandomNumber } from "../../../utils/getRandomNumber";

// Type
import { IItem } from "../../../interface/tradeMatch";


export const fetchItems = createAsyncThunk(
    'item/fetchItem',
    async (limit: number, thunkAPI) => {
        try {
            const collectionRef = firestoreDb.getCollectionRef("item/");
            const data = await firestoreDb.getSortedDocs(
                collectionRef, 
                `random.${ getRandomNumber(2) }`,
                limit
            );
            if(!data) return;
            const item: IItem[] = transform.toItem(data);
            return item;
        } catch (e) {
            return thunkAPI.rejectWithValue("Failed to load items.")
        }
    }
)
