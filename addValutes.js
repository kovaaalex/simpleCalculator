const valute = document.querySelectorAll('.valute')
const choose__valute = document.querySelectorAll('.choose__valute')
const from = document.querySelector('#from')
const to = document.querySelector('#to')
const url = 'countries.json'

fetch(url)
    .then(response => response.json())
    .then(data => callFunction(data))
.catch(error => console.error('Ошибка:', error))

function callFunction(data) {
    const countries = data.countries
    valute.forEach(element => {fillElement(element, countries, data)})
    choose__valute.forEach(choose__element => {fillStartElement(choose__element, countries, data)})
}

function fillElement(element, countries, data) {

    countries.forEach(country => {
        element.innerHTML += `
            <div class="country">
                <img class="flag" src="${country.flag}" alt="Flag of ${country.name}">
                <div class="coutry__currency">${country.currency}</div>
            </div>
        `
    })
}

function fillStartElement(element, countries, data) {
    const usdIndex = data.countries.findIndex(country => country.currency === 'USD');
    element.innerHTML += `
    <div class="country">
        <img class="flag" src="${countries[usdIndex].flag}" alt="Flag of ${countries[usdIndex].flag}">
        <div class="coutry__currency">${countries[usdIndex].currency}</div>
    </div>
    `
}