// Initiaise default/start variables (or, states - see FSA diagram)
const DEFAULT_NUM = 0;
const DEFAULT_STATE = 'default'

// Initiaising global variables (or, states) 
/* RECAP Odin Project 'Etch-a-sketch': it toggled between 3 states/modes: 'classic', 'rainbow', 'eraser' which corresponded to 3 buttons. */
let currentState = DEFAULT_STATE;
let storedResult = DEFAULT_NUM;
let inputNum = DEFAULT_NUM;
 
// "Global State handler" function
function setCurrentState(newState) {
    currentState = newState;
    step(currentState);
}

// (Global) Calculator reset 
function resetGlobalValues() {
    storedResult = DEFAULT_NUM;
    inputNum = DEFAULT_NUM;
}

function restartCalculator() {
    readout.textContent = DEFAULT_NUM.toString();
    setCurrentState(DEFAULT_STATE);
    resetGlobalValues(DEFAULT_NUM);
}

/* "Mathematical arithmetic" helper functions */
// Add 
function add(storedResult, inputNum) {
    storedResult += inputNum;
}
// Subtract
function subtract(storedResult, inputNum) {
    storedResult -= inputNum
}
// Multiply
function multiply(storedResult, inputNum) {
    storedResult *= inputNum
}
// Divide
function divide(storedResult, inputNum) {
    storedResult /= inputNum;
}

// makeNegative
function toggleSign(inputNum) {
    inputNum * -1;
}


function operate(operator, storedResult, inputNum) {
    switch (operator) {
        case '/':
            if (input === 0) return NaN;
            else divide(storedResult, inputNum);
            break;
        case '*':
            multiply(storedResult, inputNum);
            break;
        case '-':
            subtract(storedResult, inputNum);
            break;
        case '+':
            add(storedResult, inputNum);
            break;
    }
}

/* List of interactive variables */ 
const readout = document.getElementById('readout');
const integers = document.querySelectorAll('.integer'); 
const clearAllBtn = document.getElementById('clearAllBtn');
const clearEntryBtn = document.getElementById('clearEntryBtn');
const operators = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.operator-equal')
const toggleSignBtn = document.getElementById('toggleSignBtn');

/* Events to capture */
// Integer buttons logic
integers.forEach((integer) => {
    integer.addEventListener('click', function() {
        if (readout.textContent.length === 16) {
            return null;
        }
        // Limit Readout to display  one decimal symbol
        else if ((readout.textContent.indexOf('.') !== -1) && integer.value === '.') {
            return null;
        }
        // Readout to show '.0' if decimal mode is selected without any integers 
        else if (readout.textContent === '0' && integer.value === '.') {
            rewriteReadout('0.');
        }
        // Replace default value, 0
        else if ((readout.textContent === '0' && integer.value === '0') ||
        (readout.textContent === '0' && integer.value !== '0')) {
            rewriteReadout(integer.value);
        }
        // Add number to Readout if it starts with non-zero integer
        else { 
            addToReadout(integer.value);
        }
    })
});

// Toggle sign between positive and negative
toggleSignBtn.onclick = (inputNum) => toggleSign(inputNum);

// Clear buttons
clearAllBtn.onclick = () => clearReadout();
clearEntryBtn.onclick = () => backspaceReadout();

// Operator buttons
operators.forEach((operator) => {
    // and for each one we add a 'click' listener, with a callback function that gets called when the event happens
    operator.addEventListener('click', function() {
        if (readout.textContent === '0') {
            return null;
        } 
        else {
            operate(operator.value, storedResult, inputNum);
        }
    })
});

// Equal button
equalBtn.onclick = () => {
}

/* SCREEN READOUT INTERACTIVITY */
function rewriteReadout(integer) {
    readout.textContent = integer;
}

function addToReadout(integer) {
    readout.textContent += integer;
}

function backspaceReadout() {
    readout.textContent = readout.textContent.substring(0,readout.textContent.length - 1);
}


/* BUTTONS INTERACTIVITY */
function step(currentState, inputNum, action) {
    switch (currentState) {
        case 'default':
            restartCalculator();
        case 'firstOperandDecimalEdit':
            firstOperand
        case 'firstOperandIntegerEdit':
        case 'secondOperandDecimalEdit':
        case 'secondOperandDecimalEdit':
        case 'result':
    }
}

/* MAIN */
restartCalculator();


/* RECAP */
// A string, representing the underlying value that is associated with the button. Type conversion to Number required!


/* COMMENTS */
//Is there a way to dynamically add the operators based on user's operator input?