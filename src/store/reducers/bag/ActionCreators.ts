import { AppDispatch } from "../../store";
import { itemSetInCell, itemDelete } from "./BagReducer";
import { isError, isItem } from "../../../utils/objIsType";
import TradeMatchItem from "../../../services/TradeMatch/TradeMatchItem";

// Type
import { ICellItem } from "../../../interface/tradeMatch";


export const itemMatch = (cells: ICellItem[], dragCellId: number, dropCellId: number) => async (dispatch: AppDispatch) => {
    try {
        const tmi = new TradeMatchItem("item/")

        const childItemId = cells[dragCellId].item?.child;
        if (!childItemId) return;
        
        const childItem = await tmi.getItemById(childItemId);
        if( isItem(childItem, ["id"]) ) {
            dispatch(itemSetInCell({
                ...cells[dropCellId],
                item: childItem
            }));
            dispatch(itemDelete(dragCellId));
        }
    } catch (error) {
        if(isError(error)) {
            throw new Error(error.message)
        }
    }
}
