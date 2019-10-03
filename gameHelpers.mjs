export const changeDisplayMessage = (elem, msg) => {
  document.querySelector(elem).innerHTML = msg;
};

export const changeToRestartButton = gameOngoing => {
  // Change button to Restart Game when game has started
  if (gameOngoing) {
    let gameControl = document.getElementById("game-control");

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
