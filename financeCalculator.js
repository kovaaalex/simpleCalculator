    const finNumbers = document.querySelectorAll('.finance .basic__digi')
    const amountDisplay = document.getElementById('amount')
    const finance__backspace = document.getElementById('finance__backspace')
    const finance__clear = document.getElementById('finance__clear')
    finNumbers.forEach(nm => nm.addEventListener('click', () => addNmbr(nm.outerText)))
    finance__backspace.addEventListener('click', () => clearLast())
    finance__clear.addEventListener('click', () => financeClear())
    let finInput = "", countAfterPoint = 0, includesPoint = false
    const form = document.getElementById('conversionForm');
    const result = document.getElementById('result');
    
    function addNmbr(chr){
        if((chr === '.' && includesPoint) || countAfterPoint === 2) return
        if(chr === '.' && !finInput) finInput = "0."
        else 
        finInput += chr
        amountDisplay.innerHTML = finInput
        if(includesPoint) countAfterPoint++
        if(chr === '.') includesPoint = true
    }
    function clearLast(){
        if(includesPoint && finInput[finInput.length - 1] !== '.') countAfterPoint--
        else if (finInput[finInput.length - 1] === '.') includesPoint = false
        finInput = finInput.slice(0, -1)
        amountDisplay.innerHTML = finInput
    }
    function financeClear(){
        finInput = ""
        amountDisplay.innerHTML = finInput
        countAfterPoint = 0
        includesPoint = false
    }
    
    async function getExchangeRate() {
        try {
            const response = await fetch('https://v6.exchangerate-api.com/v6/56f9dd5997ec6a47b0fd64fa/latest/BYN');
            const data = await response.json();
            return data.conversion_rates.BYN;
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
            return null;
        }
    }

    form.addEventListener('submit', async event => {
        event.preventDefault();
        if (isNaN(+finInput)) {
            result.textContent = 'Пожалуйста, введите корректную сумму.';
            return;
        }
        const exchangeRate = await getExchangeRate();
        if (exchangeRate === null) {
            result.textContent = 'Не удалось получить текущий курс валют. Попробуйте позже.';
            return;
        }
        const convertedAmount = finInput * exchangeRate;
        result.textContent = `${finInput} долларов = ${convertedAmount.toFixed(2)} рублей.`;
    });
