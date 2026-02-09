// app.js - Calculator logic

// Module Scope Variables
const display = document.getElementById('display');
let currentInput = '';
let lastResult = null;

// Helper to show normal display (remove error class)
function updateDisplay(value) {
    display.textContent = value;
    display.classList.remove('error');
}

function displayError(message) {
    display.textContent = message;
    display.classList.add('error');
}

// Append a digit (or decimal point) to the current expression
function appendDigit(digit) {
    // Prevent multiple leading zeros (except when entering a decimal like 0.)
    if (currentInput === '' && digit === '0') {
        // allow a single leading zero, but wait for next input
        currentInput = '0';
        updateDisplay(currentInput);
        return;
    }
    // Avoid multiple decimals in the same number segment
    if (digit === '.') {
        // Find the last number segment (characters after the most recent operator)
        const lastNumber = currentInput.split(/[+\-*/]/).pop();
        if (lastNumber.includes('.')) {
            return; // ignore extra decimal
        }
        // If starting a new number with a dot, prepend a zero
        if (lastNumber === '' || /[+\-*/]$/.test(currentInput)) {
            currentInput += '0';
        }
    }
    // Optional max length guard (e.g., 30 characters)
    if (currentInput.length >= 30) return;
    currentInput += digit;
    updateDisplay(currentInput);
}

// Append an operator (+, -, *, /)
function appendOperator(op) {
    if (currentInput === '' && lastResult !== null) {
        // start new expression with previous result
        currentInput = String(lastResult);
    }
    // If last character is an operator, replace it
    if (/[+\-*/]$/.test(currentInput)) {
        currentInput = currentInput.slice(0, -1) + op;
    } else if (currentInput !== '') {
        currentInput += op;
    }
    updateDisplay(currentInput);
}

function clearAll() {
    currentInput = '';
    lastResult = null;
    updateDisplay('0');
}

function backspace() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput || '0');
    } else {
        updateDisplay('0');
    }
}

function sanitizeExpression(expr) {
    // Allow only digits, decimal point, and basic operators
    // Remove any characters not in the whitelist
    return expr.replace(/[^0-9.+\-*/]/g, '');
}

function computeResult() {
    if (currentInput === '') {
        return;
    }
    const sanitized = sanitizeExpression(currentInput);
    // Basic check for division by zero patterns like /0 or /0.0 etc.
    if (/\/0(?![0-9])/.test(sanitized)) {
        displayError('Error: Division by zero');
        return;
    }
    let result;
    try {
        // Using Function constructor for safe evaluation of simple math
        // eslint-disable-next-line no-new-func
        result = Function('return ' + sanitized)();
    } catch (e) {
        displayError('Error: Invalid expression');
        return;
    }
    if (typeof result !== 'number' || !isFinite(result) || isNaN(result)) {
        displayError('Error: Division by zero');
        return;
    }
    // Round result to avoid floating point noise (optional)
    result = Math.round(result * 1e12) / 1e12;
    lastResult = result;
    currentInput = String(result);
    updateDisplay(currentInput);
}

function handleKeyboard(event) {
    const { key } = event;
    if (key >= '0' && key <= '9') {
        appendDigit(key);
    } else if (key === '.' ) {
        appendDigit('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        computeResult();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearAll();
    }
    // Prevent default for handled keys to avoid unwanted scrolling etc.
    if (['Enter', '=', 'Backspace', 'Escape', '+', '-', '*', '/', '.'].includes(key) || (key >= '0' && key <= '9')) {
        event.preventDefault();
    }
}

// Event Listeners
const buttonsContainer = document.querySelector('.buttons');
if (buttonsContainer) {
    buttonsContainer.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target) return;
        const action = target.dataset.action;
        const value = target.dataset.value;
        switch (action) {
            case 'digit':
                appendDigit(value);
                break;
            case 'operator':
                appendOperator(value);
                break;
            case 'clear':
                clearAll();
                break;
            case 'backspace':
                backspace();
                break;
            case 'equals':
                computeResult();
                break;
            default:
                break;
        }
    });
}

document.addEventListener('keydown', handleKeyboard);

// Expose for testing (optional)
window.calculator = {
    appendDigit,
    appendOperator,
    clearAll,
    backspace,
    computeResult,
    handleKeyboard,
    updateDisplay,
    displayError,
    sanitizeExpression,
    get currentInput() { return currentInput; },
    get lastResult() { return lastResult; }
};
