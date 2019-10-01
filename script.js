window.onload = () => {
  // Generate the grids on page load
  // Select the container that contains the grids
  let gridContainer = document.getElementsByClassName("game-board")[0];

  // Programmatically append grids into the container
  for (let i = 0; i < 9; i++) {
    // Pass in the event by passing in 'event' or the DOMElement itself by passing in 'this'
    gridContainer.innerHTML += `<div class="grid-item" id="${i}" ></div>`;
  }
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

// Switch player so they take turns
const switchPlayer = (turns, currentPlayer) => {
  currentPlayer = turns % 2 ? "X" : "O";
  turns++;
  return turns, currentPlayer;
};

// Continue game as long as there is no winner
const checkWin = () => {
  // Check if there is a winner
  // Compare current board position with the list of winning combinations
};

// Check if the grid is taken
const checkIfGridIsEmpty = grid => {
  if (grid.innerHTML === "") {
    return true;
  } else {
    alert("CHOOOOOSE SOMEWHERE ELSE OIE");
    return false;
  }
};

const insertMarker = (e, currentPlayer) => {
  e.target.innerHTML = currentPlayer;
};

// Handles click
const handleClick = (e, currentPlayer, turns) => {
  if (checkIfGridIsEmpty(e.target)) {
    insertMarker(e, currentPlayer);
    switchPlayer(turns, currentPlayer);
    turns++;
  }
};

// Start new game
function startGame() {
  let turns = 0;
  // Set player
  let currentPlayer = players[Math.floor(Math.random() * 2)];
  // Select all the grids in the board
  let grids = document.querySelectorAll(".grid-item");

  for (let i = 0; i < grids.length; i++) {
    console.log(i);
    grids[i].addEventListener("click", () => {
      handleClick(currentPlayer, turns);
    });
  }
}

startGame();
