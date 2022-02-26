// Initiaise default/start variables (or, states - see FSA diagram)
const DEFAULT_NUM = 0;
const DEFAULT_STATE = 'default'

// Initiaising global variables (or, states) 
/* RECAP Odin Project 'Etch-a-sketch': it toggled between 3 states/modes: 'classic', 'rainbow', 'eraser' which corresponded to 3 buttons. */
let currentState = DEFAULT_STATE;
let storedNum = DEFAULT_NUM;
let inputNum = DEFAULT_NUM;

// "Global State handler" function
function setCurrentState(newState) {
    activateButton(newState);
    currentState = newState;
}

/* "Mathematical arithmetic" helper functions */
// Add 
function add(storedNum, inputNum) {
    storedNum += inputNum;
}
// Subtract
function subtract(storedNum, inputNum) {
    storedNum -= inputNum
}
// Multiply
function multiply(storedNum, inputNum) {
    storedNum *= inputNum
}
// Divide
function divide(storedNum, inputNum) {
    storedNum /= inputNum;
}

// makeNegative
function toggleSign(inputNum) {
    inputNum * -1;
}


function operate(operator, storedNum, inputNum) {
    switch (operator) {
        case '/':
            if (input === 0) return NaN;
            else divide(storedNum, inputNum);
            break;
        case '*':
            multiply(storedNum, inputNum);
            break;
        case '-':
            subtract(storedNum, inputNum);
            break;
        case '+':
            add(storedNum, inputNum);
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
        else if (readout.textContent === '' && integer.value === '.') {
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
            // update state 
        }
    })
});

// Equal button
equalBtn.onclick = () => {
    if (storedValue === '') {

    }
}

/* SCREEN READOUT INTERACTIVITY */
function rewriteReadout(integer) {
    readout.textContent = integer;
}

function addToReadout(integer) {
    readout.textContent += integer;
}

// Starting state: 0 
function restartCalculator() {
    readout.textContent = DEFAULT_NUM.toString();
}

function backspaceReadout() {
    readout.textContent = readout.textContent.substring(0,readout.textContent.length - 1);
}

/* BUTTONS INTERACTIVITY */
function activateButtonsConfig(newState) {

}

/* MAIN */
restartCalculator();


/* RECAP */
// A string, representing the underlying value that is associated with the button. Type conversion to Number required!


/* COMMENTS */
//Is there a way to dynamically add the operators based on user's operator input?