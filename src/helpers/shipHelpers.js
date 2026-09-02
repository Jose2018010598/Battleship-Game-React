import { ORIENTATIONS } from "../constants";
import { isInsideBoard } from "./boardHelpers";

export function getShipPositions(row, col, shipSize, orientation) {
  const positions = [];

  for (let i = 0; i < shipSize; i++) {
    const nextRow = orientation === ORIENTATIONS.VERTICAL ? row + i : row;
    const nextCol = orientation === ORIENTATIONS.HORIZONTAL ? col + i : col;

    positions.push({
      row: nextRow,
      col: nextCol,
    });
  }

  return positions;
}

export function canPlaceShip(board, row, col, shipSize, orientation) {
  const positions = getShipPositions(row, col, shipSize, orientation);

  return positions.every((position) => {
    const { row: currentRow, col: currentCol } = position;

    if (!isInsideBoard(currentRow, currentCol)) {
      return false;
    }

    return board[currentRow][currentCol].shipId === null;
  });
}

export function placeShip(board, ship, row, col, orientation) {
  const positions = getShipPositions(row, col, ship.size, orientation);

  return board.map((boardRow) =>
    boardRow.map((cell) => {
      const isShipPosition = positions.some(
        (position) => position.row === cell.row && position.col === cell.col
      );

      if (!isShipPosition) {
        return cell;
      }

      return {
        ...cell,
        shipId: ship.id,
      };
    })
  );
}