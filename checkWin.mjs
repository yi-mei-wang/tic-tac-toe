import { dimensions } from "./constants.mjs";

export const checkWin = (e, boardState) => {
  // Get the data attributes
  console.log(e);
  console.log(e.toElement.dataset.row);
  console.log(e.target);
  let row = parseInt(e.target.dataset.row);
  let col = parseInt(e.target.dataset.col);

  let currentPlayer = e.toElement.children[0].dataset.player;

  // If no winner is detected after checking all possible directions, return false
  if (!checkRow(row, currentPlayer, boardState)) {
    if (!checkCol(col, currentPlayer, boardState)) {
      if (!checkDiag(row, col, currentPlayer, boardState)) {
        if (!checkAntiDiag(row, col, currentPlayer, boardState)) {
          return false;
        }
      }
    }
  }

  return true;
};

const checkRow = (row, currentPlayer, boardState) => {
  // To check the row, you would want to move from left to right, i.e. iterate through the col values
  // Only check the row (left to right) where the click occurred
  for (let c = 0; c < dimensions; c++) {
    // Check if each grid contains the currentPlayer's marker
    // If it doesn't, move on to the next column
    if (boardState[row][c] !== currentPlayer) {
      break;
    }

    // If the loop hasn't broken and c === 2 (i.e., the end of the row, it means that every grid in this current row contained the currentPlayer's marker)
    if (c === dimensions - 1) {
      return true;
    }
  }
  return false;
};

const checkCol = (col, currentPlayer, boardState) => {
  // Only check the col where the click occurred
  for (let r = 0; r < dimensions; r++) {
    if (boardState[r][col] !== currentPlayer) {
      break;
    }

    if (r === dimensions - 1) {
      return true;
    }
  }
  return false;
};

const checkDiag = (row, col, currentPlayer, boardState) => {
  // Only check diagonal if row===col
  if (row === col) {
    for (let i = 0; i < dimensions; i++) {
      if (boardState[i][i] !== currentPlayer) {
        break;
      }

      if (i === dimensions - 1) {
        return true;
      }
    }
  }
  return false;
};

const checkAntiDiag = (row, col, currentPlayer, boardState) => {
  // Only check anti-diagonal if row+col === 2
  if (row + col === dimensions - 1) {
    for (let i = 0; i < dimensions; i++) {
      if (boardState[i][dimensions - i - 1] !== currentPlayer) {
        break;
      }

      if (i === dimensions - 1) {
        return true;
      }
    }
  }
  return false;
};
