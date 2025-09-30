const display: HTMLInputElement = document.getElementById("display") as HTMLInputElement;
const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".buttons button");

let currentInput: string = "";
let operator: string | null = null;
let firstOperand: number | null = null;
let resetNext: boolean = false;

// Function to update the display
function updateDisplay(value: string): void {
  display.value = value;
}

// Function to handle digit input
function handleDigit(digit: string): void {
  if (resetNext) {
    currentInput = "";
    resetNext = false;
  }
  currentInput += digit;
  updateDisplay(currentInput);
}

// Function to handle operator input
function handleOperator(op: string): void {
  if (currentInput === "") return;

  if (firstOperand === null) {
    firstOperand = parseFloat(currentInput);
  } else if (operator) {
    calculate();
  }

  operator = op;
  resetNext = true;
}

// Function to calculate result
function calculate(): void {
  if (firstOperand === null || operator === null || currentInput === "") return;

  const secondOperand: number = parseFloat(currentInput);
  let result: number;

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
function resetCalculator(): void {
  currentInput = "";
  operator = null;
  firstOperand = null;
  resetNext = false;
  updateDisplay("0");
}

// Add event listeners to buttons
buttons.forEach((button: HTMLButtonElement) => {
  button.addEventListener("click", () => {
    const value: string = button.textContent as string;

    if (!isNaN(Number(value))) {
      handleDigit(value);
    } else if (["+", "-", "*", "/"].indexOf(value) !== -1) {
      handleOperator(value);
    } else if (value === "=") {
      calculate();
    } else if (value === "C") {
      resetCalculator();
    }
  });
});
