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
  let row = e.target.dataset.row;
  let col = e.target.dataset.col;
  let currentPlayer = e.target.innerHTML;
  console.log(row);
  // let col = e.target.dataset.col;
};
