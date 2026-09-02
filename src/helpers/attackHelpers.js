export function getShipCells(board, shipId) {
  return board.flat().filter((cell) => cell.shipId === shipId);
}

export function isShipSunk(board, shipId) {
  const shipCells = getShipCells(board, shipId);

  if (shipCells.length === 0) {
    return false;
  }

  return shipCells.every((cell) => cell.attacked && cell.hit);
}

export function markShipAsSunk(board, shipId) {
  return board.map((row) =>
    row.map((cell) => {
      if (cell.shipId !== shipId) {
        return cell;
      }

      return {
        ...cell,
        sunk: true,
      };
    })
  );
}

export function areAllShipsSunk(board) {
  const shipCells = board.flat().filter((cell) => cell.shipId !== null);

  if (shipCells.length === 0) {
    return false;
  }

  return shipCells.every((cell) => cell.sunk);
}

export function attackCell(board, row, col) {
  const selectedCell = board[row][col];

  if (selectedCell.attacked) {
    return {
      board,
      alreadyAttacked: true,
      wasHit: false,
      wasSunk: false,
      shipId: selectedCell.shipId,
    };
  }

  let updatedBoard = board.map((boardRow) =>
    boardRow.map((cell) => {
      if (cell.row !== row || cell.col !== col) {
        return cell;
      }

      const wasHit = cell.shipId !== null;

      return {
        ...cell,
        attacked: true,
        hit: wasHit,
      };
    })
  );

  const attackedCell = updatedBoard[row][col];
  const wasHit = attackedCell.hit;
  let wasSunk = false;

  if (wasHit && isShipSunk(updatedBoard, attackedCell.shipId)) {
    updatedBoard = markShipAsSunk(updatedBoard, attackedCell.shipId);
    wasSunk = true;
  }

  return {
    board: updatedBoard,
    alreadyAttacked: false,
    wasHit,
    wasSunk,
    shipId: attackedCell.shipId,
  };
}

export function getAvailableCells(board) {
  return board.flat().filter((cell) => !cell.attacked);
}

export function getRandomAvailableCell(board) {
  const availableCells = getAvailableCells(board);

  if (availableCells.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availableCells.length);

  return availableCells[randomIndex];
}