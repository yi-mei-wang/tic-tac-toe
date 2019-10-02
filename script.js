window.onload = () => {
  // Generate the grids on page load
  // Select the container that contains the grids
  let gridContainer = document.getElementById("game-board");

  // Programmatically append grids into the container
  for (let i = 0; i < 9; i++) {
    // Pass in the event by passing in 'event' or the DOMElement itself by passing in 'this'
    // gridContainer.innerHTML += `<div class="grid-item" id="${i}" ></div>`;

    let grid = document.createElement("div");
    grid.classList.add("grid-item");
    grid.id = i;
    grid.addEventListener("click", () => {
      handleClick(event);
      // Play some tune onclick
    });
    gridContainer.appendChild(grid);
  }
};

const winningCombi = [
  ["0", "1", "2"],
  ["3", "4", "5"],
  ["6", "7", "8"],
  ["0", "3", "6"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["0", "4", "8"],
  ["2", "4", "6"]
];

const players = ["O", "X"];

// GLOBAL SCOPE
let turns;
let currentPlayer;
let gameState = {};
let gameOngoing = false;

const setUp = () => {
  turns = 0;
  currentPlayer = players[Math.floor(Math.random() * 2)];
  for (i in players) {
    gameState[players[i]] = [];
  }
};

// Check if the grid is taken
const checkIfGridIsEmpty = grid => {
  if (grid.innerHTML === "") {
    return true;
  } else {
    changeHeaderMessage("CHOOOOOSE SOMEWHERE ELSE OIE");
    return false;
  }
};

// Insert the current player's marker
const insertMarker = (e, currentPlayer) => {
  e.target.innerHTML = currentPlayer;
  // Keep track of the current configuration
  gameState[currentPlayer].push(e.target.id);
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
      insertMarker(e, currentPlayer);
      changeHeaderMessage(`It's ${currentPlayer}'s turn!`);
      turns++;
      if (checkWin()) {
        gameOngoing = false;
        changeHeaderMessage("i am a winnah");
      } else if (turns === 9) {
        gameOngoing = false;
        changeHeaderMessage("no");
      }
    }
  }
};

// Continue game as long as there is no winner
const checkWin = () => {
  // Check if there is a winner
  // Compare current board position with the list of winning combinations
  for (let i = 0; i < winningCombi.length; i++) {
    if (
      JSON.stringify(gameState[currentPlayer].sort()) ===
      JSON.stringify(winningCombi[i])
    ) {
      return true;
    }
  }
  return false;
};

const changeToRestartButton = () => {
  // Change text to Restart Game when game has started
  if (gameOngoing) {
    document.getElementById("start-game").innerHTML =
      '<button id="restart-button" onclick="restartGame()">Restart Game </button>';
  }
};

const restartGame = () => {
  // Reset game by setting turns, currentPlayer and gameState back to their initial state
  setUp();
  changeHeaderMessage("");

  // Individual grids should be blank too
};

const changeHeaderMessage = msg => {
  document.getElementById("game-message-header").innerHTML = msg;
};

const changeSidebarMessage = (elem, msg) => {
  document.querySelector(elem).innerHTML = msg;
};

// Start new game
function startGame() {
  // Initialise turns, currentPlayer, and gameState
  setUp();
  gameOngoing = true;
  changeToRestartButton();
  changeHeaderMessage("Game has started!");
}
