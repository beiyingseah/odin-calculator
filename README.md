# odin-calculator

In my final project for TOP Foundations, I combine everything I've learned so far -  JavaScript, HTML, and CSS - take an on-screen calculator!

KEY TAKEAWAYS
- This project tested and reinforced my understanding of the logic I had implemented for the previous project: Etch-a-Sketch, in simplified terms: state, output = step(state, output, action) where I define my own global states/variables and construct "global state" handler functions to take in states and call the respective helper functions to execute the next action based on my Finite State Automaton diagram.

TODOs
Part 1: HTML + CSS
1. Basic HTML calculator structure
2. With buttons for each digit and operators (+, -, /, *, =)
- When operator button is pressed, active status of button is switched on (to indicate to user) until another digit button is pressed (//button.active like in odin-EtchASketch?)
3. Display for calculator
4. 'Clear' button 
5. Footer (credits)

Part 2: Main.js
1. Basic math operator functions
- Add function
- Subtract function
- Multiply function 
- Divide function
- Clear function
2. Operate function 
- That takes an operator (+, -, /, x) and 2 numbers, then calls one of the basic math operator functions
- Runs with every pair of inputs (calculator should not evaluate more than a single pair of numbers at a time)
- Round answers with long decimals so they don't overflow the screen
- Pressing = before entering all numbers or an operator

Functions to handle user events
1. When user clicks the number buttons, populate display (print);
- 'Display value' to be stored in a variable somewhere for next arithmetic step
2. When user clicks operator, save the value. 
3. Then when user presses the "=" key (onsubmit), operate on them.
4. Display the 'solution' to the operation.
5. User validation for incorrect inputs:
- Display a snarky error message if user tries to divde by 0

EXTRA CREDIT
- [Handling large numbers] Large positive numbers: e+, small numbers: e-
- [Style] My Etch-a-sketch style was inspired by skeuomorphism.  This time, I go for a sleek, minimalist design inspired by Apple.
- [CSS] Colour scheme to be based on colour wheel (:
- [CSS] Make buttons responsive during hover, when selected, when disabled (for '.'), operations a different colour from keypad
- [Allow for floating point numbers]  Add a . button and let users input decimals! Make sure you don’t let them type more than one though.
- [Javascript] Add 'backspace' and 'clear' buttons] 
- [Javascript] Add 'keyboard' support]


REFERENCES
https://getcssscan.com/css-box-shadow-examples
