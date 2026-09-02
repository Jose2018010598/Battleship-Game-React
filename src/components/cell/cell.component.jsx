import "./cell.css";

function Cell({ cell, showShip, isRadarCell, onClick }) {
  let className = "cell";

  if (cell.attacked && cell.hit) {
    className += " cell-hit";
  } else if (cell.attacked && !cell.hit) {
    className += " cell-miss";
  } else if (showShip && cell.shipId) {
    className += " cell-ship";
  }

  if (cell.sunk) {
    className += " cell-sunk";
  }

  if (isRadarCell) {
    className += " cell-radar";
  }

  return (
    <button className={className} type="button" onClick={onClick}>
      {cell.sunk ? "X" : cell.attacked && !cell.hit ? "-" : ""}
       </button>
  );
}

export default Cell;