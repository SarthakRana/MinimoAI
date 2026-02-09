// Tic Tac Toe Game Logic
// State constants
const PLAYER_X = "X";
const PLAYER_O = "O";

// Mutable game state
let boardState = Array(9).fill(null);
let currentPlayer = PLAYER_X;
let gameOver = false;

// Winning combinations (indices of boardState)
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// DOM references – will be populated after DOMContentLoaded
let statusEl = null;
let cells = null;
let resetBtn = null;

/**
 * Initialize or reset the game to its starting state.
 */
function initGame() {
  boardState = Array(9).fill(null);
  currentPlayer = PLAYER_X;
  gameOver = false;

  // Clear UI for each cell
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
  });

  updateStatus(`Player ${currentPlayer}'s turn`);
}

/**
 * Handle a click on a board cell.
 * @param {MouseEvent} e
 */
function handleCellClick(e) {
  if (gameOver) return;

  const cell = e.target;
  const index = parseInt(cell.dataset.index, 10);

  // Ignore click if cell already occupied
  if (boardState[index] !== null) return;

  // Update state
  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer === PLAYER_X ? 'x' : 'o');

  // Check for win or draw
  const winner = checkWin();
  if (winner) {
    const message = `Player ${winner} wins!`;
    updateStatus(message);
    endGame(message);
    return;
  }

  if (checkDraw()) {
    const message = "It's a draw!";
    updateStatus(message);
    endGame(message);
    return;
  }

  // Switch player and update status
  currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
  updateStatus(`Player ${currentPlayer}'s turn`);
}

/**
 * Determine if there is a winning player.
 * @returns {string|null} Returns "X" or "O" if a player has won, otherwise null.
 */
function checkWin() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return boardState[a];
    }
  }
  return null;
}

/**
 * Check whether the game is a draw (board full with no winner).
 * @returns {boolean}
 */
function checkDraw() {
  return boardState.every(cell => cell !== null) && !checkWin();
}

/**
 * Update the status message displayed to the player.
 * @param {string} message
 */
function updateStatus(message) {
  if (statusEl) {
    statusEl.textContent = message;
  }
}

/**
 * End the game – prevent further moves.
 * @param {string} message Optional message (currently unused beyond setting status).
 */
function endGame(message) {
  gameOver = true;
  // Optionally we could remove listeners, but a flag is sufficient.
}

/**
 * Reset button handler – simply re‑initialises the game.
 */
function resetGame() {
  initGame();
}

// Set up event listeners once the DOM is ready.
document.addEventListener('DOMContentLoaded', () => {
  statusEl = document.getElementById('status');
  cells = document.querySelectorAll('.cell');
  resetBtn = document.getElementById('resetBtn');

  // Attach click listeners to each cell
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));

  // Reset button listener
  if (resetBtn) {
    resetBtn.addEventListener('click', resetGame);
  }

  // Initialise the game UI
  initGame();
});
