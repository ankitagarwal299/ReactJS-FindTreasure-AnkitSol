import React from "react";
import { EmptyCell, Treasure, Player } from "./cell";

function identifyCell(r, c, playerPos, treasurePos) {
  if (r === playerPos.x && c === playerPos.y) {
    return <Player />;
  } else if (r === treasurePos.x && c === treasurePos.y) {
    return <Treasure />;
  } else {
    return <EmptyCell />;
  }
}

export default function Grid({ playerCoord, treasureCoord }) {
  return (
    <div className="gameContainer">
      {[...Array(9)].map((value, row) => (
        <div className="row" key={row}>
          {[...Array(9)].map((value, col) => (
            <div className="col" key={col}>
              {identifyCell(row, col, playerCoord, treasureCoord)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
