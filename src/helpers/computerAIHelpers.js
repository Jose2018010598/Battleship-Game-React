import { getRandomAvailableCell } from "./attackHelpers";
import { isInsideBoard } from "./boardHelpers";

export function getAdjacentAvailableCells(board, row, col) {
  const possiblePositions = [
    { row: row - 1, col },
    { row: row + 1, col },
    { row, col: col - 1 },
    { row, col: col + 1 },
  ];

  return possiblePositions.filter((position) => {
    if (!isInsideBoard(position.row, position.col)) {
      return false;
    }

    return !board[position.row][position.col].attacked;
  });
}

function removeInvalidTargets(board, targetQueue) {
  return targetQueue.filter((target) => {
    if (!isInsideBoard(target.row, target.col)) {
      return false;
    }

    return !board[target.row][target.col].attacked;
  });
}

function removeRepeatedTargets(targets) {
  const uniqueTargets = [];

  targets.forEach((target) => {
    const alreadyExists = uniqueTargets.some(
      (currentTarget) =>
        currentTarget.row === target.row && currentTarget.col === target.col
    );

    if (!alreadyExists) {
      uniqueTargets.push(target);
    }
  });

  return uniqueTargets;
}

export function getAdvancedComputerTarget(board, targetQueue) {
  const validTargetQueue = removeInvalidTargets(board, targetQueue);

  if (validTargetQueue.length > 0) {
    const [targetCell, ...remainingTargets] = validTargetQueue;

    return {
      targetCell,
      remainingTargets,
    };
  }

  return {
    targetCell: getRandomAvailableCell(board),
    remainingTargets: [],
  };
}

export function updateComputerTargetQueue(
  board,
  attackedRow,
  attackedCol,
  attackResult,
  currentTargetQueue
) {
  if (attackResult.wasSunk) {
    return [];
  }

  if (!attackResult.wasHit) {
    return removeInvalidTargets(board, currentTargetQueue);
  }

  const adjacentCells = getAdjacentAvailableCells(board, attackedRow, attackedCol);

  const updatedTargets = [
    ...currentTargetQueue,
    ...adjacentCells,
  ];

  return removeRepeatedTargets(removeInvalidTargets(board, updatedTargets));
}