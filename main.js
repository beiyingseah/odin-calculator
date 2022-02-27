// Initiaise default/start variables (or, states - see FSA diagram)
const DEFAULT_MODE = 'default'
const DEFAULT_DISPLAY = '0';
const DEFAULT_ARG = 'null'

// Initiaising global variables that define a global state at any one time
/* RECAP Odin Project 'Etch-a-sketch': it toggled between 3 states: 'classic', 'rainbow', 'eraser' which corresponded to 3 buttons. */
let currentMode = DEFAULT_MODE;
let displayValue = DEFAULT_DISPLAY;
let firstArg = DEFAULT_ARG; //null is used to intentionally give an empty value to something
let secondArg = DEFAULT_ARG;
let operator = DEFAULT_ARG;
 
// "Global State handler" function
function startUpCalculator() {
    readout.textContent = DEFAULT_DISPLAY;
    currentMode = DEFAULT_MODE;
    firstArg = DEFAULT_ARG;
    secondArg = DEFAULT_ARG;
    operator = DEFAULT_ARG;
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
    integer.addEventListener('click', function(action) {
        action = e.target;

        if ((action.className == 'integer' || action.id == 'decimal') && (displayValue.length === 16)) {
            return null;
        }

        // Limit Readout to display  one decimal symbol
        else if ((displayValue.indexOf('.') !== -1) && action.value === '.') {
            return null;
        }

    })
});


// To update toggle between positive and negative for the correct arg in every mode

// Button config dependent on each mode
buttons.forEach((button) => {
    button.addEventListener('click', function(currentMode, action) {
        action = e.target;
        switch (currentMode) {
            case 'default':
                if (action.id === 'clearAll' || action.id === 'clearEntry' || action.id === 'zero' || action.id === 'equal') {
                    return null;
                }
                else if (action.id === 'decimal') {
                    currentMode = 'firstArgDecimalEdit';
                    rewriteDisplayValue('0.');
                }
                else if (action.className === 'integer') {
                    currentMode = 'firstArgIntegerEdit';
                    rewriteDisplayValue(action.value);
                } 
                else if (action.className === 'operator') {
                    currentMode = 'firstArgLocked';
                    firstArg = Number(displayValue)
                    operator = action.value;
                }
                break;

            case 'firstArgDecimalEdit':
                if (action.id === 'clearAll') {
                    startUpCalculator();
                }
                else if (action.id === 'decimal') {
                    return null;
                }
                else if (action.className === 'integer') {
                    addToDisplayValue(action.value);
                }
                else if (action.id === 'clearEntry') {
                    clearEntry();
                }
                else if (action.className === 'operator') {
                    currentMode = 'firstArgLocked';
                    firstArg = Number(displayValue);
                    operator = action.value;
                }
                break;

            case 'firstArgIntegerEdit':
                if (action.id === 'clearAll') {
                    startUpCalculator();
                }
                else if (action.id === 'decimal') {
                    currentMode = 'firstArgDecimalEdit';
                    addToDisplayValue(action.value);
                }
                else if (action.className === 'integer') {
                    addToDisplayValue(action.value);
                }
                else if (action.id === 'clearEntry') {
                    clearEntry();
                }
                else if (action.className === 'operator') {
                    currentMode = 'firstArgLocked';
                    firstArg = Number(displayValue);
                    operator = action.value;
                }
                break;
                
            case 'firstArgLocked':
                break;
            case 'secondArgDecimalEdit':
                break;
            case 'secondArgIntegerEdit':
                break;
            case 'result':
                break;
        }

        // Readout to show '.0' if decimal mode is selected without any integers 
        if (readout.textContent === '0' && integer.value === '.') {
            
        }
        else if 
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


/* SCREEN READOUT INTERACTIVITY */
function rewriteDisplayValue(num) {
    displayValue = num;
    readout.textContent = displayValue;
}

function addToDisplayValue(num) {
    displayValue += num; //concatenate string
    readout.textContent =  displayValue;
}

function clearEntry() {
    displayValue = displayValue.substring(0, displayValue.length - 1);
    readout.textContent = displayValue;
}


/* MAIN */
startUpCalculator();


/* RECAP */
// A string, representing the underlying value that is associated with the button. Type conversion to Number required!


/* COMMENTS */
//Is there a way to dynamically add the operators based on user's operator input?