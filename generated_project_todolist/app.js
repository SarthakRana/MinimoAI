/**
 * Simple Todo App core logic
 * Implements task storage, rendering, and UI interactions.
 */

/** @typedef {Object} Task
 * @property {string} id - Unique identifier (e.g., Date.now().toString())
 * @property {string} title - Task title
 * @property {string|null} dueDate - ISO date string or null
 * @property {boolean} completed - Completion state
 */

// ---------------------------------------------------------------------------
// 1. Data Model & Storage Utilities
// ---------------------------------------------------------------------------
/** Storage key used in localStorage */
const STORAGE_KEY = 'simpleTodoTasks';

/**
 * Load tasks from localStorage.
 * @returns {Task[]}
 */
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Ensure we return an array of objects that at least have the required fields.
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (e) {
    console.error('Failed to load tasks from storage:', e);
    return [];
  }
}

/**
 * Save tasks to localStorage.
 * @param {Task[]} tasks
 */
function saveTasks(tasks) {
  try {
    const serialized = JSON.stringify(tasks);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (e) {
    console.error('Failed to save tasks to storage:', e);
  }
}

// Export for debugging (attached to window)
if (typeof window !== 'undefined') {
  window.loadTasks = loadTasks;
  window.saveTasks = saveTasks;
}

// ---------------------------------------------------------------------------
// 2. Rendering Engine
// ---------------------------------------------------------------------------
/**
 * Render a list of tasks into the DOM.
 * @param {Task[]} tasks - Array of task objects (pure, not mutated).
 */
function renderTasks(tasks) {
  const listEl = document.getElementById('task-list');
  if (!listEl) return; // Safety guard if element is missing.
  // Clear previous content.
  listEl.innerHTML = '';

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    if (task.completed) li.classList.add('completed');

    // Checkbox for completion toggle.
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'toggle-complete';
    checkbox.dataset.id = task.id;
    checkbox.checked = Boolean(task.completed);
    li.appendChild(checkbox);

    // Title span.
    const titleSpan = document.createElement('span');
    titleSpan.className = 'task-title';
    titleSpan.textContent = task.title;
    li.appendChild(titleSpan);

    // Due date, if present.
    if (task.dueDate) {
      const dueSpan = document.createElement('span');
      dueSpan.className = 'task-due';
      dueSpan.textContent = `Due: ${task.dueDate}`;
      li.appendChild(dueSpan);
    }

    // Delete button.
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.dataset.id = task.id;
    delBtn.textContent = '✕';
    li.appendChild(delBtn);

    listEl.appendChild(li);
  });
}

// ---------------------------------------------------------------------------
// 3. Event Handlers & State Management
// ---------------------------------------------------------------------------
/** In‑memory task list */
let tasks = [];

/**
 * Add a new task to the list.
 * @param {string} title
 * @param {string|null} dueDate - ISO string (YYYY-MM-DD) or null.
 */
function addTask(title, dueDate) {
  /** @type {Task} */
  const newTask = {
    id: Date.now().toString(),
    title: title.trim(),
    dueDate: dueDate ? dueDate : null,
    completed: false,
  };
  tasks.push(newTask);
  saveTasks(tasks);
  renderTasks(tasks);
}

/**
 * Toggle the completion status of a task.
 * @param {string} id
 */
function toggleTaskCompletion(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  task.completed = !task.completed;
  saveTasks(tasks);
  renderTasks(tasks);
}

/**
 * Delete a task from the list.
 * @param {string} id
 */
function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks(tasks);
  renderTasks(tasks);
}

/** Initialize the app: load tasks, render, and bind events. */
function init() {
  tasks = loadTasks();
  renderTasks(tasks);

  // Form submission handler.
  const form = document.getElementById('task-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const titleInput = /** @type {HTMLInputElement} */ (document.getElementById('task-title'));
      const dueInput = /** @type {HTMLInputElement} */ (document.getElementById('task-due-date'));
      const title = titleInput?.value?.trim();
      if (!title) return; // Guard against empty titles.
      const dueDate = dueInput?.value ? dueInput.value : null;
      addTask(title, dueDate);
      // Clear inputs after adding.
      titleInput.value = '';
      dueInput.value = '';
    });
  }

  // Delegated click handling for toggle and delete actions.
  const listEl = document.getElementById('task-list');
  if (listEl) {
    listEl.addEventListener('click', (e) => {
      const target = /** @type {HTMLElement} */ (e.target);
      const id = target.dataset.id;
      if (!id) return;

      if (target.matches('.toggle-complete')) {
        toggleTaskCompletion(id);
      } else if (target.matches('.delete-btn')) {
        deleteTask(id);
      }
    });
  }
}

// Run init when DOM is ready.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for testing / debugging.
if (typeof window !== 'undefined') {
  window.todoApp = {
    loadTasks,
    saveTasks,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    renderTasks,
    get tasks() {
      return tasks;
    },
  };
}
