import {
  COMPUTER_FLEET_OPTIONS,
  ORIENTATIONS,
  SHIPS,
} from "../constants";
import { createEmptyBoard } from "./boardHelpers";
import { canPlaceShip, placeShip } from "./shipHelpers";

const COMPUTER_FLEET_PRESETS = {
  [COMPUTER_FLEET_OPTIONS.PRESET_1]: [
    {
      shipId: "ship5",
      row: 0,
      col: 0,
      orientation: ORIENTATIONS.HORIZONTAL,
    },
    {
      shipId: "ship4",
      row: 2,
      col: 2,
      orientation: ORIENTATIONS.VERTICAL,
    },
    {
      shipId: "ship3a",
      row: 5,
      col: 0,
      orientation: ORIENTATIONS.HORIZONTAL,
    },
    {
      shipId: "ship3b",
      row: 7,
      col: 6,
      orientation: ORIENTATIONS.VERTICAL,
    },
    {
      shipId: "ship2a",
      row: 9,
      col: 0,
      orientation: ORIENTATIONS.HORIZONTAL,
    },
    {
      shipId: "ship2b",
      row: 0,
      col: 8,
      orientation: ORIENTATIONS.VERTICAL,
    },
  ],

  [COMPUTER_FLEET_OPTIONS.PRESET_2]: [
    {
      shipId: "ship5",
      row: 4,
      col: 1,
      orientation: ORIENTATIONS.HORIZONTAL,
    },
    {
      shipId: "ship4",
      row: 0,
      col: 5,
      orientation: ORIENTATIONS.VERTICAL,
    },
    {
      shipId: "ship3a",
      row: 8,
      col: 2,
      orientation: ORIENTATIONS.HORIZONTAL,
    },
    {
      shipId: "ship3b",
      row: 1,
      col: 1,
      orientation: ORIENTATIONS.VERTICAL,
    },
    {
      shipId: "ship2a",
      row: 6,
      col: 8,
      orientation: ORIENTATIONS.VERTICAL,
    },
    {
      shipId: "ship2b",
      row: 0,
      col: 8,
      orientation: ORIENTATIONS.HORIZONTAL,
    },
  ],

  [COMPUTER_FLEET_OPTIONS.PRESET_3]: [
    {
      shipId: "ship5",
      row: 9,
      col: 2,
      orientation: ORIENTATIONS.HORIZONTAL,
    },
    {
      shipId: "ship4",
      row: 1,
      col: 0,
      orientation: ORIENTATIONS.VERTICAL,
    },
    {
      shipId: "ship3a",
      row: 0,
      col: 4,
      orientation: ORIENTATIONS.HORIZONTAL,
    },
    {
      shipId: "ship3b",
      row: 4,
      col: 7,
      orientation: ORIENTATIONS.VERTICAL,
    },
    {
      shipId: "ship2a",
      row: 6,
      col: 1,
      orientation: ORIENTATIONS.HORIZONTAL,
    },
    {
      shipId: "ship2b",
      row: 2,
      col: 9,
      orientation: ORIENTATIONS.VERTICAL,
    },
  ],
};

function getShipById(shipId) {
  return SHIPS.find((ship) => ship.id === shipId);
}

function createBoardFromFleetConfig(fleetConfig) {
  let board = createEmptyBoard();

  fleetConfig.forEach((fleetShip) => {
    const ship = getShipById(fleetShip.shipId);

    if (!ship) {
      return;
    }

    const isValidPosition = canPlaceShip(
      board,
      fleetShip.row,
      fleetShip.col,
      ship.size,
      fleetShip.orientation
    );

    if (isValidPosition) {
      board = placeShip(
        board,
        ship,
        fleetShip.row,
        fleetShip.col,
        fleetShip.orientation
      );
    }
  });

  return board;
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function getRandomOrientation() {
  const orientations = [
    ORIENTATIONS.HORIZONTAL,
    ORIENTATIONS.VERTICAL,
  ];

  return orientations[getRandomNumber(orientations.length)];
}

function createRandomComputerBoard() {
  let board = createEmptyBoard();

  SHIPS.forEach((ship) => {
    let shipPlaced = false;

    while (!shipPlaced) {
      const row = getRandomNumber(10);
      const col = getRandomNumber(10);
      const orientation = getRandomOrientation();

      const isValidPosition = canPlaceShip(
        board,
        row,
        col,
        ship.size,
        orientation
      );

      if (isValidPosition) {
        board = placeShip(board, ship, row, col, orientation);
        shipPlaced = true;
      }
    }
  });

  return board;
}

export function createComputerBoard(computerFleetOption) {
  if (computerFleetOption === COMPUTER_FLEET_OPTIONS.RANDOM) {
    return createRandomComputerBoard();
  }

  const fleetConfig =
    COMPUTER_FLEET_PRESETS[computerFleetOption] ||
    COMPUTER_FLEET_PRESETS[COMPUTER_FLEET_OPTIONS.PRESET_1];

  return createBoardFromFleetConfig(fleetConfig);
}