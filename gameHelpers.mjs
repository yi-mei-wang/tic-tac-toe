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
  // Reset game by setting turns, currentPlayer and gameState back to their initial state
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
export const insertMarker = (e, currentPlayer, gameState) => {
  e.target.innerHTML = currentPlayer;
  // Keep track of the current configuration
  gameState[currentPlayer].push(e.target.id);
};
