import React, { useEffect, useState } from "react";
import CellDragEvent from "../../services/cellDragEvent";

// Components
import { List, Item, DraggbleElement } from "../../components";

// Styles
import styles from "./Maim.module.scss";

// Types
import { IItem } from "../../interface/item";
import ICell from "../../interface/cell";

// Database
const cellFromDB: ICell<IItem>[] = [
  {
    id: "00",
    content: { id: "01", title: "Sword", match: { id: "03", title: "Sword 2" } }
  },
  { id: "01" },
  {
    id: "02",
    content: { id: "02", title: "Bow", match: { id: "04", title: "Bow 2" } }
  },
  { id: "03" },
  { id: "04" },
  { id: "05" },
  {
    id: "06",
    content: { id: "02", title: "Bow", match: { id: "04", title: "Bow 2" } }
  },
  { id: "07" },
  { id: "08" },
  {
    id: "09",
    content: { id: "01", title: "Sword", match: { id: "03", title: "Sword 2" } }
  }
];

const Main = () => {
  const maxCells = 10;
  const [cells, setCells] = useState<ICell<IItem>[]>();
  const [currentCell, setCurrentCell] = useState<ICell<IItem>>();
  const dragEvent = CellDragEvent;

  const getEmptyСell = (quantity: number) => {
    const cells: ICell<IItem>[] = [];
    for (let i = 0; i < quantity; i++) {
      cells.push({
        id: `${i}`
      });
    }
    return cells;
  };

  useEffect(() => {
    const fetchItems: ICell<IItem>[] = cellFromDB;
    if (fetchItems?.length === 0) {
      setCells(getEmptyСell(maxCells));
    } else {
      setCells(fetchItems);
    }
  }, []);

  return (
    <div className={styles.main}>
      {cells && (
        <List
          items={cells}
          renderItem={(item: ICell<IItem>) => {
            return (
              <Item
                content={
                  <DraggbleElement
                    cell={item}
                    draggEvent={{
                      dragStartHandler: (
                        e: React.DragEvent<HTMLElement>,
                        cell: ICell<IItem>
                      ) => dragEvent.dragStartHandler(e, cell, setCurrentCell),
                      dragOverHandler: (
                        e: React.DragEvent<HTMLElement>,
                        cell: ICell<IItem>
                      ) => dragEvent.dragOverHandler(e, cell, currentCell),
                      dragLeaveHandler: (e: React.DragEvent<HTMLElement>) =>
                        dragEvent.dragLeaveHandler(e),
                      dropHandler: (
                        e: React.DragEvent<HTMLElement>,
                        cell: ICell<IItem>
                      ) =>
                        dragEvent.dropHandler(
                          e,
                          cells,
                          cell,
                          currentCell,
                          setCells
                        )
                    }}
                  />
                }
                key={item.id}
              />
            );
          }}
        />
      )}
    </div>
  );
};

export default Main;
