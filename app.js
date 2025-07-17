// Selecting all the required DOM elements
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// 'turnO' determines which player's turn it is: true → "O", false → "X"
let turnO = true;

// 'count' tracks the number of moves made to detect a draw
let count = 0;

// All possible winning combinations (indexes of boxes)
const winPatterns = [
  [0, 1, 2], // Top row
  [0, 3, 6], // Left column
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [2, 4, 6], // Diagonal from top-right to bottom-left
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
];

// Reset the game to its initial state
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes(); // Clear the board and enable buttons
  msgContainer.classList.add("hide"); // Hide the message box
};

// Add click event to all boxes
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      // Player O's turn
      box.innerText = "O";
      turnO = false;
    } else {
      // Player X's turn
      box.innerText = "X";
      turnO = true;
    }

    // Disable the clicked box
    box.disabled = true;

    // Increment move count
    count++;

    // Check if there's a winner
    let isWinner = checkWinner();

    // If 9 moves are done and no winner → it's a draw
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// Show draw message
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes(); // Disable all boxes after draw
};

// Disable all boxes (used when game ends)
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Enable all boxes and clear their text (used on reset)
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// Display winner message
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes(); // Stop the game after a win
};

// Check if any win pattern is matched
const checkWinner = () => {
  for (let pattern of winPatterns) {
    // Get the values of the three positions in the pattern
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    // Check if all three positions are non-empty and equal
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

// Add event listeners to "New Game" and "Reset" buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
