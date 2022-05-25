import React from "react";

// Styles
import styles from "./DraggbleElement.module.scss";

// Types
import { IItem } from "../../interface/item";
import ICell from "../../interface/cell";
interface IContent {
  cell: ICell<IItem>;
  draggEvent: { [key: string]: Function };
}

const DraggbleElement = (props: IContent): JSX.Element => {
  const { cell, draggEvent } = props;

  return (
    <div
      className={
        !cell || !cell.content
          ? `${styles.content} ${styles.empty}`
          : styles.content
      }
      draggable={!cell || !cell.content ? false : true}
      onDragStart={(e) => draggEvent.dragStartHandler(e, cell)}
      onDragOver={(e) => draggEvent.dragOverHandler(e, cell)}
      onDragLeave={(e) => draggEvent.dragLeaveHandler(e)}
      onDrop={(e) => draggEvent.dropHandler(e, cell)}
    >
      {cell?.content?.title}
    </div>
  );
};

export default DraggbleElement;
