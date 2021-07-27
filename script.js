let currentInput = "";
let expression = [];
let result = "";

function inputNumber (e) {
    currentInput += e.target.textContent;
}

function inputDot (e) {
    if (!currentInput.includes(".")) {
        currentInput += e.target.textContent;
    }
}

function inputOperator (e) {
    expression.push(currentInput);
    expression.push(e.target.textContent);
    currentInput = "";
}

function inputEqual (e) {
    result = evaluate(expression);
    expression = [];
    currentInput = "";
}

const numbers = document.querySelectorAll(".number:not(#number-dot)");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const dot  = document.querySelector("#number-dot");

console.log(numbers);
console.log(operators);
console.log(equal);
console.log(dot);