import { dimensions, initialState, numOfGrids } from "./constants.mjs";
import {
  changeDisplayMessage,
  checkIfGridIsEmpty,
  insertMarker,
  restartGame,
  setUp
} from "./gameHelpers.mjs";
import { checkWin } from "./checkWin.mjs";

window.onload = () => {
  // Generate the grids on page load
  // Select the container that contains the grids
  let gridContainer = document.getElementById("game-board");

  // Programmatically append grids into the container
  for (let i = 0; i < dimensions; i++) {
    for (let j = 0; j < dimensions; j++) {
      let grid = document.createElement("div");
      grid.classList.add("grid-item");

      grid.setAttribute("data-row", i);
      grid.setAttribute("data-col", j);

      grid.classList.add(`row-${i}`);
      grid.classList.add(`col-${j}`);

      grid.addEventListener("click", () => {
        handleClick(event);
        // Play some tune onclick
      });

      gridContainer.appendChild(grid);
    }
  }

  startGame();
};

// GLOBAL VARIABLES
let turns;
let currentPlayer;
let boardState = Array.from(initialState);
let gameOngoing = false;

// Switch player so they take turns
const getCurrentPlayer = () => {
  currentPlayer = turns % 2 === 0 ? "X" : "O";
  return currentPlayer;
};

// Handles click
const handleClick = e => {
  if (gameOngoing) {
    if (checkIfGridIsEmpty(e.target)) {
      let currentPlayer = getCurrentPlayer();

      insertMarker(e, currentPlayer, boardState);

      turns++;

      changeDisplayMessage(
        "#current-player",
        `It's ${getCurrentPlayer()}'s turn!`
      );

      if (checkWin(e, boardState)) {
        gameOngoing = false;

        changeDisplayMessage("#game-announcement-message", "i am a winnah");
      } else if (turns === numOfGrids) {
        gameOngoing = false;

        changeDisplayMessage("#game-announcement-message", "iz a draw");
      }
    }
  }
};

// Start new game
function startGame() {
  // Initialise turns, currentPlayer, and boardState
  [turns, currentPlayer] = setUp();

  gameOngoing = true;

  document
    .getElementById("restart-button")
    .addEventListener("click", restartGame);
}
