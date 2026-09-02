import { BOARD_SIZE } from "../constants";

function getRadarAreaCells(startRow, startCol) {
  return [
    { row: startRow, col: startCol },
    { row: startRow, col: startCol + 1 },
    { row: startRow + 1, col: startCol },
    { row: startRow + 1, col: startCol + 1 },
  ];
}

function areaHasUnhitShipPart(board, areaCells) {
  return areaCells.some((position) => {
    const cell = board[position.row][position.col];

    return cell.shipId !== null && !cell.hit;
  });
}

export function getValidRadarArea(board) {
  const validAreas = [];

  for (let row = 0; row < BOARD_SIZE - 1; row++) {
    for (let col = 0; col < BOARD_SIZE - 1; col++) {
      const areaCells = getRadarAreaCells(row, col);

      if (areaHasUnhitShipPart(board, areaCells)) {
        validAreas.push(areaCells);
      }
    }
  }

  if (validAreas.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * validAreas.length);

  return validAreas[randomIndex];
}

export function isCellInRadarArea(cell, radarArea) {
  if (!radarArea) {
    return false;
  }

  return radarArea.some(
    (position) => position.row === cell.row && position.col === cell.col
  );
}