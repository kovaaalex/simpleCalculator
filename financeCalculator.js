const finNumbers = document.querySelectorAll('.finance .basic__digi')
const amount = document.getElementById('amount')
const finance__backspace = document.getElementById('finance__backspace')
const finance__clear = document.getElementById('finance__clear')
finNumbers.forEach(nm => nm.addEventListener('click', () => addNmbr(nm.outerText)))
finance__backspace.addEventListener('click', () => clearLast())
finance__clear.addEventListener('click', () => financeClear())
let finInput = "", countAfterPoint = 0, includesPoint = false
const form = document.getElementById('conversionForm');
const result = document.getElementById('result');
const choose__valute = document.querySelectorAll('.choose__valute')

function addNmbr(chr){
    if((chr === '.' && includesPoint) || countAfterPoint === 2) return
    if(chr === '.' && !finInput) finInput = "0."
    else 
    finInput += chr
    amount.textContent = finInput
    if(includesPoint) countAfterPoint++
    if(chr === '.') includesPoint = true
}
function clearLast(){
    if(includesPoint && finInput[finInput.length - 1] !== '.') countAfterPoint--
    else if (finInput[finInput.length - 1] === '.') includesPoint = false
    finInput = finInput.slice(0, -1)
    amount.innerHTML = finInput
}
function financeClear(){
    finInput = "0"
    amount.innerHTML = finInput
    countAfterPoint = 0
    includesPoint = false
}
async function getExchangeRate() {
    try {
        const response = await fetch('https://v6.exchangerate-api.com/v6/56f9dd5997ec6a47b0fd64fa/latest/BYN')
        const data = await response.json();
        return data.conversion_rates.BYN;
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        return null;
    }
}

form.addEventListener('submit', async event => {
    event.preventDefault()
    if (isNaN(+finInput)) {
        result.textContent = 'Пожалуйста, введите корректную сумму.'
        return;
    }
    const exchangeRate = await getExchangeRate();
    if (exchangeRate === null) {
        result.textContent = 'Не удалось получить текущий курс валют. Попробуйте позже.'
        return;
    }
    const convertedAmount = finInput * exchangeRate;
    result.textContent = `${finInput} долларов = ${convertedAmount.toFixed(2)} рублей.`
})

choose__valute.forEach(chv => chv.addEventListener('click', () => openGrid(chv)))

function openGrid(chv){
    const cls = chv.closest('.vl')
    const valuteElement = cls.querySelector('.valute');
    if(valuteElement.style.display != 'grid')
        valuteElement.style.display = 'grid'
    else
        valuteElement.style.display = 'none'
}