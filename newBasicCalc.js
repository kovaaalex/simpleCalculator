const numbers = document.querySelectorAll('.basic__digit')
const operations = document.querySelectorAll('.basic__operation')
const unary__operations = document.querySelectorAll('.basic__unary__operation')
const CE = document.querySelector('#basic__clearLast')
const C = document.querySelector('#basic__clearAll')
const backspace = document.querySelector('#basic__backspace')
const inner = document.querySelector('#basic__result__inner')
const outer = document.querySelector('#basic__result__outer')
const eql = document.querySelector('.basic__equal')
const po = document.querySelector('.basic__po')
let value = "", tempvalue = "", firstvalue, temp2value, tempUnar__op, operationsEnabled = true, worksEqual = false, un_op = false, operation

numbers.forEach(number => number.addEventListener('click', () => updateValue(number.outerText)))
operations.forEach(operation => operation.addEventListener('click', () => handleOperation(operation.outerText)))
unary__operations.forEach(unar__operation => unar__operation.addEventListener('click', () => handleUnaryOperation(unar__operation.outerText)))
CE.addEventListener('click', () => clearLast())
C.addEventListener('click', () => clearAll())
backspace.addEventListener('click', () => clearLastElement())
eql.addEventListener('click', () => calculateResult())
po.addEventListener('click', () => updateValue(po.outerText))

function clearAll(){
    tempUnar__op = temp2value = tempvalue = value = firstvalue = ""
    inner.innerHTML = value
    outer.innerHTML = "0"
    operation = ""
    worksEqual = false
    unblocked()
}

function clearLast(){
    if(po.disabled === true || worksEqual)
        clearAll()
    else{
        tempvalue = ""
        outer.innerHTML = tempvalue
    }
}

function clearLastElement(){
    tempvalue = tempvalue.slice(0, -1)
    if(tempvalue === "") tempvalue ="0"
    outer.innerHTML = tempvalue
}

function blocked(){

    unary__operations.forEach(un__op => un__op.disabled = true)
    operations.forEach(un__op => un__op.disabled = true)
    po.disabled = true
}

function unblocked(){
    unary__operations.forEach(un__op => un__op.disabled = false)
    operations.forEach(un__op => un__op.disabled = false)
    po.disabled = false
}

function updateValue(char){
    if(po.disabled === true)
        clearAll()
    tempvalue += char
    outer.innerHTML = tempvalue
}

function handleOperation(op){
    if(operation){
        if(!worksEqual)
            clc()
    }
    else{
        if(!firstvalue)
            firstvalue = tempvalue 
    }
    operation = op
    inner.innerHTML = firstvalue + op
    tempvalue = ""
}

function calculateResult(){
    if(!worksEqual)
        inner.innerHTML = firstvalue + operation + tempvalue + eql.outerText
    clc()
    worksEqual = true
}

function clc(){
    if(worksEqual) inner.innerHTML = firstvalue + operation + tempvalue
    switch (operation) {
        case "+":
            firstvalue = +firstvalue + +tempvalue
            break;
        case "-":
            firstvalue = firstvalue - tempvalue
            break;
        case "×":
            firstvalue = firstvalue * tempvalue
            break;
        case "÷":
            if(checkDivisionByZero(tempvalue)) return 
            firstvalue = firstvalue / tempvalue
            break;
        default:
            break;
    }
    outer.innerHTML = firstvalue
    value = ""
}

function checkDivisionByZero(divided){
    if (divided == 0){
        outer.innerHTML = "Error: Division by Zero"
        operationsEnabled = false
        blocked()
        return true
    }
    return false
}

function checkNegativeElements(squarted){
    if (squarted < 0){
        outer.innerHTML = "Error: Negative sqrt"
        operationsEnabled = false
        return true
    }
    return false
}

function handleUnaryOperation(unar__op){
    if(worksEqual) temp2value = firstvalue
    else temp2value = tempvalue
    switch (unar__op) {
        case "1/x":
            tempUnar__op = `1/(${temp2value})`
            if(worksEqual) 
            {
                firstvalue = 1 / firstvalue
            }
            else
                tempvalue = 1 / tempvalue
            break;
        case "√":
            tempUnar__op = `sqrt(${temp2value})`
            if(worksEqual) 
            {
                if(checkNegativeElements(firstvalue)) return 
                firstvalue = Math.sqrt(firstvalue)
            }
            else    {
                if(checkNegativeElements(tempvalue)) return 

                tempvalue = Math.sqrt(tempvalue)
            }
            break;
        case "x2":  
            tempUnar__op = `sqr(${temp2value})`
            if(worksEqual) 
                firstvalue = firstvalue * firstvalue
            else    
                tempvalue = tempvalue * tempvalue
            break;
        case "±":   
            tempUnar__op = `${-temp2value}`
            if(worksEqual) {
                if(firstvalue[0] === "-") firstvalue = firstvalue.slice(1)
                else firstvalue = "-" + firstvalue
            }
            else{
                if(tempvalue[0] === "-") tempvalue = tempvalue.slice(1)
                else tempvalue = "-" + tempvalue
            }
            break;
        case "%":
                if(!firstvalue){
                    clearAll()
                }
                else{
                    if (operation === "+" || operation === "-") {
                        tempvalue = firstvalue * tempvalue / 100
                    }
                    if (operation === "×" || operation === "÷") {
                        tempvalue = tempvalue / 100
                    }
                }
            tempUnar__op = firstvalue + operation + tempvalue
            //}
            break;
        default:
            break;
    }
    if(worksEqual) 
        outer.innerHTML = firstvalue
    else
        outer.innerHTML = tempvalue
    inner.innerHTML = tempUnar__op

    un_op = true
}
// осталось заблокировать кнопки при делителе 0 и отрицателльном корне