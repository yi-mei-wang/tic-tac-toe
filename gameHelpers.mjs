import { players } from "./constants.mjs";

export const changeDisplayMessage = (elem, msg) => {
  document.querySelector(elem).innerHTML = msg;
};

export const setUp = () => {
  let turns = 0;

  let currentPlayer = players[Math.floor(Math.random() * 2)];

  return [turns, currentPlayer];
};

export const restartGame = () => {
  // Reset game by setting turns, currentPlayer and boardState back to their initial state
  setUp();

  // Clear announcement board
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

// Switch player so they take turns
export const getCurrentPlayer = (turns) => {
  return turns % 2 === 0 ? "X" : "O";
};
