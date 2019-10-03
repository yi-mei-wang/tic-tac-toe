import { players, numOfGrids } from "./constants.mjs";
import {
  changeDisplayMessage,
  changeToRestartButton,
  checkIfGridIsEmpty,
  checkWin,
  insertMarker
} from "./gameHelpers.mjs";

window.onload = () => {
  // Generate the grids on page load
  // Select the container that contains the grids
  let gridContainer = document.getElementById("game-board");

  // Programmatically append grids into the container
  for (let i = 0; i < numOfGrids; i++) {
    // Pass in the event by passing in 'event' or the DOMElement itself by passing in 'this'
    // gridContainer.innerHTML += `<div class="grid-item" id="${i}" ></div>`;

    let grid = document.createElement("div");
    grid.classList.add("grid-item");
    grid.value = i;
    grid.addEventListener("click", () => {
      handleClick(event);
      // Play some tune onclick
    });
    gridContainer.appendChild(grid);
  }
  document.getElementById("start-button").addEventListener("click", startGame);
};

// GLOBAL SCOPE
let turns;
let currentPlayer;
let gameState = {};
let gameOngoing = false;

const setUp = () => {
  turns = 0;

  currentPlayer = players[Math.floor(Math.random() * 2)];

  changeDisplayMessage("#current-player", currentPlayer);

  for (let i = 0; i < players.length; i++) {
    gameState[players[i]] = [];
  }
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

      insertMarker(e, currentPlayer, gameState);

      turns++;
      changeDisplayMessage(
        "#current-player",
        `It's ${getCurrentPlayer()}'s turn!`
      );

      if (checkWin(gameState, currentPlayer)) {
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
  // Initialise turns, currentPlayer, and gameState
  setUp();
  gameOngoing = true;

  changeToRestartButton(gameOngoing);
  changeDisplayMessage("#game-announcement-message", "Game has started!");
}

// 1 2 3
// 4 5 6
// 7 8 9
// 00 01 02
// 10 11 12
// 20 21 22
