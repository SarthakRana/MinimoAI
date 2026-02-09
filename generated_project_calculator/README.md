# SimpleCalculator

A lightweight web-based calculator that performs basic arithmetic operations with a clean, responsive UI.

## Overview

- **Features**: Addition, subtraction, multiplication, division, decimal calculations, clear entry, and error handling for invalid inputs (e.g., division by zero).
- **Tech Stack**: Pure HTML, CSS, and vanilla JavaScript – no external libraries or frameworks.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/simplecalculator.git
   cd simplecalculator
   ```
2. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari).

## Usage

- **UI Elements**
  - **Display** – Shows the current expression and result.
  - **Number Buttons (0‑9)** – Input digits.
  - **Operator Buttons (+, –, ×, ÷)** – Choose the operation.
  - **Decimal (.)** – Add fractional parts.
  - **Equals (=)** – Evaluate the expression.
  - **Clear (C)** – Reset the calculator.
- **Keyboard Shortcuts**
  - Digits `0`‑`9` and `.` map to the corresponding buttons.
  - `Enter` or `=` evaluates the expression.
  - `Backspace` clears the current entry.
  - `Esc` clears the entire calculator.
- **Error Handling**
  - Division by zero displays `Error` and disables further input until cleared.
  - Invalid sequences (e.g., two operators in a row) are ignored.

## Development

The project consists of three core files:

- [`index.html`](index.html) – Markup and layout.
- [`styles.css`](styles.css) – Styling and responsive design.
- [`app.js`](app.js) – Calculator logic and event handling.

Feel free to modify any of these files to extend functionality or redesign the UI.

## License

This project is released under the MIT License. See the `LICENSE` file for details.
