import React from "react";

// Types
import { ICurrentCell } from "../../interface/components";

interface IDraggbleElement {
    itemId?: string;
    cellId: number;
    children?: React.ReactElement | null;
    setCurrentCellId: (currentCell: ICurrentCell) => void;
    currentCell?: ICurrentCell;
    setActive: (cellId: number | undefined) => void;
    match: Function;
    move: (dropCell: number, dragCell?: number) => void;
}

const DraggableElement = (props: IDraggbleElement): JSX.Element => {
    const { itemId, cellId, currentCell, setCurrentCellId, children, setActive, move, match } = props;

    const dragStartHandler = (
        e: React.DragEvent<HTMLElement>,
        cellId: number,
        itemId?: string,
    ) =>  {
        setCurrentCellId({
            cellId,
            itemId: itemId
        });
    };
    
    const dragLeaveHandler = (e: React.DragEvent<HTMLElement>) => {
        if (e.target instanceof HTMLElement) {
            setActive(undefined);
        }
    };
    
    const dragOverHandler = (
        e: React.DragEvent<HTMLElement>,
        cellId: number,
        itemId?: string,
        currentCell?: ICurrentCell
    ) => {
        e.preventDefault();
        if (cellId === currentCell?.cellId) return;

        if (
            itemId === currentCell?.itemId &&
            e.target instanceof HTMLElement
        ) {
            setActive(cellId);
        }
    }
    
    const dropHandler = (
        e: React.DragEvent<HTMLElement>,
        cellId: number,
        itemId?: string,
        currentCell?: ICurrentCell,
    ) => {
        e.preventDefault();
        if(cellId === currentCell?.cellId) return;
        if(!itemId || currentCell?.itemId !== itemId) return move(cellId, currentCell?.cellId);
        match(currentCell.cellId, cellId);
        setActive(undefined);
    };

    return (
        <div
            style={ {height: "100%", width: "100%"} }
            draggable={children ? true : false}
            onDragStart={(e) => dragStartHandler(e, cellId, itemId)}
            onDragOver={(e) => dragOverHandler(e, cellId, itemId, currentCell)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDrop={(e) => dropHandler(e, cellId, itemId, currentCell)}
        >
            {children}
        </div>
    );
};

export default DraggableElement;