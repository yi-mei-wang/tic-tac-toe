window.onload = () => {
  // Generate the grids on page load
  // Select the container that contains the grids
  let gridContainer = document.getElementsByClassName("game-board")[0];

  // Programmatically append grids into the container
  for (let i = 0; i < 9; i++) {
    // Pass in the event by passing in 'event' or the DOMElement itself by passing in 'this'
    gridContainer.innerHTML += `<div class="grid-item" id="${i}" ></div>`;
  }
  startGame();
};

const winningCombi = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const players = ["O", "X"];

// GLOBAL SCOPE
let turns = 0;
let currentPlayer = players[Math.floor(Math.random() * 2)];

// Check if the grid is taken
const checkIfGridIsEmpty = grid => {
  if (grid.innerHTML === "") {
    return true;
  } else {
    alert("CHOOOOOSE SOMEWHERE ELSE OIE");
    return false;
  }
};

// Insert the current player's marker
const insertMarker = (e, currentPlayer) => {
  e.target.innerHTML = currentPlayer;
};

// Switch player so they take turns
const getCurrentPlayer = () => {
  currentPlayer = turns % 2 === 0 ? "X" : "O";
  console.log(currentPlayer);
  return currentPlayer;
};

// Handles click
const handleClick = e => {
  if (checkIfGridIsEmpty(e.target)) {
    insertMarker(e, getCurrentPlayer());
    turns++;
  }
};

// Continue game as long as there is no winner
const checkWin = () => {
  // Check if there is a winner
  // Compare current board position with the list of winning combinations
};

// Start new game
function startGame() {
  // Select all the grids in the board
  let grids = document.querySelectorAll(".grid-item");

  for (let i = 0; i < grids.length; i++) {
    grids[i].addEventListener("click", () => {
      handleClick(event);
      // Play some tune onclick
    });
  }
}
