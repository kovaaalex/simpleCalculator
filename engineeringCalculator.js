const engineering__numbers = document.querySelectorAll('.engineering__digit')
const engineering__operations = document.querySelectorAll('.engineering__operation')
const engineering__unary__operations = document.querySelectorAll('.engineering__unary__operation')
const engineering__C = document.querySelector('#engineering__clearLast')
//const C = document.querySelector('#engineering__clearAll')
const engineering__backspace = document.querySelector('#engineering__backspace')
const engineering__inner = document.querySelector('#engineering__result__inner')
const engineering__outer = document.querySelector('#engineering__result__outer')
const engineering__eql = document.querySelector('.engineering__equal')
const engineering__po = document.querySelector('.engineering__po')
const engineering__e = 2.7182818284590452353602874713527
const engineering__pi = 3.1415926535897932384626433832795
const engineering__eNumber = document.querySelector('.ENumber')
const engineering__piNumber = document.querySelector('.PiNumber')
const arrOperations = ["+", "-", "*", "/", "%"]
const arrOperationsPriorities = [1, 1, 2, 2, 2]
const priority = { "+": 1, "-": 1, "*": 2, "/": 2, "%": 2, "^": 3, "(": 0 }
let engValue = "", engTempvalue = "", engFirstValue = "", operator, countOperators = 0

engineering__numbers.forEach(number => number.addEventListener('click', () => engineeringUpdateValue(number.outerText)))
engineering__operations.forEach(operation => operation.addEventListener('click', () => engineeringHandleOperation(operation.outerText)))
engineering__eql.addEventListener('click', () => engineeringCalculateResult())
engineering__C.addEventListener('click', () => engineeringClearAll())

function engineeringClearAll(){
    engValue = engTempvalue = engFirstValue = operator = ""
    countOperators = 0
    engineering__inner.innerHTML = ""
    engineering__outer.innerHTML = ""

}
function engineeringUpdateValue(char) {
    engValue += char
    engTempvalue += char
    engineering__outer.innerHTML = engTempvalue
}

function engineeringHandleOperation(op){
    if (operator)
    {
        //let firstOperator = operator
        if(arrOperationsPriorities[arrOperations.indexOf(operator)] >= arrOperationsPriorities[arrOperations.indexOf(op)]) 
            engineeringCalculateResult()
    }
    operator = op
    engFirstValue = engTempvalue
    engineering__inner.innerHTML = engFirstValue + op
    engValue += op
    engTempvalue = ""
    countOperators++
}

function engineeringCalculateResult(){
    //if(!areBracketsBalanced(value)) return
    const rpn = toRPN(engValue)
    engineering__inner.innerHTML = engValue + "="
    engineering__outer.innerHTML = evaluateRPN(rpn)
    engValue = engTempvalue = engineering__outer.outerText
}

function toRPN(expression) {
    const output = [];
    const operators = {'+': 1, '-': 1, '*': 2, '/': 2, '%': 2, '^': 3}
    let tmp = ""
    const stack = [];
    stack.length = 0
    for (let i = 0; i < expression.length; i++) {
        token = expression[i]
        if (!isNaN(parseFloat(token)) || token === '.' || 
        (token === '-' && (expression[i - 1] ==='(' || i === 0)) ||
        token === 'e' || token === 'π') {
            tmp += token
        }
        else 
        {
            if(tmp!="") 
            {
                output.push(tmp)
                tmp = ""
            }
            if (token === '(') {
            
            stack.push(token);
        } else if (token === ')') {
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                output.push(stack.pop());
            }
            stack.pop()
        } else {
            while (stack.length > 0 && operators[stack[stack.length - 1]] >= operators[token]) {
                output.push(stack.pop());
            }
            stack.push(token);
        }
    }
    }
    if(tmp!="") 
            {
                output.push(tmp)
                tmp = ""
            }
    while (stack.length > 0) {
        output.push(stack.pop());
    }
    return output
}
function evaluateRPN(rpn) {
    const stack = []
    rpn = rpn.map(function(element) {
        if (element === "e") {
            return e;
        } else if (element === "π") {
            return pi;
        } else {
            return element;
        }
    })
    for (let token of rpn) {
        if (!isNaN(parseFloat(token))) {
            stack.push(parseFloat(token))
        } else {
            const b = stack.pop()
            const a = stack.pop()
            switch (token) {
                case '+':
                    stack.push(a + b)
                    break;
                case '-':
                    stack.push(a - b)
                    break;
                case "×":
                    stack.push(a * b)
                    break;
                case "÷":
                    {
                        if(checkDivisionByZero(b)) return "Деление на ноль запрещено"
                        stack.push(a / b)
                        break;
                    }
                case '%':
                {   
                    if(checkDivisionByZero(b)) return "Деление на ноль запрещено"
                    stack.push(a % b)
                    break;
                }
                case '^':
                {   
                    stack.push(Math.pow(a, b))
                    break;
                }
            }
        }
    }
    return stack[0]
}