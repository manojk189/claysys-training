"use strict";
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
let currentInput = "";
let operator = null;
let firstOperand = null;
let resetNext = false;
// Function to update the display
function updateDisplay(value) {
    display.value = value;
}
// Function to handle digit input
function handleDigit(digit) {
    if (resetNext) {
        currentInput = "";
        resetNext = false;
    }
    currentInput += digit;
    updateDisplay(currentInput);
}
// Function to handle operator input
function handleOperator(op) {
    if (currentInput === "")
        return;
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    }
    else if (operator) {
        calculate();
    }
    operator = op;
    resetNext = true;
}
// Function to calculate result
function calculate() {
    if (firstOperand === null || operator === null || currentInput === "")
        return;
    const secondOperand = parseFloat(currentInput);
    let result;
    switch (operator) {
        case "+":
            result = firstOperand + secondOperand;
            break;
        case "-":
            result = firstOperand - secondOperand;
            break;
        case "*":
            result = firstOperand * secondOperand;
            break;
        case "/":
            if (secondOperand === 0) {
                updateDisplay("Error (÷0)");
                resetCalculator();
                return;
            }
            result = firstOperand / secondOperand;
            break;
        default:
            return;
    }
    updateDisplay(result.toString());
    firstOperand = result;
    operator = null;
    resetNext = true;
}
// Function to clear calculator
function resetCalculator() {
    currentInput = "";
    operator = null;
    firstOperand = null;
    resetNext = false;
    updateDisplay("0");
}
// Add event listeners to buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.textContent;
        if (!isNaN(Number(value))) {
            handleDigit(value);
        }
        else if (["+", "-", "*", "/"].indexOf(value) !== -1) {
            handleOperator(value);
        }
        else if (value === "=") {
            calculate();
        }
        else if (value === "C") {
            resetCalculator();
        }
    });
});
//# sourceMappingURL=index.js.map