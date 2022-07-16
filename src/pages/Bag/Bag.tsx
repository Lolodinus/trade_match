import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { swapCell } from "../../store/reducers/bag/BagReducer";

// Components
import { List, Item, DraggbleElement } from "../../components";

// Styles
import styles from "./Bag.module.scss";

// Types
import { ICellItem, IItem } from "../../interface/tradeMatch";
import { ICurrentCell } from "../../interface/components";

interface IBagItemProps {
    item?: IItem;
    active: boolean;
}

const BagItem = (props: IBagItemProps) => {
	const { item, active } = props;
    return (
        <div className={ active 
            ? `${styles.item} ${styles.active}`
            : styles.item }
        >
            { item && (
                <>
                    <div className={styles.item__title}>{item.title}</div>
                    <div className={styles.item__img}>
                        {item.imgUrl && <img src={item.imgUrl} alt={item.title} draggable="false"/>}
                    </div>
                </>
            ) }
		</div>
    )
}



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
        console.log("render")
        setBagCells();
    }, [itemCells])

    return(
        <div>
            { cells && <List
                items={cells}
                renderItem={(item: ICellItem, index) => {
                    return (
                        <Item
                            content={
                                <DraggbleElement 
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
                                </DraggbleElement>
                            }
                            key={ index }
                        />
                    );
                }}
            /> }
        </div>
    )
}

export default Bag;