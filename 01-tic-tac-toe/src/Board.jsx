/*
  Storing history of moves to implement time travel:
    - If squares array is mutated, implementing time travel would be very difficult.
    - Storet the past arrays in another array called history, which will store as a new state variable.
  Lifting up state to the game component will let you remove the squares state from its child Board component.
    */

import { useState } from "react";

import "./styles.css";
import Sqaure from "./Square";

// Wrtiting this function outside the default exported function is no problem.

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Board({ xIsNext, squares, onPlay }) {
  /*
  Benefits of Immutability:
    - Makes complex features easy to implement. Time travel feature implemented later in the section.
    - Makes it very cheap for the components to compare whether their data has changed or not.
  */

  function handleClick(i) {
    // If square(i) is already set, the function does nothing.
    if (squares[i] !== null || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  // Diplaying the winner.
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Sqaure value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Sqaure value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Sqaure value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Sqaure value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Sqaure value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Sqaure value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Sqaure value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Sqaure value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Sqaure value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
