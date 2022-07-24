import { createSlice } from "@reduxjs/toolkit";

// Type
import { PayloadAction } from "@reduxjs/toolkit";
import { ICellItem, IItem } from "../../../interface/tradeMatch";


interface IBagState {
    itemCells: ICellItem[],
    isLoading: boolean,
    error: string
}

const initialState: IBagState = {
    itemCells: [],
    isLoading: false,
    error: ""
}

export const bagSlice = createSlice({
    name: "bag",
    initialState,
    reducers: {
        itemDelete(state, action: PayloadAction<number>) {
            const itemCellIndex = state.itemCells.findIndex(cell => cell.cellId === action.payload);
            if(itemCellIndex >= 0) state.itemCells.splice(itemCellIndex, 1);
        },
        itemSetInCell(state, action: PayloadAction<ICellItem>) {
            if (!action.payload.item) return;
            const itemCellIndex = state.itemCells.findIndex(cell => cell.cellId === action.payload.cellId);
            if(itemCellIndex >= 0) state.itemCells[itemCellIndex].item = action.payload.item;
            return state;
        },
        itemAdd(state, action: PayloadAction<{item: IItem, maxCells: number}>) {            
            for(let i = 0; i < action.payload.maxCells; i++) {
                const cellId =  state.itemCells.findIndex(cell => cell.cellId === i);

                if (cellId < 0) {
                    state.itemCells.push({
                        item: action.payload.item,
                        cellId: i
                    })
                    break;
                }
            }
            return state;
        },
        itemSwap(state, action: PayloadAction<{dragItemCellId: number, dropItemCellId: number}>) {
            const dragCellIndex = state.itemCells.findIndex(cell => cell.cellId === action.payload.dragItemCellId);
            const dropCellIndex = state.itemCells.findIndex(cell => cell.cellId === action.payload.dropItemCellId);

            if(dragCellIndex >= 0) state.itemCells[dragCellIndex].cellId = action.payload.dropItemCellId;
            if(dropCellIndex >= 0) state.itemCells[dropCellIndex].cellId = action.payload.dragItemCellId;
            return state;
        }
    
    },
})

export const { itemAdd, itemSwap, itemSetInCell, itemDelete } = bagSlice.actions;

export default bagSlice.reducer;