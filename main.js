// Initiaise default/start variables (or, states - see FSA diagram)
const DEFAULT_MODE = 'default'
const DEFAULT_DISPLAY = '0';
const DEFAULT_ARG = null

// Initiaising global variables that define a global state at any one time
/* RECAP Odin Project 'Etch-a-sketch': it toggled between 3 states: 'classic', 'rainbow', 'eraser' which corresponded to 3 buttons. */
let currentMode = DEFAULT_MODE;
let displayValue = DEFAULT_DISPLAY;
let firstArg = DEFAULT_ARG; //null is used to intentionally give an empty value to something
let secondArg = DEFAULT_ARG;
let operator = DEFAULT_ARG;
 
// "Global State handler" function



function startUpCalculator() {
    stepCalculator('default', DEFAULT_DISPLAY, DEFAULT_ARG, DEFAULT_ARG);
    readout.textContent = DEFAULT_DISPLAY;
    operator = DEFAULT_ARG;
}

/* "Mathematical arithmetic" helper functions */
// Add 
function add(first_arg, second_arg) {
    return first_arg += second_arg;
}
// Subtract
function subtract(first_arg, second_arg) {
    return first_arg -= second_arg;
}
// Multiply
function multiply(first_arg, second_arg) {
    return first_arg *= second_arg;
}
// Divide
function divide(first_arg, second_arg) {
    return first_arg /= second_arg;
}

// makeNegative
function toggleSign(num) {
    return num * -1;
}


function operate(operator, first_arg, second_arg) {
    switch (operator) {
        case '/':
            if (input === 0) return NaN;
            else divide(first_arg, second_arg);
            break;
        case '*':
            multiply(first_arg, second_arg);
            break;
        case '-':
            subtract(first_arg, second_arg);
            break;
        case '+':
            add(first_arg, second_arg);
            break;
    }
}

/* List of interactive variables */ 
const readout = document.getElementById('readout');
const buttons = document.querySelectorAll('button'); 
const integers = document.querySelectorAll('.integer');
const toggleSignBtn = document.getElementById('toggleSign');
const clearAllBtn = document.getElementById('clearAll');
const clearEntryBtn = document.getElementById('clearEntry');

/* Events to capture */
/* Readout behaviour that are independent of the mode */
// Constraints of integer display on Readout regardless of the mode...
integers.forEach((integer) => {
    integer.addEventListener('click', function(e) {
        action = e.target;
        if (displayValue.length === 16) {
            return null;
        }
        
        // Readout to show '.0' if decimal mode is selected without any integers 
        else if (displayValue === '0' && action.value === '.') {
            displayValue = '0.'
            rewriteReadout(displayValue);
        }

        // Replace default value, 0
        else if ((displayValue === '0' && action.value === '0') || (displayValue === '0' && action.value !== '0')) {
            displayValue = action.value;
            rewriteReadout(displayValue);
        }

         // Limit Readout to display one decimal symbol
         else if ((displayValue.indexOf('.') !== -1) && action.value === '.') {
            return null;
        }
    })
});


toggleSignBtn.onclick = e => {
    displayValue = toggleSign(e.target.value);
    rewriteReadout(displayValue);
}
clearAllBtn.onclick = () => startUpCalculator();
clearEntryBtn.onclick = () => clearEntry();
  

/* SCREEN READOUT INTERACTIVITY */
function rewriteReadout(displayValue) {
    readout.textContent = displayValue;
}

function clearEntry() {
    newDisplayValue = displayValue.substring(0, displayValue.length - 1);
    if (newDisplayValue.length === 0) {
        displayValue = DEFAULT_DISPLAY;
    } 
    else {
        displayValue = newDisplayValue;
    }
    rewriteReadout(displayValue);
}

// Button config dependent on each mode
buttons.forEach((button) => {
    button.addEventListener('click', function(e) {
        action = e.target;
        // Update State
        [currentMode, displayValue, firstArg, secondArg] = step(currentMode, displayValue, firstArg, secondArg, action);
    })
});

/* GLOBAL STATE HANDLER */
function step(currentMode, displayValue, firstArg, secondArg, action) {
    switch (currentMode) {
        case 'default':
            if  (action.id === 'zero' || action.id === 'equal') {
                return ['default', displayValue, null, null];
            }
            else if (action.id === 'decimal') {              
                displayValue = '0.'
                rewriteReadout(displayValue);
                return ['firstArgDecimalEdit', displayValue, null, null];
            }
            else if (action.className === 'integer') {
                displayValue += action.value;
                rewriteReadout(displayValue);
                return ['firstArgIntegerEdit', displayValue, null, null];
            } 
            else if (action.className === 'operator') {
                operator = action.value;
                return ['firstArgLocked', DEFAULT_DISPLAY, Number(displayValue), null];
            }
            break;

        case 'firstArgDecimalEdit':
            if (action.id === 'decimal') {
                return ['firstArgDecimalEdit', displayValue, null, null]; //can't return NULL because an array can't be assigned to NULL (NULL is not iterable), return the same state instead */
            }
            else if (action.className === 'integer') {
                displayValue += action.value; //concatenate string
                rewriteReadout(displayValue);
            }
            else if (action.className === 'operator') {
                operator = action.value;
                return ['firstArgLocked', displayValue, Number(displayValue), null];
            }

            else if (action.id === 'equal') {
                return ['result', displayValue, Number(displayValue), null];
            }
            break;

        case 'firstArgIntegerEdit':
            if (action.className === 'integer') {
                displayValue += action.value;
                rewriteReadout(displayValue);
            }
            else if (action.id === 'decimal') {
                displayValue += action.value;
                rewriteReadout(displayValue);
                return ['firstArgDecimalEdit', displayValue, null, null];
            }
            else if (action.className === 'operator') {
                operator = action.value;
                return ['firstArgLocked', displayValue, Number(displayValue), null];
                
            }
            else if (action.id === 'equal') {
                return ['result', displayValue, Number(displayValue), null];
            }
            break;
            
        case 'firstArgLocked':
            if (action.className === 'operator') {
                operator = action.value;
            }
            else if (action.id === 'decimal') {
                displayValue = '.0'
                rewriteReadout(displayValue);
                return ['secondArgDecimalEdit', displayValue, firstArg, Number(displayValue)];
            }
            else if (action.id === 'integer') {
                displayValue = action.value;
                rewriteReadout(displayValue);
                return ['secondArgIntegerEdit', displayValue, firstArg, Number(displayValue)];

            }
            else if (action.id === 'equal') {
                return ['result', displayValue, firstArg, null];
            }
            break;

        case 'secondArgDecimalEdit':
            if (action.className === 'integer') {
                displayValue += action.value;
                rewriteReadout(displayValue);
            }
            else if (action.className === 'operator') {
                secondArg = Number(displayValue);
                computedValue = operate(action.value, firstArg, secondArg).toString;
                displayValue = computedValue;
                rewriteReadout(displayValue);
                return ['firstArgLocked', displayValue, Number(displayValue), null];
            }
            else if (action.id === 'equal') {
                secondArg = Number(displayValue);
                computedValue = operate(action.value, firstArg, secondArg).toString;
                displayValue = computedValue;
                rewriteReadout(displayValue);
                return ['result', displayValue, firstArg, secondArg];
            }
            break;

        case 'secondArgIntegerEdit':
            if (action.id === 'integer') {
                displayValue += action.value;
                rewriteReadout(displayValue);
            }
            else if (action.id === 'decimal'){
                displayValue += action.value;
                secondArg = displayValue;
                rewriteReadout(displayValue);
                return ['secondArgDecimalEdit', displayValue, firstArg, secondArg];
            }
            else if (action.className === 'operator') {
                secondArg = Number(displayValue);
                computedValue = operate(operator, firstArg, secondArg).toString;
                displayValue = computedValue;
                rewriteReadout(displayValue);
                return ['firstArgLocked', displayValue, Number(displayValue), null];
            }
            else if (action.id === 'equal') {
                secondArg = Number(displayValue);
                computedValue = operate(operator, firstArg, secondArg).toString;
                displayValue = computedValue;
                rewriteReadout(displayValue);
                return ['result', displayValue, firstArg, secondArg];
            }

            break;


        case 'result':
            if (action.id === 'integer') {
                displayValue = action.value;
                rewriteReadout(displayValue)
                return ['firstArgIntegerEdit', displayValue, null, null];
            }
            if (action.id === 'decimal') {
                displayValue = '0.';
                rewriteReadout(displayValue);
                return ['firstArgDecimalEdit', displayValue, null, null];
            }
            if (action.id === 'equal') {
                return ['result', displayValue, firstArg, secondArg];
            }

            if (action.id == 'operator') {
                operator = action.id;
                return ['firstArgLocked', displayValue, Number(displayValue), null]
            }
            break;
    }

}

/* MAIN */
startUpCalculator();

/* RECAP */
// A string, representing the underlying value that is associated with the button. Type conversion to Number required!


/* COMMENTS */
//Is there a way to dynamically add the operators based on user's operator input?