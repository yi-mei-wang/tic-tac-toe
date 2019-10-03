import { dimensions, initialState, numOfGrids, players } from "./constants.mjs";
import {
  changeDisplayMessage,
  changeToRestartButton,
  checkIfGridIsEmpty,
  insertMarker
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

  // document.getElementById("start-button").addEventListener("click", startGame);
  startGame();
};

// GLOBAL SCOPE
let turns;
let currentPlayer;
let boardState = Array.from(initialState);
let gameOngoing = false;

const setUp = () => {
  turns = 0;

  currentPlayer = players[Math.floor(Math.random() * 2)];

  changeDisplayMessage("#current-player", currentPlayer);
};

// Switch player so they take turns
const getCurrentPlayer = () => {
  currentPlayer = turns % 2 === 0 ? "X" : "O";
  // Update text in current player section
  document.getElementById("current-player").innerHTML = currentPlayer;
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

        changeDisplayMessage("#game-announcement-message", "no");
      }
    }
  }
};

// Start new game
function startGame() {
  // Initialise turns, currentPlayer, and boardState
  setUp();
  gameOngoing = true;

  changeToRestartButton(gameOngoing);
  changeDisplayMessage("#game-announcement-message", "Game has started!");
}
