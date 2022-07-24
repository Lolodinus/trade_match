import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { itemSwap } from "../../store/reducers/bag/BagReducer";
import { itemMatch } from "../../store/reducers/bag/ActionCreators";

// Components
import { List, ListItem, BagItem, DraggableElement, GamePage } from "../../components";

// Types
import { ICellItem } from "../../interface/tradeMatch";
import { ICurrentCell } from "../../interface/components";


const Bag = () => {
    const dispatch = useAppDispatch();
    const [cells, setCells] = useState<ICellItem[]>();
	const { maxBagItem } = useAppSelector(state => state.gameReducer);
	const { itemCells } = useAppSelector(state => state.bagReducer);
    const [currentCell, setCurrentCell] = useState<ICurrentCell>();
    const [activeCell, setActiveCell] = useState<number | undefined>();

    const setBagCells = () => {
        let bagCells: ICellItem[] = []
        for(let i = 0; i< maxBagItem; i++) {
            const cell: ICellItem = {
                cellId: i
            }
            bagCells.push(cell);
        }

        setCells(bagCells.map((cell) => {
            const itemCellIndex = itemCells.findIndex(itemCell => itemCell.cellId === cell.cellId);
            return itemCellIndex >= 0 ? itemCells[itemCellIndex] : cell;
        }))
    }

    useEffect(() => {
        setBagCells();
    }, [itemCells])

    return(
        <GamePage title="Bag">
            { cells && <List
                items={cells}
                renderItem={(item: ICellItem, index) => {
                    return (
                        <ListItem key={ index }>
                            <DraggableElement 
                                itemId={ item.item?.id }
                                cellId={ item.cellId }
                                currentCell={ currentCell }
                                setCurrentCellId={ setCurrentCell }
                                setActive={ setActiveCell }
                                move={(dropCellId: number, dragCellId?: number) => {
                                    if(dragCellId === undefined) return;
                                    dispatch(itemSwap({
                                        dragItemCellId: dragCellId, 
                                        dropItemCellId: dropCellId
                                    }));
                                }}
                                match={ (dragCellId: number, dropCellId: number) => {
                                    dispatch(itemMatch(cells, dragCellId, dropCellId))
                                } }
                            >
                                <BagItem item={ item.item } active={ item.cellId === activeCell ? true : false } />
                            </DraggableElement>
                        </ListItem>
                    );
                }}
            /> }
        </GamePage>
    )
}

export default Bag;