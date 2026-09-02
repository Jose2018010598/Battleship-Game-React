import "./dashboard.css";

function Dashboard({
  playerName,
  currentTurn,
  fuel,
  moves,
  radarAvailable,
  timeLeft,
  onUseRadar,
}) {
  const isPlayerTurn = currentTurn === "player";

  return (
    <section className="dashboard">
      <div>
        <strong>Jogador:</strong> {playerName}
      </div>

      <div>
        <strong>Turno:</strong>{" "}
        {isPlayerTurn ? playerName : "Computador"}
      </div>

      <div className={timeLeft <= 5 ? "timer-warning" : ""}>
        <strong>Cronómetro:</strong> {timeLeft}s
      </div>

      <div>
        <strong>Combustível:</strong> {fuel}
      </div>

      <div>
        <strong>Jogadas:</strong> {moves}
      </div>

      <div>
        <button
          type="button"
          className="radar-button"
          disabled={!radarAvailable || !isPlayerTurn}
          onClick={onUseRadar}
        >
          Radar: {radarAvailable ? "Disponível" : "Indisponível"}
        </button>
      </div>
    </section>
  );
}

export default Dashboard;