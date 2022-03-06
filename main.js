// Initiaise default/start variables (or, states - see FSA diagram)
const DEFAULT_MODE = 'default'
const DEFAULT_DISPLAY = '0';
const DEFAULT_ARG = null;

// Initiaising global variables that define a global state at any one time
/* RECAP Odin Project 'Etch-a-sketch': it toggled between 3 states: 'classic', 'rainbow', 'eraser' which corresponded to 3 buttons. */
let currentMode = DEFAULT_MODE;
let displayValue = DEFAULT_DISPLAY;
let firstArg = DEFAULT_ARG; //null is used to intentionally give an empty value to something
let secondArg = DEFAULT_ARG;
let current_operator = DEFAULT_ARG;
let next_operator = DEFAULT_ARG;
 
// "Global State handler" function

function startUpCalculator() {
    console.log('startup calculator');
    step('default', DEFAULT_DISPLAY, DEFAULT_ARG, DEFAULT_ARG); //the remaining args will be assigned as 'undefined'
    current_operator, next_operator = DEFAULT_ARG, DEFAULT_ARG;
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
function toggleSign(string_value) {
    let toggledNum = Number(string_value) * -1;
    return toggledNum.toString();
}

function operate(operator, first_arg, second_arg) {
    console.log('operator');
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


/* SCREEN READOUT INTERACTIVITY */
function updateDisplayValue(display_value, action_id, action_value) {
    console.log('updateDisplayValue');
    // Readout display limit
    if (display_value.length === 16) {
        console.log('display limit');
        return display_value.substring(0, 16);
    }
    
    // Replace default value, 0
    else if (display_value === '0' && action_id !== 'decimal') {
        console.log('default value from 0');
        console.log('display_value:', display_value, 'action_value:', action_value); 
        display_value = action_value
        return display_value;
    }
    
    // Readout to show '.0' if decimal mode is selected without any integers 
    else if (display_value === '0' && action_id === 'decimal') {
        console.log('show 0.');
        display_value = '0.'
        return display_value
    }

    else if (display_value === '0.' && action_id !== 'decimal') {
        console.log('show 0. + integer');
        display_value += action_value;
        return display_value;
    }

    // Limit Readout to display one decimal symbol
    //if readout already has a decimal AND decimal button is clicked
    else if ((display_value.indexOf('.') !== -1) && (action_value === '.')) {
        console.log('limit to 1 decimal point');
        return display_value;
    }

    else if (action_id === 'toggleSign') {
        console.log('toggle sign');
        return toggleSign(display_value);
    }

    else if (action_id === 'clearEntry') {
        console.log('clear entry function');
        let new_display_value = display_value.substring(0, display_value.length - 1);
        if (new_display_value.length === 0) {
            display_value = DEFAULT_DISPLAY
            return display_value;
        } 
        else {
            display_value = new_display_value;
            return display_value;
        }
    }

    else {
        display_value += action_value
        return display_value;
    }
    
}

function computeDisplayValue(display_value, operator, first_arg, second_arg) {
    console.log('computeDisplayValue');
    display_value = operate(operator, first_arg, second_arg).toString();
    return display_value;
}

// Frontend function
function updateReadout(display_value) {
    readout.textContent = display_value;
}


// MAIN
// Button config dependent on each mode
buttons.forEach((button) => {
    button.addEventListener('click', function(e) {
        let actionID = e.target.id;
        let actionClassName = e.target.className;
        let actionValue = e.target.value;
        console.log('button event');
        
        // Update State
        [currentMode, displayValue, firstArg, secondArg] = step(currentMode, displayValue, firstArg, secondArg, actionID, actionClassName, actionValue);
    })
});

/* GLOBAL STATE HANDLER */
function step(current_mode, display_value, first_arg, second_arg, action_id, action_classname, action_value) {
    console.log('global state handler');
    console.log('display_value:', display_value, 'displayValue:', displayValue);
    console.log('action_id:', action_id);
    switch (current_mode) {
        case 'default':
            console.log('default state');
            if  (action_id === 'equal') {
                return ['default', display_value, null, null];
            } 
            else if (action_id === 'decimal') {     
                console.log('default-decimal');         
                display_value = updateDisplayValue(display_value, action_id, action_value);
                updateReadout(display_value);
                return ['firstArgDecimalEdit', display_value, null, null];
            } 
            else if (action_classname === 'integer') {
                console.log('default-integer');
                display_value = updateDisplayValue(display_value, action_id, action_value);
                updateReadout(display_value);
                return ['firstArgIntegerEdit', display_value, null, null];
            } 
            else if (action_classname === 'operator') {
                console.log('default-operator');
                current_operator = action_value;
                return ['firstArgLocked', DEFAULT_DISPLAY, Number(display_value), null];
            } 

            else if (action_id === 'clearAll') {
                console.log('clearall function');
                updateReadout(DEFAULT_DISPLAY);
                return ['default', DEFAULT_DISPLAY, DEFAULT_ARG, DEFAULT_ARG];
            }
            else { 
                console.log('default-default keep state');
                display_value = updateDisplayValue(display_value, action_id, action_value);
                updateReadout(displayValue);
                return ['default', display_value, null, null];
            } 

        case 'firstArgDecimalEdit':
            console.log('firstArgDecimalEdit state');
            console.log('display_value:', display_value, 'displayValue:', displayValue);
            if (action_id === 'decimal') {
                console.log('firstArgDecimalEdit - decimal');
                display_value = updateDisplayValue(display_value, action_id, action_value);
                updateReadout(display_value);
                return ['firstArgDecimalEdit', display_value, null, null]; //can't return NULL because an array can't be assigned to NULL (NULL is not iterable), return the same state instead */
            } 
            else if (action_classname === 'integer') {
                console.log('firstArgDecimalEdit - integer');
                display_value = updateDisplayValue(display_value, action_id, action_value);
                updateReadout(display_value);
                return ['firstArgDecimalEdit', display_value, null, null]
            } 
            else if (action_classname === 'operator') {
                console.log('firstArgDecimalEdit - operator');
                current_operator = action_value;
                return ['firstArgLocked', display_value, Number(display_value), null];
            } 
            else if (action_id === 'equal') {
                console.log('firstArgDecimalEdit - equal');
                return ['result', display_value, Number(display_value), null];
            }

            else if (action_id === 'clearAll') {
                console.log('clearall function');
                updateReadout(DEFAULT_DISPLAY);
                return ['default', DEFAULT_DISPLAY, DEFAULT_ARG, DEFAULT_ARG];
            }

            else {
                console.log('firstArgDecimalEdit - keep state');
                display_value = updateDisplayValue(display_value, action_id, action_value);
                updateReadout(displayValue);
                return ['firstArgDecimalEdit', display_value, null, null];
            }

        case 'firstArgIntegerEdit':
            console.log('firstArgIntegerEdit state');
            console.log('display_value:', display_value, 'displayValue:', displayValue);
            if (action_id === 'decimal') {
                console.log('firstArgIntegerEdit - decimal');
                display_value = updateDisplayValue(display_value, action_id, action_value);
                updateReadout(display_value);
                return ['firstArgDecimalEdit', display_value, null, null];
            }
            
            else if (action_classname === 'integer') {
                console.log('firstArgIntegerEdit - integer');
                display_value = updateDisplayValue(display_value, action_id, action_value);
                updateReadout(display_value);
                return ['firstArgIntegerEdit', display_value, null, null];
            } 
            
            else if (action_classname === 'operator') {
                console.log('firstArgIntegerEdit - operator');
                current_operator = action_value;
                return ['firstArgLocked', display_value, Number(display_value), null];
            } 
            else if (action_id === 'equal') {
                console.log('firstArgIntegerEdit - equal');
                return ['result', display_value, Number(display_value), null];
            } 
            
            else if (action_id === 'clearAll') {
                console.log('clearall function');
                updateReadout(DEFAULT_DISPLAY);
                return ['default', DEFAULT_DISPLAY, DEFAULT_ARG, DEFAULT_ARG];
            }

            else {
                console.log('firstArgIntegerEdit - keep state');
                display_value = updateDisplayValue(display_value, action_id, action_value);
                updateReadout(display_value);
                return ['firstArgIntegerEdit', display_value, null, null];
            }
            
        case 'firstArgLocked':
            console.log('firstArgLocked state');
            console.log('display_value:', display_value, 'displayValue:', displayValue);
            if (action_classname === 'operator') {
                console.log('firstArgLocked - operator');
                current_operator = action_value;
                return ['firstArgLocked', display_value, first_arg, null];
            } 

            else if (action_id === 'decimal') {
                console.log('firstArgLocked - decimal');
                display_value = '0.';
                updateReadout(display_value);
                return ['secondArgDecimalEdit', display_value, first_arg, null];
            } 
            else if (action_id === 'integer') {
                console.log('firstArgLocked - integer');
                display_value = updateDisplayValue(display_value, action_id, action_value);
                updateReadout(display_value);
                return ['secondArgIntegerEdit', display_value, first_arg, null];
            }
            else if (action_id === 'equal') {
                console.log('firstArgLocked - keep state');
                return ['result', display_value, first_arg, null];
            } 

            else if (action_id === 'clearAll') {
                console.log('clearall function');
                updateReadout(DEFAULT_DISPLAY);
                return ['default', DEFAULT_DISPLAY, DEFAULT_ARG, DEFAULT_ARG];
            }
       
            else {
                console.log('firstArgLocked - keep state');
                display_value = updateDisplayValue(display_value, action_id, action_value);
                current_operator = action_value;
                return ['firstArgLocked', display_value, first_arg, null];
            }

        case 'secondArgDecimalEdit':
            console.log('secondArgDecimalEdit state');
            console.log('display_value:', display_value, 'displayValue:', displayValue);
            if (action_classname === 'integer') {
                console.log('secondArgDecimalEdit - integer');
                display_value = updateDisplayValue(display_value, action_id, action_value);
                updateReadout(display_value);
                return ['secondArgDecimalEdit', display_value, first_arg, null];
            } 
            else if (action_classname === 'operator') {
                console.log('secondArgDecimalEdit - operator');
                second_arg = Number(display_value);
                next_operator = action_value;
                display_value = computeDisplayValue(display_value, current_operator, first_arg, second_arg);
                current_operator = next_operator;
                updateReadout(display_value);
                return ['firstArgLocked', display_value, Number(display_value), null];
            } 
            else if (action_id === 'equal') {
                console.log('secondArgDecimalEdit - equal');
                second_arg = Number(display_value);
                display_value = computeDisplayValue(display_value, current_operator, first_arg, second_arg);
                updateReadout(display_value);
                return ['result', display_value, first_arg, second_arg];
            }
            else if (action_id === 'clearAll') {
                console.log('clearall function');
                updateReadout(DEFAULT_DISPLAY);
                return ['default', DEFAULT_DISPLAY, DEFAULT_ARG, DEFAULT_ARG];
            }
      
            else {
                console.log('secondArgDecimalEdit - keep state');
                display_value = updateDisplayValue(display_value, action_id, action_value);
                updateReadout(display_value);
                return ['secondArgDecimalEdit', display_value, first_arg, null];
            }

        case 'secondArgIntegerEdit':
            console.log('secondArgIntegerEdit state');
            console.log('display_value:', display_value, 'displayValue:', displayValue);
            if (action_id === 'integer') {
                console.log('secondArgIntegerEdit - integer');
                display_value = updateDisplayValue(display_value, action_id, action_value);
                updateReadout(display_value);
                return ['secondArgIntegerEdit', display_value, first_arg, null];
            } 
            else if (action_id === 'decimal'){
                console.log('secondArgIntegerEdit - decimal');
                display_value = updateDisplayValue(display_value, action_id, action_value);
                updateReadout(display_value);
                return ['secondArgDecimalEdit', display_value, first_arg, second_arg];
            } 
            else if (action_classname === 'operator') {
                console.log('secondArgIntegerEdit - operator');
                second_arg = Number(display_value);
                next_operator = action.value;
                display_value = computeDisplayValue(display_value, current_operator, first_arg, second_arg);
                current_operator = next_operator;
                updateReadout(display_value);
                return ['firstArgLocked', display_value, Number(display_value), null];
            } 
            else if (action_id === 'equal') {
                console.log('secondArgIntegerEdit - equal');
                second_arg = Number(display_value);
                display_value = computeDisplayValue(display_value, current_operator, first_arg, second_arg);
                updateDisplayValue(current_mode, display_value, first_arg, second_arg, action_id, action_value);
                updateReadout(display_value);
                return ['result', display_value, first_arg, second_arg];
            } 
            else if (action_id === 'clearAll') {
                console.log('clearall function');
                updateReadout(DEFAULT_DISPLAY);
                return ['default', DEFAULT_DISPLAY, DEFAULT_ARG, DEFAULT_ARG];
            }
            else {
                console.log('secondArgIntegerEdit - keep state');
                display_value = updateDisplayValue(display_value, action_id, action_value);
                updateReadout(display_value);
                return ['secondArgIntegerEdit', display_value, first_arg, null];
            }

        case 'result':
            console.log('result state');
            console.log('display_value:', display_value, 'displayValue:', displayValue);
            if (action_id === 'integer') {
                console.log('result - integer');
                display_value = action_value;
                updateDisplayValue(current_mode, display_value, first_arg, second_arg, action_id, action_value);
                updateReadout(display_value);
                return ['firstArgIntegerEdit', display_value, null, null];
            } 
            else if (action_id === 'decimal') {
                console.log('result - decimal');
                display_value = '0.';
                updateDisplayValue(current_mode, display_value, first_arg, second_arg, action_id, action_value);
                updateReadout(display_value);
                return ['firstArgDecimalEdit', display_value, null, null];
            } 
            else if (action_id === 'equal') {
                console.log('result - equal');
                return ['result', display_value, first_arg, second_arg];
            }
            else if (action_id == 'operator') {
                console.log('result - operator');
                current_operator = action_value;
                return ['firstArgLocked', display_value, Number(display_value), null];
            }
            else {
                console.log('result - keep state: clearAll, clearEntry');
                updateReadout(DEFAULT_DISPLAY);
                return ['result', DEFAULT_DISPLAY, DEFAULT_ARG, DEFAULT_ARG];
            }
        }
    }

/* MAIN */
startUpCalculator();

/* RECAP */
// A string, representing the underlying value that is associated with the button. Type conversion to Number required!
 //action = e.target; //Note: A read-only property means it cannot be overwritten or assigned to. Any such assignment will silently do nothing in non-strict mode. 


/* COMMENTS */
//Is there a way to dynamically add the operators based on user's operator input?