import "./board.css";
import { Cell } from "../index";
import { isCellInRadarArea } from "../../helpers";

function Board({
  title,
  board,
  showShips = false,
  radarArea = null,
  onCellClick,
}) {
  return (
    <section className="board-container">
      <h3>{title}</h3>

      <div className="board">
        {board.map((row) =>
          row.map((cell) => (
            <Cell
              key={`${cell.row}-${cell.col}`}
              cell={cell}
              showShip={showShips}
              isRadarCell={isCellInRadarArea(cell, radarArea)}
              onClick={() => onCellClick && onCellClick(cell.row, cell.col)}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default Board;