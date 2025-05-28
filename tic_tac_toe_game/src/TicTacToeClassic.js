import React, { useState } from "react";

/**
 * Color palette from requirements:
 *  primary:   #ffffff
 *  secondary: #222222
 *  accent:    #4caf50
 */

// PUBLIC_INTERFACE
function TicTacToeClassic() {
  /**
   * Main container for TicTacToe Classic
   * Features:
   * - Two-player turn mode (X, O)
   * - Win detection
   * - Draw detection
   * - Game reset
   * Layout:
   * - Current player displayed above the grid
   * - 3x3 grid, centered; square, clickable cells
   * - Game status and reset button below grid
   */
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  // PUBLIC_INTERFACE
  function getCurrentPlayer() {
    /** Returns 'X' or 'O' for current turn */
    return xIsNext ? "X" : "O";
  }

  // PUBLIC_INTERFACE
  function calculateWinner(squares) {
    /** Returns 'X' or 'O' if that player has won, else null */
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6] // diags
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  // PUBLIC_INTERFACE
  function handleClick(index) {
    /** Handles click on square at index */
    if (winner || board[index]) {
      return;
    }
    const boardCopy = board.slice();
    boardCopy[index] = getCurrentPlayer();
    const newWinner = calculateWinner(boardCopy);
    const newDraw =
      !newWinner && boardCopy.every(cell => cell !== null);

    setBoard(boardCopy);
    setWinner(newWinner);
    setIsDraw(newDraw);
    setXIsNext(x => !x);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    /** Resets the game to initial state */
    setBoard(emptyBoard);
    setXIsNext(true);
    setWinner(null);
    setIsDraw(false);
  }

  // PUBLIC_INTERFACE
  function renderSquare(index) {
    /** Renders a single square (cell) at index */
    const cellValue = board[index];
    return (
      <button
        className="ttt-square"
        onClick={() => handleClick(index)}
        aria-label={`Cell ${index + 1}${cellValue ? `, ${cellValue}` : ""}`}
        style={{
          color: cellValue === "X" ? "#222222" : "#4caf50",
          cursor: board[index] || winner ? "default" : "pointer",
        }}
        disabled={Boolean(board[index]) || Boolean(winner)}
      >
        {cellValue}
      </button>
    );
  }

  // Layout
  let status;
  if (winner) {
    status = (
      <span style={{ color: "#4caf50", fontWeight: 500 }}>
        Player {winner} wins!
      </span>
    );
  } else if (isDraw) {
    status = (
      <span style={{ color: "#222222", fontWeight: 500 }}>
        It's a draw!
      </span>
    );
  } else {
    status = (
      <span style={{ color: "#222222" }}>
        Next turn: <strong>{getCurrentPlayer()}</strong>
      </span>
    );
  }

  // Main render
  return (
    <div className="ttt-container">
      <h2 className="ttt-title">TicTacToe Classic</h2>
      <div className="ttt-turn">
        {winner || isDraw ? null : (
          <>
            <span style={{ color: "#222222" }}>
              Current Player:{" "}
              <strong style={{ color: getCurrentPlayer() === "X" ? "#222222" : "#4caf50" }}>
                {getCurrentPlayer()}
              </strong>
            </span>
          </>
        )}
      </div>
      <div className="ttt-board">
        {[0, 1, 2].map(row => (
          <div className="ttt-board-row" key={row}>
            { [0, 1, 2].map(col =>
                renderSquare(row * 3 + col)
              )
            }
          </div>
        ))}
      </div>
      <div className="ttt-status">
        {status}
      </div>
      <button className="ttt-reset-btn" onClick={handleReset}>
        Reset Game
      </button>
      {/* Inline styles for component scoping */}
      <style>{`
        .ttt-container {
          background: #fff;
          padding: 36px 24px 32px 24px;
          border-radius: 14px;
          box-shadow: 0 6px 32px 0 rgba(0,0,0,0.05), 0 1.5px 10px 0 rgba(76,175,80,0.05);
          max-width: 340px;
          margin: 60px auto;
          text-align: center;
        }
        .ttt-title {
          margin-bottom: 12px;
          color: #4caf50;
          font-size: 1.7rem;
          letter-spacing: 0.02em;
        }
        .ttt-turn {
          margin-bottom: 18px;
          font-size: 1.07rem;
        }
        .ttt-board {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 22px;
        }
        .ttt-board-row {
          display: flex;
        }
        .ttt-square {
          width: 70px;
          height: 70px;
          font-size: 2.2rem;
          font-weight: 600;
          background: #fff;
          border: 2px solid #222222;
          border-right: none;
          border-bottom: none;
          outline: none;
          transition: background 0.18s;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          margin: 0;
        }
        .ttt-board-row .ttt-square:last-child {
          border-right: 2px solid #222222;
        }
        .ttt-board-row:last-child .ttt-square {
          border-bottom: 2px solid #222222;
        }
        .ttt-square:active:not(:disabled) {
          background: #e8f5e9;
        }
        .ttt-square:disabled {
          opacity: 1;
          background: #fafafa;
        }
        .ttt-status {
          margin-bottom: 18px;
          font-size: 1.1rem;
          min-height: 1.4em;
        }
        .ttt-reset-btn {
          background: #4caf50;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 10px 22px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .ttt-reset-btn:hover, .ttt-reset-btn:focus {
          background: #43a047;
        }
        @media (max-width: 500px) {
          .ttt-container {
            padding: 16px 5px 18px 5px;
            max-width: 98vw;
          }
          .ttt-square {
            width: 24vw;
            height: 24vw;
            min-width: 36px; min-height: 36px;
            max-width: 72px; max-height: 72px;
          }
        }
      `}</style>
    </div>
  );
}

export default TicTacToeClassic;
