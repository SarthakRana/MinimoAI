# Tic Tac Toe

A simple, responsive web implementation of the classic Tic Tac Toe game using **HTML**, **CSS**, and **JavaScript**. Play locally in any modern browser.

---

## Overview

This project provides a lightweight, zero‑dependency web app that lets two players take turns marking Xs and Os on a 3×3 grid. The UI displays the current player's turn, announces a win or a draw, and includes a **Reset Game** button to start over.

---

## Features

- **Turn‑based play** – Players alternate between X and O.
- **Win detection** – All eight winning combinations are checked after each move.
- **Draw detection** – The game reports a draw when the board is full with no winner.
- **Status indicator** – A text element (`#status`) shows whose turn it is or the game result.
- **Reset button** – Clicking the `#resetBtn` button clears the board and starts a new game.
- **Responsive design** – The board scales to fit the viewport on desktop and mobile devices.
- **Pure web technologies** – No external libraries or build steps required.

---

## Tech Stack

- **HTML** – `index.html`
- **CSS** – `style.css`
- **JavaScript** – `app.js`

---

## Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari, etc.)

---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your‑username/tic-tac-toe.git
   cd tic-tac-toe
   ```
2. **Open the game**
   - Simply double‑click `index.html` or open it via your browser's *File → Open* menu.
   - No server or additional setup is required.

---

## How to Play

1. The game starts with **Player X**. The status bar (`#status`) reads "Player X's turn".
2. Click an empty cell (`.cell`) to place your mark. The cell will display **X** (blue) or **O** (orange) and the turn switches.
3. After each move the app checks for a winning combination:
   - If a player wins, the status updates to "Player X wins!" (or O) and further moves are disabled.
   - If the board fills without a winner, the status shows "It's a draw!".
4. To start a new match, press the **Reset Game** button (`#resetBtn`). The board clears, the status resets to "Player X's turn", and play can begin again.

---

## Development

If you wish to modify or extend the project:

- Edit `index.html` for markup changes.
- Adjust styles in `style.css` – the layout uses CSS Grid and is fully responsive.
- Update game logic in `app.js`. The code is modular with clear functions (`initGame`, `handleCellClick`, `checkWin`, `checkDraw`, etc.).

After changes, simply reload `index.html` in the browser to see the effect.

---

## Screenshots

*Add screenshots here if desired.*

---

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request with improvements, bug fixes, or new features.

---

## License

This project is licensed under the MIT License – see the `LICENSE` file for details.
