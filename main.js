// Add 
function add(stored_value, num) {
    return stored_value += num;
}

// Subtract
function subtract(stored_value, num) {
    return stored_value -= num
}

// Multiply
function multiply(stored_value, num) {
    return stored_value *= num
}

// Divide
function divide(stored_value, num) {
    return stored_value /= num;
}

function operate(operator, stored_value, digit) {
    stored_value = Number(stored_value);
    digit = Number(digit);
    switch (operator) {
        case '/':
            if (input === 0) return NaN;
            else return divide(stored_value, digit);
        case '*':
            return multiply(stored_value, digit);
        case '-':
            return subtract(stored_value, digit);
        case '+':
            return add(stored_value, digit);
        default:
            return null;
    }
}

/* List of interactive variables */ 
const readout = document.getElementById('readout');
const digits = document.querySelectorAll('.digit'); 
const clearAllBtn = document.getElementById('clearAllBtn');
const clearEntryBtn = document.getElementById('clearEntryBtn')

/* Events to capture */
// Digits
digits.forEach((digit) => {
    digit.addEventListener('click', function() {
        if (readout.textContent.length === 16) {
            return null;
        }

        // Limit Readout to one variable
        if ((readout.textContent.indexOf(".") !== -1) && digit.value === '.') {
            return null;
        }
         
        else {
            printReadout(digit.value);
        }
    })
});

// Clear buttons
clearAllBtn.onclick = () => clearReadout();
clearEntryBtn.onclick = () => backspaceReadout();


/* SCREEN READOUT INTERACTIVITY */
function printReadout(digit) {
    readout.textContent += digit;
}

function clearReadout() {
    readout.textContent = '';
}

function backspaceReadout() {
    readout.textContent = readout.textContent.substring(0,readout.textContent.length - 1);
}

/* COLOUR BUTTONS INTERACTIVITY */

/* MAIN */


/* RECAP */
// A string, representing the underlying value that is associated with the button. Type conversion to Number required!


/* COMMENTS */
//Is there a way to dynamically add the operators based on user's operator input?