import { dimensions, initialState, numOfGrids, players } from "./constants.mjs";
import {
  changeDisplayMessage,
  checkIfGridIsEmpty,
  getCurrentPlayer,
  insertMarker
} from "./gameHelpers.mjs";
import { checkWin } from "./checkWin.mjs";

// GLOBAL VARIABLES
let turns;
let currentPlayer;
let boardState;
let gameOngoing = false;

// Main game function
const handleClick = e => {
  if (gameOngoing) {
    if (checkIfGridIsEmpty(e.currentTarget)) {
      currentPlayer = getCurrentPlayer(turns);

      insertMarker(e, currentPlayer, boardState);

      turns++;

      changeDisplayMessage(
        "#current-player",
        `It's ${getCurrentPlayer(turns)}'s turn!`
      );

      if (checkWin(e, boardState)) {
        gameOngoing = false;

        changeDisplayMessage(
          "#game-announcement-message",
          `${currentPlayer} is a winnah`
        );
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
  [turns, currentPlayer, boardState] = setUp();

  gameOngoing = true;

  document
    .getElementById("restart-button")
    .addEventListener("click", restartGame);
}

const restartGame = () => {
  // Reset game by setting turns, currentPlayer and boardState back to their initial state
  [turns, currentPlayer, boardState] = setUp();

  // Clear announcement board
  changeDisplayMessage("#game-announcement-message", "");

  // Clear the content of individual cells
  let grids = document.getElementsByClassName("grid-item");
  for (let i = 0; i < grids.length; i++) {
    grids[i].innerHTML = "";
  }

  gameOngoing = true;
};

const setUp = () => {
  let turns = 0;

  let currentPlayer = players[Math.floor(Math.random() * 2)];

  let boardState = JSON.parse(initialState);

  return [turns, currentPlayer, boardState];
};

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
