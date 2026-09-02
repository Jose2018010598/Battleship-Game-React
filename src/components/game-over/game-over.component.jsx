import "./game-over.css";

function GameOver({ winner, moves, onRestart }) {
  return (
    <section className="game-over">
      <h2>Fim de Jogo</h2>

      <p>
        <strong>Vencedor:</strong> {winner}
      </p>

      <p>
        <strong>Número de jogadas:</strong> {moves}
      </p>

      <button type="button" onClick={onRestart}>
        Jogar Novamente
      </button>
    </section>
  );
}

export default GameOver;