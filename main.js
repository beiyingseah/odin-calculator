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
    step('default', DEFAULT_DISPLAY, DEFAULT_ARG, DEFAULT_ARG); //the remaining args will be assigned as 'undefined'
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
        //action = e.target; //Note: A read-only property means it cannot be overwritten or assigned to. Any such assignment will silently do nothing in non-strict mode. 
        actionValue = e.target.value;
        if (displayValue.length > 15) {
            displayValue = displayValue.substring(0, 15);
        }
        
        // Readout to show '.0' if decimal mode is selected without any integers 
        else if (displayValue === '0' && actionValue === '.') {
            displayValue = '0.'
            rewriteReadout(displayValue);
        }

        // Replace default value, 0
        else if ((displayValue === '0' && actionValue === '0') || (displayValue === '0' && actionValue !== '0')) {
            displayValue = actionValue;
            rewriteReadout(displayValue);
        }

         // Limit Readout to display one decimal symbol
         else if ((displayValue.indexOf('.') !== -1) && actionValue === '.') {
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

// MAIN
// Button config dependent on each mode
buttons.forEach((button) => {
    button.addEventListener('click', function(e) {
        actionID = e.target.id;
        actionClassName = e.target.className;
        actionValue = e.target.value;
        // Update State
        [currentMode, displayValue, firstArg, secondArg] = step(currentMode, displayValue, firstArg, secondArg, actionID, actionClassName, actionValue);
    })
});

/* GLOBAL STATE HANDLER */
function step(current_mode, display_value, first_arg, second_arg, action_id, action_classname, action_value) {
    switch (current_mode) {
        case 'default':
            if  (action_id === 'zero' || action_id === 'equal') {
                return ['default', display_value, null, null];
            } else if (action_id === 'decimal') {              
                display_value = '0.'
                rewriteReadout(display_value);
                return ['firstArgDecimalEdit', display_value, null, null];
            } else if (action_classname === 'integer') {
                display_value = action_value;
                rewriteReadout(display_value);
                return ['firstArgIntegerEdit', display_value, null, null];
            } else if (action_classname === 'operator') {
                operator = action_value;
                return ['firstArgLocked', DEFAULT_DISPLAY, Number(display_value), null];
            } else {
                return ['default', display_value, null, null];
            } 

        case 'firstArgDecimalEdit':
            if (action_id === 'decimal') {
                return ['firstArgDecimalEdit', display_value, null, null]; //can't return NULL because an array can't be assigned to NULL (NULL is not iterable), return the same state instead */
            } else if (action_classname === 'integer') {
                display_value += action_value; //concatenate string
                rewriteReadout(display_value);
                return ['firstArgDecimalEdit', display_value, null, null]
            } else if (action_classname === 'operator') {
                operator = action_value;
                return ['firstArgLocked', display_value, Number(display_value), null];
            } else if (action_id === 'equal') {
                return ['result', display_value, Number(display_value), null];
            }
            else {
                return ['firstArgDecimalEdit', display_value, null, null];
            }

        case 'firstArgIntegerEdit':
            if (action_classname === 'integer') {
                display_value += action_value;
                rewriteReadout(display_value);
                return ['firstArgIntegerEdit', display_value, null, null];
            } else if (action_id === 'decimal') {
                display_value += action_value;
                rewriteReadout(display_value);
                return ['firstArgDecimalEdit', display_value, null, null];
            } else if (action_classname === 'operator') {
                operator = action_value;
                return ['firstArgLocked', display_value, Number(display_value), null];
            } else if (action_id === 'equal') {
                return ['result', display_value, Number(display_value), null];
            } else {
                return ['firstArgIntegerEdit', display_value, null, null];
            }
            
        case 'firstArgLocked':
            if (action_classname === 'operator') {
                operator = action_value;
                return ['firstArgLocked', display_value, first_arg, null];
            } else if (action_id === 'decimal') {
                display_value = '.0'
                rewriteReadout(display_value);
                return ['secondArgDecimalEdit', display_value, first_arg, null];
            } else if (action_id === 'integer') {
                display_value = action_value;
                rewriteReadout(display_value);
                return ['secondArgIntegerEdit', display_value, first_arg, null];
            } else if (action_id === 'equal') {
                return ['result', display_value, first_arg, null];
            } else {
                return ['firstArgLocked', display_value, null, null];
            }

        case 'secondArgDecimalEdit':
            if (action_classname === 'integer') {
                display_value += action_value;
                rewriteReadout(display_value);
                return ['secondArgDecimalEdit', display_value, first_arg, null];
            } else if (action_classname === 'operator') {
                second_arg = Number(display_value);
                computedValue = operate(action_value, first_arg, second_arg).toString;
                display_value = computedValue;
                rewriteReadout(display_value);
                return ['firstArgLocked', display_value, Number(display_value), null];
            } else if (action_id === 'equal') {
                second_arg = Number(display_value);
                computedValue = operate(action_value, first_arg, secondArg).toString;
                display_value = computedValue;
                rewriteReadout(display_value);
                return ['result', display_value, first_arg, second_arg];
            }
            else {
                return ['secondArgDecimalEdit', display_value, first_arg, null];
            }

        case 'secondArgIntegerEdit':
            if (action_id === 'integer') {
                display_value += action_value;
                rewriteReadout(display_value);
                return ['secondArgIntegerEdit', display_value, first_arg, null];
            } else if (action_id === 'decimal'){
                display_value += action_value;
                second_arg = display_value;
                rewriteReadout(display_value);
                return ['secondArgDecimalEdit', display_value, first_arg, second_arg];
            } else if (action_classname === 'operator') {
                second_arg = Number(display_value);
                computedValue = operate(operator, first_arg, second_arg).toString;
                display_value = computedValue;
                rewriteReadout(display_value);
                return ['firstArgLocked', display_value, Number(display_value), null];
            } else if (action_id === 'equal') {
                second_arg = Number(display_value);
                computedValue = operate(operator, first_arg, second_arg).toString;
                display_value = computedValue;
                rewriteReadout(display_value);
                return ['result', display_value, first_arg, second_arg];
            } else {
                return ['secondArgIntegerEdit', display_value, first_arg, null];
            }

        case 'result':
            if (action_id === 'integer') {
                display_value = action_value;
                rewriteReadout(display_value)
                return ['firstArgIntegerEdit', display_value, null, null];
            } else if (action_id === 'decimal') {
                display_value = '0.';
                rewriteReadout(display_value);
                return ['firstArgDecimalEdit', display_value, null, null];
            } else if (action_id === 'equal') {
                return ['result', display_value, first_arg, second_arg];
            } else if (action_id == 'operator') {
                operator = action_id;
                return ['firstArgLocked', display_value, Number(display_value), null];
            }
            else {
                return ['default', DEFAULT_DISPLAY, DEFAULT_ARG, DEFAULT_ARG];
            }
        }

    }

/* MAIN */
startUpCalculator();

/* RECAP */
// A string, representing the underlying value that is associated with the button. Type conversion to Number required!


/* COMMENTS */
//Is there a way to dynamically add the operators based on user's operator input?