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
const engineering__point = document.querySelector('.engineering__point')
const arrOperations = ["+", "-", "×", "÷", "%"]
const arrOperationsPriorities = [1, 1, 2, 2, 2]
const priority = { "+": 1, "-": 1, "*": 2, "÷": 2, "%": 2, "^": 3, "(": 0 }
const brackets = document.querySelectorAll('.bracket')

let engValue = "", engTempvalue = "", engFirstValue = "", operator, countOperators = 0, engWorksEqual = false, bool__brackets = false

engineering__numbers.forEach(number => number.addEventListener('click', () => engineeringUpdateValue(number.outerText)))
engineering__operations.forEach(operation => operation.addEventListener('click', () => engineeringHandleOperation(operation.outerText)))
engineering__eql.addEventListener('click', () => engineeringCalculateResult())
engineering__C.addEventListener('click', () => engineeringClearAll())
brackets.forEach(bracket => bracket.addEventListener('click',() => addBracket(bracket.outerText)))
engineering__unary__operations.forEach(un_operation => un_operation.addEventListener('click', () => engineeringHandleUnaryOperation(un_operation.outerText)))
engineering__point.addEventListener('click', () => engineeringUpdateValue(engineering__point.outerText))

function addBracket(br){
    engValue += br
    engineering__inner.innerHTML = engValue
    bool__brackets = true
}
function engineeringClearAll(){
    engValue = engTempvalue = engFirstValue = operator = ""
    countOperators = 0
    engineering__inner.innerHTML = ""
    engineering__outer.innerHTML = "0"
    bool__brackets = false
}
function engineeringUpdateValue(char) {
    if(engTempvalue.includes('.') && char === '.') 
        return
    engValue += char
    engTempvalue += char
    engineering__outer.innerHTML = engTempvalue
}

function engineeringHandleOperation(op){
    if (operator && !bool__brackets)
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
const opr = {
    "1/x": {
        func: x => 1 / x,
        output: x => `1/${x}`
    },
    "|x|": {
        func: x => Math.abs(x),
        output: x => `abs(${x})`
    },
    "⌊х⌋": {
        func: x => Math.floor(x),
        output: x => `floor(${x})`
    },
    "⌈х⌉": {
        func: x => Math.ceil(x),
        output: x => `ceil(${x})`
    },
    "n!": {
        func: x => {
            let factResult = 1;
            for (let i = 2; i <= x; i++) {
                factResult *= i;
            }
            return factResult;
        },
        output: x => `fact(${x})`
    },
    "x2": {
        func: x => Math.pow(x, 2),
        output: x => `sqr(${x})`
    },
    "√": {
        func: x => Math.sqrt(x),
        output: x => `sqrt(${x})`
    },
    "sin(x)": {
        func: x => Math.sin(x),
        output: x => `sin(${x})`
    },
    "cos(x)": {
        func: x => Math.cos(x),
        output: x => `cos(${x})`
    },
    "tan(x)": {
        func: x => Math.tan(x),
        output: x => `tan(${x})`
    },
    "cot(x)": {
        func: x => 1 / Math.tan(x),
        output: x => `cot(${x})`
    }
};

function engineeringHandleUnaryOperation(un_operation) {
    const regex = new RegExp(`${engTempvalue}(?!.*${engTempvalue})`, 'i');
    if (opr[un_operation]) {
        const { func, output } = opr[un_operation];
        const value = +engTempvalue;
        engValue = engValue.replace(regex, func(value));
        outputOperation = output(value);
        engTempvalue = func(value);
    }
    engineering__inner.innerHTML = outputOperation;
    engineering__outer.innerHTML = engTempvalue;
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
                        if(checkDivisionByZero(b)) return "Error: Division by Zero"
                        stack.push(a / b)
                        break;
                    }
                case '%':
                {   
                    if(checkDivisionByZero(b)) return "Error: Division by Zero"
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