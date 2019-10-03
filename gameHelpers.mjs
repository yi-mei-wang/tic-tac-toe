export const changeDisplayMessage = (elem, msg) => {
  document.querySelector(elem).innerHTML = msg;
};

// Check if the grid is taken
export const checkIfGridIsEmpty = grid => {
  if (grid.innerHTML === "") {
    return true;
  } else {
    changeDisplayMessage("#game-announcement-message", "OPEN YOUR EYES");
    return false;
  }
};

// Insert the current player's marker
export const insertMarker = (e, currentPlayer, boardState) => {
  e.target.innerHTML =
    currentPlayer === "X"
      ? "<img src='x.png' data-player='X'/>"
      : "<img src='o.png' data-player='O'/>";

  let row = e.target.dataset.row;
  let col = e.target.dataset.col;

  // Keep track of the current board state
  boardState[parseInt(row)][parseInt(col)] = currentPlayer;
};

// Switch player so they take turns
export const getCurrentPlayer = turns => {
  return turns % 2 === 0 ? "X" : "O";
};
