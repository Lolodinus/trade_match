// Types
import ICell from "../interface/cell";
import { IItem } from "../interface/item";

const setItemInCell = (cell: ICell<IItem>, item: IItem): ICell<IItem> => {
  return {
    ...cell,
    content: item
  };
};

const resetItemFromCell = (cell: ICell<IItem>): ICell<IItem> => {
  const { content, ...emptyCell } = cell;
  return emptyCell;
};

const updateCells = (
  cells: ICell<IItem>[],
  updateCell: ICell<IItem>
): ICell<IItem>[] => {
  const updateCeellIndex = cells?.findIndex(
    (cell) => cell.id === updateCell.id
  );
  if (updateCeellIndex < 0) {
    return cells;
  }
  return [
    ...cells.slice(0, updateCeellIndex),
    updateCell,
    ...cells.slice(updateCeellIndex + 1)
  ];
};

const moveItem = (
  cells: ICell<IItem>[],
  firstCell: ICell<IItem>,
  secondCell: ICell<IItem>
) => {
  let newCells = cells;
  const { content: firstItem } = firstCell;
  const { content: secondItem } = secondCell;
  newCells = updateCells(
    newCells,
    secondItem
      ? setItemInCell(firstCell, secondItem)
      : resetItemFromCell(firstCell)
  );
  newCells = updateCells(
    newCells,
    firstItem
      ? setItemInCell(secondCell, firstItem)
      : resetItemFromCell(secondCell)
  );
  return newCells;
};

const matchItem = (
  cells: ICell<IItem>[],
  firstCell: ICell<IItem>,
  secondCell: ICell<IItem>
) => {
  let newCells = cells;
  const nextItem = secondCell.content?.match;
  if (!nextItem) {
    return newCells;
  }
  newCells = updateCells(newCells, resetItemFromCell(firstCell));
  newCells = updateCells(newCells, setItemInCell(secondCell, nextItem));
  return newCells;
};

export { moveItem, matchItem };
