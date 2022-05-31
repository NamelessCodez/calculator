// functions to perform operations

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'ERROR';
    }
    return a / b;
}



// pass the numbers into correct operator functions 

function operate(a, b, operator) {
    if (Number(a) === NaN || Number(b) === NaN) {
        return 'ERROR';
    }
    

    if (operator == '+') {
        return add(Number(a), Number(b));
    } else if (operator == '-') {
        return subtract(Number(a), Number(b));
    } else if (operator == '*') {
        return multiply(Number(a), Number(b));
    } else {
        return divide(Number(a), Number(b));
    }
    
}
const DISPLAY_LIMIT = 11;
let firstNumber = '';
let secondNumber = '';
let operator = '';

const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.equal');
const clearButton = document.querySelector('.clearButton');
const decimalButton = document.querySelector('.decimal');



// add event listeners to number buttons to display entered numbers on the diplay
numberButtons.forEach(numberButton => numberButton.addEventListener('click', () => {
    if (operator){
// reset display if one number has already been inputted
        if (!(secondNumber)) display.textContent = '';
        secondNumber  += numberButton.textContent;
    } else {
        firstNumber += numberButton.textContent;
    }

    display.textContent += numberButton.textContent;
}));

// add event listeners to operator buttons, if operator, and numbers already exist perform the operation
// and set the new value of operator, else just set the value
// this is because only one operation is allowed at a time
operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click', () => {
    if (operator && firstNumber && secondNumber) {
        firstNumber = operate(Number(firstNumber), Number(secondNumber), operator);
// reset second number everytime an operation is performed
        secondNumber = '';
        decimalButton.classList.remove('disable');
        printValue(`${firstNumber}`);
        operator = operatorButton.textContent;
    }
    else {
        operator = operatorButton.textContent;
        decimalButton.classList.remove('disable');
    }
}));


// perform the operation when equal button pressed

equalButton.addEventListener('click', () => {
    if (firstNumber && secondNumber && operator) {
        firstNumber = operate(firstNumber, secondNumber, operator);
        secondNumber = '';
        printValue(`${firstNumber}`);
        decimalButton.classList.remove('disable');
    }
});

// clear the variables and the display when clear button is pressed
clearButton.addEventListener('click', () => {
    display.textContent = '';
    firstNumber = '';
    secondNumber = '';
    operator = '';
    decimalButton.classList.remove('disable');
})

// print value to display after considering the number of digits and decimal places in the value

function printValue(value) {
    if (value.length > DISPLAY_LIMIT) {
        decimalsAllowed = DISPLAY_LIMIT - `${parseInt(value)}`.length;
        display.textContent = Math.round(value * Math.pow(10, decimalsAllowed)) / Math.pow(10, decimalsAllowed);
    } else {
        display.textContent = value;
    }
}

// add decimal point utitlity

decimalButton.addEventListener('click', () => {
    if (!(decimalButton.classList.contains('disable'))) {
        if (secondNumber) {
            secondNumber += decimalButton.textContent;
        } else {
            firstNumber += decimalButton.textContent;
        }
        display.textContent += decimalButton.textContent;
        decimalButton.classList.add('disable');
    }
})

