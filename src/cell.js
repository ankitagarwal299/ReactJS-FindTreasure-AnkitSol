import React from "react";

function Cell({ backgroundColor = "grey" }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor
      }}
    />
  );
}

export function Player() {
  return <Cell backgroundColor="red" />;
}

export function Treasure() {
  return <Cell backgroundColor="yellow" />;
}

export function EmptyCell() {
  return <Cell />;
}
