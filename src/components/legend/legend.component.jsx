import "./legend.css";

function Legend() {
  return (
    <section className="legend">
      <h3>Legenda</h3>

      <div className="legend-items">
        <div className="legend-item">
          <span className="legend-square legend-water"></span>
          <span>Água / Não explorada</span>
        </div>

        <div className="legend-item">
          <span className="legend-square legend-ship"></span>
          <span>Navio visível / Debug</span>
        </div>

        <div className="legend-item">
          <span className="legend-square legend-miss"></span>
          <span>Tiro falhado</span>
        </div>

        <div className="legend-item">
          <span className="legend-square legend-hit"></span>
          <span>Acerto</span>
        </div>

        <div className="legend-item">
          <span className="legend-square legend-sunk"></span>
          <span>Navio destruído</span>
        </div>

        <div className="legend-item">
          <span className="legend-square legend-radar"></span>
          <span>Área revelada pelo radar</span>
        </div>
      </div>
    </section>
  );
}

export default Legend;