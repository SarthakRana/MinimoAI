# SimpleTodoApp

A lightweight, client‑side todo list application that runs entirely in the browser. It uses **local storage** to persist tasks across page reloads, requiring no backend or database.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Development Notes](#development-notes)
- [License](#license)

---

## Overview

**SimpleTodoApp** is a vanilla JavaScript todo list that operates completely on the client side. Users can add, edit, complete, and delete tasks, each optionally with a due date. All tasks are saved to the browser's **localStorage**, ensuring that the list remains intact even after the page is refreshed or the browser is closed and reopened.

---

## Features

- **Add Tasks** – Create new todo items with an optional due date.
- **Mark Complete** – Toggle a task's completion status.
- **Delete Tasks** – Remove tasks permanently from the list.
- **Persisted Storage** – Tasks are saved in `localStorage` and survive page reloads.
- **Responsive UI** – Works on desktop and mobile browsers.
- **Keyboard Shortcuts** – Press **Enter** to add a task quickly.

---

## Tech Stack

- **HTML5** – Semantic markup for the structure.
- **CSS3** – Styling and responsive layout.
- **Vanilla JavaScript (ES6+)** – Core logic, DOM manipulation, and local storage handling.

---

## Setup

### Prerequisites

- Any modern web browser (Chrome, Firefox, Edge, Safari, etc.).

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/SimpleTodoApp.git
   ```
2. Navigate into the project folder:
   ```bash
   cd SimpleTodoApp
   ```
3. Open `index.html` in your browser (double‑click the file or use `file://` URL).

No additional build tools or package managers are required.

---

## Usage

1. **Add a Task** – Type a task description into the input field and press **Enter** or click the **Add** button. Optionally select a due date.
2. **Mark Complete** – Click the checkbox next to a task to toggle its completed state.
3. **Delete a Task** – Click the trash‑can icon to remove a task permanently.
4. **Persistence** – All changes are automatically saved to local storage, so tasks remain after refreshing or reopening the browser.

### Screenshots

*Placeholder for screenshots:*  
![App Screenshot](screenshot.png)

---

## File Structure

```
/README.md      – Documentation (this file)
/index.html     – Main HTML page
/styles.css    – Styling and responsive layout
/app.js        – JavaScript logic and local storage handling
```

---

## Development Notes

- **Task Object Shape**
  ```js
  {
    id: string,          // Unique identifier (e.g., UUID or timestamp)
    title: string,       // Task description entered by the user
    dueDate: string|null,// ISO date string or null if not set
    completed: boolean   // Completion flag
  }
  ```
- The JavaScript module attaches a `todoApp` namespace to the `window` object (e.g., `window.todoApp = { ... }`). This makes the internal functions accessible from the console for debugging and quick experimentation.
- **Extending the App**
  - *Editing*: Add an inline edit mode that updates the task title or due date.
  - *Filtering*: Implement view filters (All, Active, Completed).
  - *Sorting*: Allow sorting by due date or creation time.
  - *Theming*: Introduce CSS variables for light/dark mode.

---

## License

MIT License © 2024 Your Name

---
