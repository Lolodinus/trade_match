import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { swapCell } from "../../store/reducers/bag/BagReducer";

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
                                move={(dropCell: number, dragCell?: number, ) => {
                                    if(dragCell === undefined) return;
                                    dispatch(swapCell({
                                        dragItemCellId: dragCell, 
                                        dropItemCellId: dropCell
                                    }));
                                }}
                                match={() => { console.log("match") }}
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