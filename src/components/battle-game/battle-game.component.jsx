import { useEffect, useState } from "react";
import { Board, Dashboard, Legend } from "../index";
import {
  attackCell,
  areAllShipsSunk,
  createComputerBoard,
  createEmptyBoard,
  getAdvancedComputerTarget,
  getValidRadarArea,
  updateComputerTargetQueue,
} from "../../helpers";
import {
  HIT_REWARD,
  INITIAL_FUEL,
  MAX_FUEL,
  RADAR_TIME_LIMIT,
  SHOT_COST,
  TIME_PENALTY,
  TURNS,
  TURN_TIME,
} from "../../constants";
import "./battle-game.css";

function BattleGame({
  playerName,
  playerBoard,
  computerFleetOption,
  debugMode,
  onGameOver,
}) {
  const [currentPlayerBoard, setCurrentPlayerBoard] = useState(
    () => playerBoard || createEmptyBoard()
  );

  const [computerBoard, setComputerBoard] = useState(() =>
    createComputerBoard(computerFleetOption)
  );

  const [currentTurn, setCurrentTurn] = useState(TURNS.PLAYER);
  const [fuel, setFuel] = useState(INITIAL_FUEL);
  const [moves, setMoves] = useState(0);
  const [radarAvailable, setRadarAvailable] = useState(false);
  const [radarArea, setRadarArea] = useState(null);
  const [computerTargetQueue, setComputerTargetQueue] = useState([]);
  const [timeLeft, setTimeLeft] = useState(TURN_TIME);

  const [message, setMessage] = useState(
    "Escolhe uma célula do tabuleiro do computador para disparar."
  );
/*
  useEffect(() => {
    if (currentTurn === TURNS.PLAYER) {
      setTimeLeft(TURN_TIME);
    }
  }, [currentTurn]); */

 useEffect(() => {
  if (currentTurn !== TURNS.PLAYER) {
    return;
  }

  const timerId = setInterval(() => {
    setTimeLeft((currentTime) => {
      if (currentTime <= 1) {
        clearInterval(timerId);

        const nextFuel = fuel - TIME_PENALTY;

        setFuel(nextFuel);

        if (nextFuel <= 0) {
          onGameOver("Computador", moves);
          return 0;
        }

        setMessage(
          `Tempo esgotado! Perdeste ${TIME_PENALTY} unidades de combustível.`
        );

        setCurrentTurn(TURNS.COMPUTER);

        return 0;
      }

      return currentTime - 1;
    });
  }, 1000);

  return () => clearInterval(timerId);
}, [currentTurn, fuel, moves, onGameOver]);



  useEffect(() => {
    if (currentTurn !== TURNS.COMPUTER) {
      return;
    }

    const computerTurnTimeout = setTimeout(() => {
      const { targetCell, remainingTargets } = getAdvancedComputerTarget(
        currentPlayerBoard,
        computerTargetQueue
      );

      if (!targetCell) {
        onGameOver(playerName, moves);
        return;
      }

      const attackResult = attackCell(
        currentPlayerBoard,
        targetCell.row,
        targetCell.col
      );

      const nextMoves = moves + 1;

      const updatedTargetQueue = updateComputerTargetQueue(
        attackResult.board,
        targetCell.row,
        targetCell.col,
        attackResult,
        remainingTargets
      );

      setCurrentPlayerBoard(attackResult.board);
      setComputerTargetQueue(updatedTargetQueue);
      setMoves(nextMoves);

      if (attackResult.wasSunk) {
        setMessage(
          `O computador disparou em (${targetCell.row + 1}, ${
            targetCell.col + 1
          }) e destruiu um dos teus navios!`
        );
      } else if (attackResult.wasHit) {
        setMessage(
          `O computador disparou em (${targetCell.row + 1}, ${
            targetCell.col + 1
          }) e acertou num dos teus navios! Vai tentar posições próximas.`
        );
      } else {
        setMessage(
          `O computador disparou em (${targetCell.row + 1}, ${
            targetCell.col + 1
          }) e falhou.`
        );
      }

      if (areAllShipsSunk(attackResult.board)) {
        onGameOver("Computador", nextMoves);
        return;
      }

      setTimeLeft(TURN_TIME);
      setCurrentTurn(TURNS.PLAYER);
    }, 1000);

    return () => clearTimeout(computerTurnTimeout);
  }, [
    currentTurn,
    currentPlayerBoard,
    computerTargetQueue,
    moves,
    onGameOver,
    playerName,
  ]);

  const handleUseRadar = () => {
    if (!radarAvailable) {
      setMessage("O radar ainda não está disponível.");
      return;
    }

    if (currentTurn !== TURNS.PLAYER) {
      setMessage("Só podes usar o radar no teu turno.");
      return;
    }

    const validRadarArea = getValidRadarArea(computerBoard);

    if (!validRadarArea) {
      setMessage("Não existem posições válidas para usar o radar.");
      setRadarAvailable(false);
      return;
    }

    setRadarArea(validRadarArea);
    setRadarAvailable(false);
    setMessage(
      "Radar usado! Foi destacada uma área 2x2 com possível navio inimigo."
    );
  };

  const handlePlayerBoardClick = () => {
    if (currentTurn === TURNS.COMPUTER) {
      setMessage("O computador está a jogar. Aguarda pelo teu turno.");
      return;
    }

    setMessage("Deves disparar no tabuleiro do computador.");
  };

    const handleComputerBoardClick = (row, col) => {
      if (currentTurn !== TURNS.PLAYER) {
        setMessage("Espera pela tua vez para jogar.");
        return;
      }

      if (timeLeft <= 0) {
        setMessage("O tempo esgotou. Aguarda pela jogada do computador.");
        return;
      }

      const attackResult = attackCell(computerBoard, row, col);

      if (attackResult.alreadyAttacked) {
        setMessage("Essa célula já foi atacada. Escolhe outra posição.");
        return;
      }

      const nextMoves = moves + 1;

      let nextFuel = fuel - SHOT_COST;

      if (attackResult.wasHit) {
        nextFuel = Math.min(MAX_FUEL, nextFuel + HIT_REWARD);
      }

      const moveDuration = TURN_TIME - timeLeft;
      const earnedRadar =
        attackResult.wasHit && moveDuration < RADAR_TIME_LIMIT;

      setComputerBoard(attackResult.board);
      setMoves(nextMoves);
      setFuel(nextFuel);
      setRadarArea(null);

      if (earnedRadar) {
        setRadarAvailable(true);
      }

      if (attackResult.wasSunk) {
        setMessage(
          earnedRadar
            ? "Destruíste um navio inimigo e ganhaste um radar!"
            : "Acertaste e destruíste um navio inimigo!"
        );
      } else if (attackResult.wasHit) {
        setMessage(
          earnedRadar
            ? "Acertaste em menos de 3 segundos! Radar disponível."
            : "Acertaste num navio inimigo!"
        );
      } else {
        setMessage("Tiro falhado. Acertaste na água.");
      }

      if (areAllShipsSunk(attackResult.board)) {
        onGameOver(playerName, nextMoves);
        return;
      }

      if (nextFuel <= 0) {
        onGameOver("Computador", nextMoves);
        return;
      }

    setMessage("Turno do computador...");
    setCurrentTurn(TURNS.COMPUTER);
    };

  return (
    <section className="battle-game">
      <Dashboard
        playerName={playerName}
        currentTurn={currentTurn}
        fuel={fuel}
        moves={moves}
        radarAvailable={radarAvailable}
        timeLeft={timeLeft}
        onUseRadar={handleUseRadar}
      />

      <p className="game-message">{message}</p>
      <Legend />

      <div className="boards-area">
        <Board
          title={`Frota de ${playerName}`}
          board={currentPlayerBoard}
          showShips={true}
          onCellClick={handlePlayerBoardClick}
        />

        <Board
          title="Frota do Computador"
          board={computerBoard}
          showShips={debugMode}
          radarArea={radarArea}
          onCellClick={handleComputerBoardClick}
        />
      </div>
    </section>
  );
}

export default BattleGame;