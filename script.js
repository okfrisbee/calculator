let displayValue = 0;
let signOperator = null;
let firstOperand = null;
let secondOperand = null;
let canRefreshDisplay = false;
let canEvaluate = true;
let pressedEqual = false;

function updateDisplay() {
    const display = document.querySelector(".display");
    display.textContent = displayValue;
    if (displayValue.length > 11) {
        display.textContent = displayValue.substring(0, 11);
    }
}

function clickButton() {
    const buttons = document.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", () => {
            if (buttons[i].classList.contains("operand")) {
                buttonOperand(buttons[i].value);
                updateDisplay();
            } else if (buttons[i].classList.contains("operator")) {
                buttonOperator(buttons[i].value);
            } else if (buttons[i].classList.contains("equals")) {
                equals();
                clear();
                pressedEqual = true;
            } else if (buttons[i].classList.contains("clear")) {
                clear();
                displayValue = 0;
                updateDisplay();
            } else if (buttons[i].classList.contains("delete")) {
                buttonDelete();
                updateDisplay();
            }
        });
    }
}

clickButton();

function buttonDelete() {
    if (pressedEqual) {
        displayValue = 0;
        pressedEqual = false;
    } else {
        displayValue = displayValue.substring(0, displayValue.length - 1);
    }
    
}

function clear() {
    signOperator = null;
    firstOperand = null;
    secondOperand = null;
    canRefreshDisplay = false;
    canEvaluate = true;
    pressedEqual = false;
}

function equals() {
    secondOperand = displayValue;
    if (secondOperand === "0" && signOperator === "/") {
        displayValue = "Error";
        updateDisplay();
        clear();
    } else {
        displayValue = operate(signOperator, firstOperand, secondOperand);
        updateDisplay();
    }
}

function buttonOperator(operator) {
    if (pressedEqual) {
        pressedEqual = false;
    }
    if (canEvaluate) {
        canRefreshDisplay = true;
        if (signOperator !== null) {
            equals();
        }
        firstOperand = displayValue;
        signOperator = operator;
    }
    canEvaluate = false;
}

function buttonOperand(operand) {
    if (pressedEqual) {
        displayValue = 0;
        pressedEqual = false;
    }
    if (!canEvaluate) {
        canEvaluate = true;
    }
    if (signOperator === null) {
        switch (displayValue) {
            case 0:
                displayValue = operand;
                break;
            case "0":
                displayValue = operand;
                break;
            case firstOperand:
                displayValue = operand;
                break;
            default:
                displayValue += operand;
        }
    } else if (displayValue === firstOperand && canRefreshDisplay) {
        displayValue = operand;
        canRefreshDisplay = false;
    } else {
        displayValue += operand;
    }
}

function add(x, y) {
    return +x + +y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(operator, x ,y) {
    switch(operator) {
        case "+":
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "*":
            return multiply(x, y);
        case "/":
            return divide(x ,y);
    }
}


