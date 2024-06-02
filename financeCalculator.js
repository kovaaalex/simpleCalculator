document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('conversionForm');
    const result = document.getElementById('result');

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

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);
        if (isNaN(amount)) {
            result.textContent = 'Пожалуйста, введите корректную сумму.';
            return;
        }
        const exchangeRate = await getExchangeRate();
        if (exchangeRate === null) {
            result.textContent = 'Не удалось получить текущий курс валют. Попробуйте позже.';
            return;
        }
        const convertedAmount = amount * exchangeRate;
        result.textContent = `${amount} долларов = ${convertedAmount.toFixed(2)} рублей.`;
    });
});
