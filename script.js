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
    if (currentInput !== "") {expression.push(currentInput);};
    expression.push(e.target.textContent);
    currentInput = "";
    refreshDisplay();
}

function inputEqual (e) {
    if (currentInput !== "") {expression.push(currentInput);};
    result = evaluate(expression);
    expression = [];
    currentInput = "";
    refreshDisplay(showResult=true);
}

function addition(a, b) {return a + b};
function substraction(a, b) {return a - b};
function multiplication(a, b) {return a * b};
function division(a, b) {return b === 0 ? "Division by Zero Error": a / b}
function parseNumber(string) {return string.includes(".") ? parseFloat(string): parseInt(string)}

function correctExpression(array) {
    const re = /^[+\-x/]+$/;
    // check and correct starting operators
    if (array[0] === "-" || array[0] === "+") array.unshift("0");
    if (array[0] === "x" || array[0] === "x") array.unshift("1");
    
    for (let i = 0; i < array.length; i++) {
        // check and report double operators
        if (re.test(array[i]) && re.test(array[i+1])) {return false;};
    }
    // check and correct ending operators
    const l = array.length
    if (re.test(array[l])) array.pop();

    return array;
}

function array2exp(array) {
    array = correctExpression(array);
    if (array === false) return {value: "Syntax Error",};
    
    let exp = {value: null,};

    // main operator is addition
    let additionIndex = array.indexOf("+");
    if (additionIndex !== -1) {
        exp["function"] = addition;
        exp["leftChild"] = array2exp(array.slice(0, additionIndex));
        exp["rightChild"] = array2exp(array.slice(additionIndex+1));
        return exp;
    }

    // main operator is substraction
    let substractionIndex = array.indexOf("-");
    if (substractionIndex !== -1) {
        exp["function"] = substraction;
        exp["leftChild"] = array2exp(array.slice(0, substractionIndex));
        exp["rightChild"] = array2exp(array.slice(substractionIndex+1));
        return exp;
    }

    // main operator is multiplication
    let multiplicationIndex = array.indexOf("x");
    if (multiplicationIndex !== -1) {
        exp["function"] = multiplication;
        exp["leftChild"] = array2exp(array.slice(0, multiplicationIndex));
        exp["rightChild"] = array2exp(array.slice(multiplicationIndex+1));
        return exp;
    }

    // main operator is division 
    let divisionIndex = array.indexOf("/");
    if (divisionIndex !== -1) {
        exp["function"] = division;
        exp["leftChild"] = array2exp(array.slice(0, divisionIndex));
        exp["rightChild"] = array2exp(array.slice(divisionIndex+1));
        return exp;
    }

    // no operator left
    if (array.length === 1) {
        exp["value"] = parseNumber(array[0]);
        return exp;
    }

    // fallback case!
    return exp;   
}

function solve(exp) {
    if (exp.value !== null) return exp.value;
    return exp.function(solve(exp.leftChild), solve(exp.rightChild));
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