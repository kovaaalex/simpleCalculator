    const finNumbers = document.querySelectorAll('.finance .basic__digi')
    const amountDisplay = document.getElementById('amount')
    finNumbers.forEach(nm => nm.addEventListener('click', () => addNmbr(nm.outerText)))

    let finInput = ""
    const form = document.getElementById('conversionForm');
    const result = document.getElementById('result');

    function addNmbr(chr){
        finInput += chr
        amountDisplay.innerHTML = finInput
    }

    
    async function getExchangeRate() {
        try {
            const response = await fetch('https://v6.exchangerate-api.com/v6/56f9dd5997ec6a47b0fd64fa/latest/USD');
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
