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

let currentPlayer = "X";
let turns = 0;

// Select the container that contains the grids
let gridContainer = document.getElementsByClassName("grid-container")[0];

// Programmatically append grids into the container
for (let i = 0; i < 9; i++) {
  // Pass in the event by passing in 'event' or the DOMElement itself by passing in 'this'
  gridContainer.innerHTML += `<div class="grid-item" id="${i}" onclick="getGridPosition(event)" ></div>`;
}

// Handles click
const getGridPosition = e => {
  // Get the id of the element
  console.log(e.target.id);
  console.log(e.target.innerHTML);

  checkIfGridIsEmpty(e.target, "X");
};

// Toggle user
const changePlayer = turns => {
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
const checkIfGridIsEmpty = (grid, currentPlayer) => {
  if (grid.innerHTML === "") {
    grid.innerHTML = currentPlayer;
    return true;
  } else {
    alert("CHOOOOOSE SOMEWHERE ELSE OIE");
    return false;
  }
};

// Insert the marker into the grid
