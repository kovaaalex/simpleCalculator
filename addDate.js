const calendars = document.querySelectorAll('.choose__date')
const chosen__dates = document.querySelectorAll('.selected__date')

const month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const today = new Date()
let mnth = today.getMonth()
let year = today.getFullYear()
calendars.forEach(calendar => addCalendar(calendar))

chosen__dates.forEach(chosen__date => changeDate(chosen__date))
function changeDate(chosen__date, ch_dt = today){
    chosen__date.innerHTML = `${ch_dt.getDate()} ${month[mnth]} ${ch_dt.getFullYear()}`
}
function addCalendar(calendar){
    function renderCalendar(){
        let firstDayOfMonth = new Date(year, mnth, 1).getDay()
        let lastDateOfMonth = new Date(year, mnth + 1, 0).getDate()
        let dayOfWeek = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

        let calendarHTML = 
        `<div class="calendar__header">
            <button class="prev__month">&lt;</button>
            <span>${month[mnth]} ${year}</span>
            <button class="next__month">&gt;</button>
        </div>
        <table>
            <thead>
                <tr>`;

        daysOfWeek.forEach(day => {
            calendarHTML += `<th>${day}</th>`
        })
        calendarHTML += `</tr>
            </thead>
            <tbody><tr>`
        for (let i = 0; i < dayOfWeek; i++)
            calendarHTML += `<td></td>`
        for (let day = 1; day <= lastDateOfMonth; day++) {
            if (dayOfWeek > 6) {
                dayOfWeek = 0;
                calendarHTML += `</tr><tr>`
            }
            calendarHTML += `<td>${day}</td>`
            dayOfWeek++
        }
        while (dayOfWeek <= 6) {
            calendarHTML += `<td></td>`
            dayOfWeek++
        }
        calendarHTML += `</tr></tbody></table>`;
        calendar.innerHTML = calendarHTML;
        calendar.querySelector('.prev__month').addEventListener('click', () => {
            mnth--
            if (mnth < 0) {
                mnth = 11
                year--
            }
            addTdListeners()
            renderCalendar()
        })
        calendar.querySelector('.next__month').addEventListener('click', () => {
            mnth++
            if (mnth > 11) {
                mnth = 0
                year++
            }
            addTdListeners()
            renderCalendar()
        })
        addTdListeners()
    }
    renderCalendar()
}

function addTdListeners(){
    const tds = document.querySelectorAll('td')
    tds.forEach(td => td.addEventListener('mouseenter', () => {
        if(!(+td.innerHTML)) {td.style.backgroundColor = "#444546"
        td.style.cursor = "pointer"}
    }))
    tds.forEach(td => td.addEventListener('click', () => {
        if(!isNaN(td.innerHTML) && td.innerHTML !== '') {
            let closestCalendar = td.closest('.choose__date')
            let inn = closestCalendar.querySelector('.calendar__header span')
            let text = inn.innerHTML
            alert(`Выбрана дата: ${td.innerHTML} ${text}`)
        }
    }))
}