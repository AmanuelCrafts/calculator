const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

let currentOperand = "";
let previousOperand = "";
let operation = undefined;

function updateDisplay() {
  currentOperandTextElement.textContent = currentOperand;
  if (operation != null) {
    previousOperandTextElement.textContent = `${previousOperand} ${operation}`;
  } else {
    previousOperandTextElement.textContent = "";
  }
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentOperand += button.textContent;
    updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentOperand === "") return;
    if (previousOperand !== "") {
      calculate();
    }

    operation = button.textContent;
    previousOperand = currentOperand;
    currentOperand = "";
    updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  if (currentOperand === "" || previousOperand === "") return;
  calculate();
  operation = undefined;
  updateDisplay();
});

deleteButton.addEventListener("click", () => {
  currentOperand = currentOperand.slice(0, -1);
  updateDisplay();
});

allClearButton.addEventListener("click", () => {
  currentOperand = "";
  previousOperand = "";
  operation = undefined;
  updateDisplay();
});

function calculate() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "÷":
      if (current === 0) {
        alert("Cannot divide by zero!");
        return;
      }
      result = prev / current;
      break;

    default:
      return;
  }

  currentOperand = result;
  previousOperand = "";
}
