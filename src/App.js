import "./styles.css";
import Grid from "./grid.js";
import React, { useEffect, useState } from "react";

const Direction = {
  UP: "UP",
  RIGHT: "RIGHT",
  DOWN: "DOWN",
  LEFT: "LEFT"
};

function getDirectionFromKey(event) {
  if (event.key === "ArrowUp") return Direction.UP;
  if (event.key === "ArrowDown") return Direction.DOWN;
  if (event.key === "ArrowLeft") return Direction.LEFT;
  if (event.key === "ArrowRight") return Direction.RIGHT;

  return "";
}

function generateTreasureCoords(playerCoord) {
  const x = Math.floor(Math.random() * (8 - 0 + 1) + 0); //0-9
  const y = Math.floor(Math.random() * (8 - 0 + 1) + 0); //0-9

  if (playerCoord.x === x && playerCoord.y === y) {
    generateTreasureCoords(playerCoord);
  } else {
    return { x: x, y: y };
  }
}

function keepOnGrid(val, max = 8) {
  if (val < 0) return 0;
  if (val > max) return max;
  return val;
}

function movePlayerPosition(newDirection, playerCoord) {
  const newCoordinates = Object.assign({}, playerCoord);
  if (newDirection === Direction.UP) {
    return { x: keepOnGrid(newCoordinates.x - 1), y: newCoordinates.y };
  }
  if (newDirection === Direction.DOWN) {
    return { x: keepOnGrid(newCoordinates.x + 1), y: newCoordinates.y };
  }
  if (newDirection === Direction.LEFT) {
    return { x: newCoordinates.x, y: keepOnGrid(newCoordinates.y - 1) };
  }
  if (newDirection === Direction.RIGHT) {
    return { x: newCoordinates.x, y: keepOnGrid(newCoordinates.y + 1) };
  }
}

export default function App() {
  const [playerCoord, setPlayerCoord] = useState({ x: 4, y: 4 });

  const [treasureCoord, setTreasureCoord] = useState(
    generateTreasureCoords(playerCoord)
  );
  const [score, setScore] = useState(0);

  function handleKeyboardEvent(event) {
    event.stopPropagation();
    event.stopImmediatePropagation();

    const newDirection = getDirectionFromKey(event);

    console.log(event.key, playerCoord);

    if (newDirection === "") return "";
    let n = movePlayerPosition(newDirection, playerCoord);

    console.log("newcordinates", n);
    setPlayerCoord({ x: n.x, y: n.y });

    //update Score if treasure reached
    //update treasure location if tresure reached
    if (n.x === treasureCoord.x && n.y === treasureCoord.y) {
      setScore(score + 1);
      setTreasureCoord(generateTreasureCoords(playerCoord));
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboardEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyboardEvent);
    };
  }, [playerCoord]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {JSON.stringify(playerCoord)}
      <Grid playerCoord={playerCoord} treasureCoord={treasureCoord} />
      <h1>score: {score}</h1>
    </div>
  );
}

/*
arr = [cell, player, cell, cell, treasure]

Components: 
1. grid component : 10 x 10, <- Ankit
    Row & Cell component
    style border 1 px solid black
    backgroundColor : grey

2. cell component : 1 x 1 <- Frances
    keep color state

Functions:
1. Generate treasure location <- Russel
    x axis -> Math.floor(Math.random() * 10)
    y axis -> Math.floor(Math.random() * 10)
  if player [x,y] is same as generated [x,y] run again
  
  function generateTreasureLocation(playerXCoord, playerYCorrd) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    if (playerXCoord === x && playerYCoord === y) {
      generateTreasureLocation(playerXCoord, playerYCoord)
    } else {
      setTreasureXCoord(x)
      setTreasureYCoord(y)
    }
  }

2. Check whether the player location is the same as the trasure location: 
  checkLocation() <- Frances & Sukhmandeep
    called in useEffect when player moves 
    checks if player coordinates are the same as treasure coordinates
      iterate over player position and compare x and y with treasure x and y
    if so, it regenerates treasure position and adds one to the score


3. Move player on key press < Ankit & Russel
    get [row, col] and higlight that cell
    UP ARROW: row (y) = row+1 (moving down)
    DOWN ARROW: row (y) = row-1 (moving up)
    RIGHT ARROW: col (x) = col+1 (moving right)
    LEFT ARROW: col (x) = col-1 (moving left)
    Check should not cross bounds 
      row = 0 to matrix.length-1
      col = 0 to matrix.length-1
     
State: <- Sukhmandeep
1. PlayerX : x 
2. PlayerY: y 
3. TreasureX: generateTreasureLocation(postionOfPlayer...) (x, y)
4. TreasureY:
5. score: 0


 */
