const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let display_value = "0";
let first_value = null;
let operator = null;
let is_second_value = false;



updateDisplay();


function updateDisplay() {
    display.value = display_value;
}

keys.addEventListener("click", function (e) {

    let element = e.target;
    let value = element.value;

    if (!element.matches("button")) return;

    switch (element.value) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "=":
            handleOperator(value);
            break;
        case ".":
            inputDecimal();
            break;
        case "clear":
            clear();
            break;
        default:
            inputNumber(value);
            break;
    }

    updateDisplay();
});

function handleOperator(_operator) {

    let value = parseFloat(display_value);

    if (operator && is_second_value) {
        operator = _operator;
        return;
    }

    if (first_value === null) {
        first_value = value;
    } else if (operator) {

        let result = calculate(first_value, value, operator);

        display_value = `${parseFloat(result.toFixed(7))}`;
        first_value = result;
    }

    is_second_value = true;
    operator = _operator;
}

function calculate(_first, _second, _operator) {

    if (_operator === "+") {
        return _first + _second;
    } else if (_operator === "-") {
        return _first - _second;
    } else if (_operator === "*") {
        return _first * _second;
    } else if (_operator === "/") {
        return _first / _second;
    }

    return _second;
}

function clear() {

    display_value = "0";
}

function inputDecimal() {

    if (!display_value.includes(".")) {
        display_value += ".";
    }

}

function inputNumber(num) {

    if (is_second_value) {
        display_value = num;
        is_second_value = false;
    } else {
        display_value = display_value === "0" ? num : display_value + num;
    }



}