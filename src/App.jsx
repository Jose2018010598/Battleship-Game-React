import "./assets/styles/App.css";
import { useState } from "react";
import {
  Header,
  Footer,
  Setup,
  BattleGame,
  GameOver,
} from "./components/";
import {
  COMPUTER_FLEET_OPTIONS,
  GAME_PHASES,
} from "./constants";

function App() {
  const [gamePhase, setGamePhase] = useState(GAME_PHASES.SETUP);
  const [playerName, setPlayerName] = useState("");
  const [computerFleetOption, setComputerFleetOption] = useState(
    COMPUTER_FLEET_OPTIONS.PRESET_1
  );
  const [debugMode, setDebugMode] = useState(false);

  const [playerBoard, setPlayerBoard] = useState(null);

  const [winner, setWinner] = useState("");
  const [finalMoves, setFinalMoves] = useState(0);

  const handlePlayerNameChange = (event) => {
    setPlayerName(event.currentTarget.value);
  };

  const handleComputerFleetOptionChange = (event) => {
    setComputerFleetOption(event.currentTarget.value);
  };

  const handleDebugModeChange = (event) => {
    setDebugMode(event.currentTarget.checked);
  };

  const handleStartGame = (configuredPlayerBoard) => {
    setPlayerBoard(configuredPlayerBoard);
    setGamePhase(GAME_PHASES.PLAYING);
  };

  const handleGameOver = (gameWinner, totalMoves) => {
    setWinner(gameWinner);
    setFinalMoves(totalMoves);
    setGamePhase(GAME_PHASES.GAME_OVER);
  };

  const handleRestart = () => {
    setGamePhase(GAME_PHASES.SETUP);
    setPlayerName("");
    //setPlayerName(playerName);
    setComputerFleetOption(COMPUTER_FLEET_OPTIONS.PRESET_1);
    setDebugMode(false);
    setPlayerBoard(null);
    setWinner("");
    setFinalMoves(0);
  };

  return (
    <div id="container">
      <Header />

      <main>
        {gamePhase === GAME_PHASES.SETUP && (
          <Setup
            playerName={playerName}
            onPlayerNameChange={handlePlayerNameChange}
            computerFleetOption={computerFleetOption}
            onComputerFleetOptionChange={handleComputerFleetOptionChange}
            debugMode={debugMode}
            onDebugModeChange={handleDebugModeChange}
            onStartGame={handleStartGame}
          />
        )}

          {gamePhase === GAME_PHASES.PLAYING && (
            <BattleGame
              playerName={playerName}
              playerBoard={playerBoard}
              computerFleetOption={computerFleetOption}
              debugMode={debugMode}
              onGameOver={handleGameOver}
            />
          )}

        {gamePhase === GAME_PHASES.GAME_OVER && (
          <GameOver
            winner={winner}
            moves={finalMoves}
            onRestart={handleRestart}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;