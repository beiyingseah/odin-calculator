// Initiaise default/start variables (or, states - see FSA diagram)
const DEFAULT_NUM = 0;
const DEFAULT_STATE = 'default'

// Initiaising global variables that define a global state at any one time
/* RECAP Odin Project 'Etch-a-sketch': it toggled between 3 states: 'classic', 'rainbow', 'eraser' which corresponded to 3 buttons. */
let currentMode = DEFAULT_STATE;
let displayValue = DEFAULT_NUM;
let firstArg = null; //null is used to intentionally give an empty value to something
let secondArg = null;
 
// "Global State handler" function
function setCurrentMode(newMode) {
    CurrentMode = newMode;
    step(CurrentMode);
}

// (Global) Calculator reset 
function resetGlobalValues() {
    firstArg = DEFAULT_NUM;
    secondArg = DEFAULT_NUM;
}

function restartCalculator() {
    readout.textContent = DEFAULT_NUM.toString();
    setCurrentMode(DEFAULT_STATE);
    resetGlobalValues(DEFAULT_NUM);
}

/* "Mathematical arithmetic" helper functions */
// Add 
function add(firstArg, secondArg) {
    firstArg += secondArg;
}
// Subtract
function subtract(firstArg, secondArg) {
    firstArg -= secondArg;
}
// Multiply
function multiply(firstArg, secondArg) {
    firstArg *= secondArg;
}
// Divide
function divide(firstArg, secondArg) {
    firstArg /= secondArg;
}

// makeNegative
function toggleSign(num) {
    return num * -1;
}


function operate(operator, firstArg, secondArg) {
    switch (operator) {
        case '/':
            if (input === 0) return NaN;
            else divide(firstArg, secondArg);
            break;
        case '*':
            multiply(firstArg, secondArg);
            break;
        case '-':
            subtract(firstArg, secondArg);
            break;
        case '+':
            add(firstArg, secondArg);
            break;
    }
}

/* List of interactive variables */ 
const readout = document.getElementById('readout');
const buttons = document.querySelectorAll('button'); 
const integers = document.querySelectorAll('.integer');

console.log(e.target);

/* Events to capture */
// Constraints of integer display on Readout regardless of the mode...
integers.forEach((integer) => {
    integer.addEventListener('click', function() {
        if ((e.target.className == 'integer' || e.target.className == 'decimal') && (readout.textContent.length === 16)) {
            return null;
        }

        // Limit Readout to display  one decimal symbol
        if ((readout.textContent.indexOf('.') !== -1) && integer.value === '.') {
            return null;
        }

    })
});


// To update toggle between positive and negative for the correct arg in every mode

// Button config dependent on each mode
buttons.forEach((button) => {
    button.addEventListener('click', function() {
        
        // Readout to show '.0' if decimal mode is selected without any integers 
        if (readout.textContent === '0' && integer.value === '.') {
            rewriteReadout('0.');
        }
        else if 
        // Replace default value, 0

        /* WITH THE STATE-ACTION FUNCTION, YOU DON'T NEED TO DESCRIBE STATE BASED ON THE READOUT CONDITIONS */

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


// Operator buttons
operators.forEach((operator) => {
    // and for each one we add a 'click' listener, with a callback function that gets called when the event happens
    operator.addEventListener('click', function() {
        if (readout.textContent === '0') {
            return null;
        } 
        else {
            operate(operator.value, firstArg, secondArg);
        }
    })
});

// Clear buttons
clearAllBtn.onclick = () => clearReadout();
clearEntryBtn.onclick = () => backspaceReadout();

// Equal button
equalBtn.onclick = () => {
}

/* SCREEN READOUT INTERACTIVITY */
function rewriteReadout(integer) {
    displayValue = integer.value;
    readout.textContent = displayValue;
}

function addToReadout(integer) {
    displayValue += integer;
    readout.textContent =  displayValue;
}

function backspaceReadout() {
    readout.textContent = readout.textContent.substring(0,readout.textContent.length - 1);
}


/* BUTTONS INTERACTIVITY */
function step(CurrentMode, action) {
    switch (CurrentMode) {
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