const from = document.getElementById('from')
const url = 'countries.json'

fetch(url)
    .then(response => response.json())
    .then(data => callFunction(data))
.catch(error => console.error('Ошибка:', error))

function callFunction(data){
    const countries = data.countries
    countries.forEach(country => 
        from.innerHTML +=
            `<div class="country">
                <img src="${country.flag}" alt="Flag of ${country.name}">
                <div>${country.name}</div>
                <div>${country.currency}</div>
            </div>`)
}
