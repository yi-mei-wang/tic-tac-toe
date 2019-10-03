import { initialState, winningCombi } from "./constants.mjs";
import { numOfGrids } from "./constants.mjs";

export const changeDisplayMessage = (elem, msg) => {
  document.querySelector(elem).innerHTML = msg;
};

export const changeToRestartButton = gameOngoing => {
  // Change button to Restart Game when game has started
  if (gameOngoing) {
    let gameControl = document.getElementById("game-control");

    let restartButton = document.createElement("button");
    restartButton.setAttribute("id", "restart-button");
    restartButton.innerHTML = "Restart Game";
    restartButton.addEventListener("click", restartGame);

    // Replace the start button with the newly created restart button
    gameControl.replaceChild(restartButton, gameControl.children[0]);
  }
};

const restartGame = () => {
  // Reset game by setting turns, currentPlayer and boardState back to their initial state
  setUp();

  changeDisplayMessage("#game-announcement-message", "");

  // Clear the content of individual cells
  let grids = document.getElementsByClassName("grid-item");
  for (let i = 0; i < grids.length; i++) {
    grids[i].innerHTML = "";
  }
};

// Check if the grid is taken
export const checkIfGridIsEmpty = grid => {
  if (grid.innerHTML === "") {
    return true;
  } else {
    changeDisplayMessage(
      "#game-announcement-message",
      "CHOOOOOSE SOMEWHERE ELSE OIE"
    );
    return false;
  }
};

// Insert the current player's marker
export const insertMarker = (e, currentPlayer, boardState) => {
  e.target.innerHTML = currentPlayer;

  let row = e.target.dataset.row;
  let col = e.target.dataset.col;

  // Keep track of the current board state
  boardState[parseInt(row)][parseInt(col)] = currentPlayer;

  console.log(boardState);
};

export const checkWinIter = (boardState, currentPlayer) => {
  // Check if there is a winner
  // Compare current board position with the list of winning combinations
  // if (boardState[currentPlayer].length >= 3) {
  //   for (let i = 0; i < winningCombi.length; i++) {
  //     console.log(JSON.stringify(boardState[currentPlayer].sort()));

  //     if (
  //       JSON.stringify(
  //         winningCombi[i].includes(
  //           JSON.stringify(boardState[currentPlayer].sort())
  //         )
  //       )
  //     ) {
  //       return true;
  //     }
  //   }
  // }

  let dimensions = Math.sqrt(numOfGrids);

  // Check row (left to right)
  for (let row = 0; row < dimensions - 1; row++) {
    for (let col = 0; col < dimensions - 1; col++) {
      // If the first grid is not currentPlayer's marker, break and go to the next row
      if (boardState[row][col] !== currentPlayer) {
        break;
      } else if (boardState[row][col] !== boardState[row][col + 1]) {
        // If the current grid and the next grid do not contain the same marker, break
        break;
      } else {
        return true;
      }
    }
  }

  // Check column (top to bottom)
  for (let col = 0; col < dimensions - 1; col++) {
    for (let row = 0; row < dimensions - 1; row++) {
      // If the first grid is not currentPlayer's marker, break and go to the next col
      if (boardState[row][col] !== currentPlayer) {
        break;
      } else if (boardState[row][col] !== boardState[row + 1][col]) {
        // If the current grid and the next grid do not contain the same marker, break
        break;
      } else {
        return true;
      }
    }
  }
  // Check diag
  for (let i = 0; i < dimensions - 1; i++) {
    // If the first grid is not currentPlayer's marker, break and go to the next col
    if (boardState[i][i] !== currentPlayer) {
      break;
    } else if (boardState[i][i] !== boardState[i + 1][i + 1]) {
      // If the current grid and the next grid do not contain the same marker, break
      break;
    } else {
      return true;
    }
  }
  // Check anti-diag
  return false;
};

export const checkWin = (e, boardState) => {
  // Get the data attributes
  let row = parseInt(e.target.dataset.row);
  let col = parseInt(e.target.dataset.col);

  let currentPlayer = e.target.innerHTML;
  console.log(row);
  console.log(col);

  // To check the row, you would want to move from left to right, i.e. iterate through the col values
  // Only check the row (left to right) where the click occurred
  for (let c = 0; c < dimensions; i++) {
    // Check if each grid contains the currentPlayer's marker
    // If it doesn't, move on to the next column
    if (boardState[row][i] !== currentPlayer) {
      break;
    }

    // If the loop hasn't broken and c === 2 (i.e., the end of the row, it means that every grid in this current row contained the currentPlayer's marker)
    if (c === dimensions - 1) {
      return true;
    }
  }

  // Only check the col where the click occurred
  for (let r = 0; r < dimensions; r++) {
    if (boardState[r][col] !== currentPlayer) {
      break;
    }

    if (r === dimensions - 1) {
      return true;
    }
  }

  // Only check diagonal if row===col
  if (row === col)
    // Only check anti-diagonal if row+col === 2
    return false;
};
