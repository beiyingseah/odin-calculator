// Add 
function add(stored_value, input) {
    return stored_value += input;
}

// Subtract
function subtract(stored_value,input) {
    return stored_value -= input
}

// Multiply
function multiply(stored_value, input) {
    return stored_value *= input
}

// Divide
function divide(stored_value, input) {
    return stored_value /= input;
}

function operate(operator, stored_value, input) {
    stored_value = Number(stored_value);
    input = Number(input);
    switch (operator) {
        case '/':
            if (input === 0) return NaN;
            else return divide(stored_value, input);
        case '*':
            return multiply(stored_value, input);
        case '-':
            return subtract(stored_value, input);
        case '+':
            return add(stored_value, input);
        default:
            return null;
    }
}


// Main 


// List of interactive variables
/* Events to capture */
/* SCREEN READOUT INTERACTIVITY */
/* COLOUR BUTTONS INTERACTIVITY */

/* RECAP */
// A string, representing the underlying value that is associated with the button. Type conversion to Number required!


/* COMMENTS */
//Is there a way to dynamically add the operators based on user's operator input?