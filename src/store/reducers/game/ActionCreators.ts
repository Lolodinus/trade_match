import {createAsyncThunk} from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import { firestoreDb } from "../../../services/Firebase";
import transform from "../../../utils/transformData";
import { gameSlice } from "./GameReducer";
import { getRandomNumber } from "../../../utils/getRandomNumber";
import { isError } from "../../../utils/objIsType";

// Type
import { IType, ITrader, ITraderItem } from "../../../interface/tradeMatch";


export const fetchTypes = () => async (dispatch: AppDispatch) => {
    try {
        const collectionRef = firestoreDb.getCollectionRef("type/");
        const data = await firestoreDb.getAllDocs(collectionRef);
        if(!data) throw new Error("Failed fetch types");
        const types: IType[] = transform.toType(data);
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
            const collectionRef = firestoreDb.getCollectionRef("trader/");
            const data = await firestoreDb.getSortedDocs(
                collectionRef, 
                `random.${ getRandomNumber(2) }`, 
                limit
            );
            if(!data) return;
            const traders: ITrader[] = transform.toTrader(data);
            return traders;
        } catch (e) {
            return thunkAPI.rejectWithValue("Failed to load traders");
        }
    }
)

export const fetchItems = createAsyncThunk(
    'game/fetchItems',
    async (options: {traders?: ITrader[], limit?: number }, thunkAPI) => {
        try {
            if(!options.traders || options.traders.length === 0) throw new Error("Trader type undefined");
            let items: ITraderItem[] = [];

            for(let i = 0; i < options.traders.length; i++) {
                const trader = options.traders[i];
                if(!trader) throw new Error("Trader undefined");
                const collectionRef = firestoreDb.getCollectionRef("item/");
                const data = await firestoreDb.getSortedAndFiltredDocs<ITrader>(
                    collectionRef,
                    `random.${ getRandomNumber(2) }`,
                    {
                        field: "type",
                        condition: "==",
                        value: trader.type
                    },
                    options.limit || 10
                )
                if(!data) throw new Error("Failed to load items");
                const newItems: ITraderItem[] = transform.toItem(data).map(item => {
                    return {
                        ...item,
                        traderId: trader.id
                    }
                })
                items.push(
                    ...newItems
                )
            }
            return items;
        } catch (e) {
            return thunkAPI.rejectWithValue("Failed to load items");
        }
    }
)