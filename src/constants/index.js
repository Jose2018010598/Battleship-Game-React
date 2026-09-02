export const BOARD_SIZE = 10;

export const INITIAL_FUEL = 100;
export const MAX_FUEL = 100;
export const SHOT_COST = 5;
export const HIT_REWARD = 10;
export const TIME_PENALTY = 5;
export const TURN_TIME = 15;
export const RADAR_TIME_LIMIT = 3;

export const GAME_PHASES = {
  SETUP: "setup",
  PLAYING: "playing",
  GAME_OVER: "gameOver",
};

export const TURNS = {
  PLAYER: "player",
  COMPUTER: "computer",
};

export const ORIENTATIONS = {
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical",
};

export const COMPUTER_FLEET_OPTIONS = {
  PRESET_1: "preset1",
  PRESET_2: "preset2",
  PRESET_3: "preset3",
  RANDOM: "random",
};

export const SHIPS = [
  { id: "ship5", name: "Navio 5", size: 5 },
  { id: "ship4", name: "Navio 4", size: 4 },
  { id: "ship3a", name: "Navio 3 A", size: 3 },
  { id: "ship3b", name: "Navio 3 B", size: 3 },
  { id: "ship2a", name: "Navio 2 A", size: 2 },
  { id: "ship2b", name: "Navio 2 B", size: 2 },
];