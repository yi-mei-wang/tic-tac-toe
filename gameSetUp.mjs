import { initialState, players } from "./constants.mjs";
import { changeDisplayMessage } from "./gameHelpers.mjs";

export const setUp = () => {
  let turns = 0;

  let currentPlayer = players[Math.floor(Math.random() * 2)];

  let boardState = Array.from(initialState);
  console.log(boardState);

  return [turns, currentPlayer, boardState];
};

export const restartGame = () => {
  // Reset game by setting turns, currentPlayer and boardState back to their initial state
  setUp();

  // Clear announcement board
  changeDisplayMessage("#game-announcement-message", "");

  // Clear the content of individual cells
  let grids = document.getElementsByClassName("grid-item");
  for (let i = 0; i < grids.length; i++) {
    grids[i].innerHTML = "";
  }
};
