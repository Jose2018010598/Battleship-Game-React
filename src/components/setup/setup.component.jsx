import { useState } from "react";
import {
  COMPUTER_FLEET_OPTIONS,
  ORIENTATIONS,
  SHIPS,
} from "../../constants";
import {
  canPlaceShip,
  createEmptyBoard,
  placeShip,
} from "../../helpers";
import { Board } from "../index";
import "./setup.css";

function Setup({
  playerName,
  onPlayerNameChange,
  computerFleetOption,
  onComputerFleetOptionChange,
  debugMode,
  onDebugModeChange,
  onStartGame,
}) {
  const [setupBoard, setSetupBoard] = useState(createEmptyBoard);
  const [currentShipIndex, setCurrentShipIndex] = useState(0);
  const [orientation, setOrientation] = useState(ORIENTATIONS.HORIZONTAL);
  const [message, setMessage] = useState(
    "Preenche o teu nome e começa a posicionar a frota."
  );

  const currentShip = SHIPS[currentShipIndex];
  const allShipsPlaced = currentShipIndex >= SHIPS.length;

  const handleOrientationChange = (event) => {
    setOrientation(event.currentTarget.value);
  };

  const handleBoardClick = (row, col) => {
    if (playerName.trim().length === 0) {
      setMessage("Antes de posicionar a frota, introduz o nome do jogador.");
      return;
    }

    if (allShipsPlaced) {
      setMessage("A frota já está toda posicionada. Podes iniciar o jogo.");
      return;
    }

    const isValidPosition = canPlaceShip(
      setupBoard,
      row,
      col,
      currentShip.size,
      orientation
    );

    if (!isValidPosition) {
      setMessage("Posição inválida: o navio não cabe ou sobrepõe outro navio.");
      return;
    }

    const updatedBoard = placeShip(
      setupBoard,
      currentShip,
      row,
      col,
      orientation
    );

    setSetupBoard(updatedBoard);

    const nextShipIndex = currentShipIndex + 1;
    setCurrentShipIndex(nextShipIndex);

    if (nextShipIndex >= SHIPS.length) {
      setMessage("Frota completa! Agora podes iniciar o jogo.");
    } else {
      setMessage(`Navio colocado. Agora posiciona: ${SHIPS[nextShipIndex].name}.`);
    }
  };

  const handleStartGame = () => {
    if (playerName.trim().length === 0) {
      setMessage("Introduz o nome do jogador antes de iniciar.");
      return;
    }

    if (!allShipsPlaced) {
      setMessage("Tens de posicionar todos os navios antes de iniciar o jogo.");
      return;
    }

    onStartGame(setupBoard);
  };

  return (
    <section className="setup">
      <h2>Configuração Inicial</h2>

      <div className="setup-layout">
        <form className="setup-form">
          <label>
            Nome do jogador:
            <input
              type="text"
              value={playerName}
              onChange={onPlayerNameChange}
              placeholder="Introduz o teu nome"
            />
          </label>

          <label>
            Frota do computador:
            <select
              value={computerFleetOption}
              onChange={onComputerFleetOptionChange}
            >
              <option value={COMPUTER_FLEET_OPTIONS.PRESET_1}>
                Frota pré-definida 1
              </option>
              <option value={COMPUTER_FLEET_OPTIONS.PRESET_2}>
                Frota pré-definida 2
              </option>
              <option value={COMPUTER_FLEET_OPTIONS.PRESET_3}>
                Frota pré-definida 3
              </option>
              <option value={COMPUTER_FLEET_OPTIONS.RANDOM}>
                Frota aleatória
              </option>
            </select>
          </label>

          <label>
            Orientação:
            <select value={orientation} onChange={handleOrientationChange}>
              <option value={ORIENTATIONS.HORIZONTAL}>Horizontal</option>
              <option value={ORIENTATIONS.VERTICAL}>Vertical</option>
            </select>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={debugMode}
              onChange={onDebugModeChange}
            />
            Mostrar frota do computador debug
          </label>

          <div className="current-ship">
            {allShipsPlaced ? (
              <p>
                <strong>Todos os navios foram posicionados.</strong>
              </p>
            ) : (
              <p>
                Navio atual: <strong>{currentShip.name}</strong> — tamanho{" "}
                <strong>{currentShip.size}</strong>
              </p>
            )}
          </div>

          <p className="setup-message">{message}</p>

          <button type="button" onClick={handleStartGame}>
            Iniciar Jogo
          </button>
        </form>

        <Board
          title={`Frota de ${playerName || "Jogador"}`}
          board={setupBoard}
          showShips={true}
          onCellClick={handleBoardClick}
        />
      </div>
    </section>
  );
}

export default Setup;