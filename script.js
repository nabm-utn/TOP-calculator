let currentInput = "";
let expression = [];
let result = "";
const display = document.querySelector(".display");

function createDisplayDiv(content) {
    const displayDiv = document.createElement("div");
    displayDiv.classList.add("display-div");
    displayDiv.textContent = content;
    return displayDiv;
}

function refreshDisplay(showResult=false) {
    while (display.firstChild) {display.removeChild(display.lastChild)}
    for (let i = 0; i < expression.length; i++) {
        display.appendChild(createDisplayDiv(expression[i]));
    }
    display.appendChild(createDisplayDiv(currentInput));
    if (showResult) display.appendChild(createDisplayDiv(result));
}

function inputNumber (e) {
    currentInput += e.target.textContent;
    refreshDisplay();
}

function inputDot (e) {
    if (!currentInput.includes(".")) {
        currentInput += e.target.textContent;
        refreshDisplay();
    }
}

function inputOperator (e) {
    expression.push(currentInput);
    expression.push(e.target.textContent);
    currentInput = "";
    refreshDisplay();
}

function inputEqual (e) {
    result = evaluate(expression);
    expression = [];
    currentInput = "";
    refreshDisplay(showResult=true);
}

function array2exp(exp) {
    return {};
}

function solve(exp) {
    return 0;
}

function evaluate(exp) {
    exp = array2exp(exp);
    return solve(exp);
}

const numbers = document.querySelectorAll(".number:not(#number-dot)");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const dot  = document.querySelector("#number-dot");

numbers.forEach(number => number.addEventListener("click", inputNumber));
operators.forEach(operator => operator.addEventListener("click", inputOperator));
equal.addEventListener("click", inputEqual);
dot.addEventListener("click", inputDot);

console.log(numbers);
console.log(operators);
console.log(equal);
console.log(dot);