import { matchItem, moveItem } from "../services/cells";

// Styles
import styles from "../components/draggbleElement/DraggbleElement.module.scss";

// Types
import ICell from "../interface/cell";
import { IItem } from "../interface/item";

class CellDraggEvent {
  dragStartHandler(
    e: React.DragEvent<HTMLElement>,
    cell: ICell<IItem>,
    setCurrentCell: Function
  ) {
    setCurrentCell(cell);
  }

  dragLeaveHandler = (e: React.DragEvent<HTMLElement>) => {
    if (e.target instanceof HTMLElement) {
      e.target.classList.remove(styles.match);
    }
  };

  dragOverHandler(
    e: React.DragEvent<HTMLElement>,
    cell: ICell<IItem>,
    currentCell: ICell<IItem> | undefined
  ) {
    e.preventDefault();
    if (cell.id === currentCell?.id) {
      return;
    }
    if (
      cell.content?.id === currentCell?.content?.id &&
      e.target instanceof HTMLElement
    ) {
      e.target.classList.add(styles.match);
    }
  }

  dropHandler = (
    e: React.DragEvent<HTMLElement>,
    cells: ICell<IItem>[],
    cell: ICell<IItem>,
    currentCell: ICell<IItem> | undefined,
    setCells: Function
  ) => {
    e.preventDefault();
    if (cells && currentCell) {
      let updateCells: ICell<IItem>[];
      if (cell.content?.id === currentCell?.content?.id) {
        updateCells = matchItem(cells, currentCell, cell);
        if (e.target instanceof HTMLElement) {
          e.target.classList.remove(styles.match);
        }
      } else {
        updateCells = moveItem(cells, currentCell, cell);
      }
      setCells(updateCells);
    }
  };
}

export default new CellDraggEvent();
