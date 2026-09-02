import { BOARD_SIZE } from "../constants";

export function createEmptyBoard() {
  const board = [];

  for (let row = 0; row < BOARD_SIZE; row++) {
    const boardRow = [];

    for (let col = 0; col < BOARD_SIZE; col++) {
      boardRow.push({
        row,
        col,
        shipId: null,
        attacked: false,
        hit: false,
        sunk: false,
      });
    }

    board.push(boardRow);
  }

  return board;
}

export function isInsideBoard(row, col) {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}