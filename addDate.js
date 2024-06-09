const calendars = document.querySelectorAll('.choose__date')
const chosen__dates = document.querySelectorAll('.selected__date')
const dateDiffDates = document.querySelectorAll('#date__difference .selected__date')

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

const add999 = document.querySelectorAll('.from0to999')
add999.forEach(itemAdd999 => {
    let itemsHTML = '';
    for (var i = 0; i < 1000; i++) {
        itemsHTML += `<div class="itemNumber" style="height: 20px;">${i}</div>`;
    }
    itemAdd999.innerHTML = itemsHTML;

    const items = itemAdd999.querySelectorAll('.itemNumber');
            const visibleItemCount = 12;
            if (items.length > 0) {
                const itemHeight = items[0].style.height;
                const containerHeight = parseInt(itemHeight) * visibleItemCount;
                itemAdd999.style.height = containerHeight + "px";
            }
})
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
            let closestCalendar = td.closest('.calendar')
            let inn = closestCalendar.querySelector('span')
            let text = `${td.innerHTML} ${inn.innerHTML}`
            closestCalendar.querySelector('.selected__date').innerHTML = text
            countDifference()
        }
    }))
}
chosen__dates.forEach(chosen__date => chosen__date.addEventListener('click', () => {
    let closestCalendar = chosen__date.closest('.calendar')
    let clr = closestCalendar.querySelector('.choose__date')
    if(clr.style.display === 'none')
        clr.style.display = 'block'
    else
        clr.style.display = 'none'
}))
function convertDate(stringDate){
    const parts = stringDate.split(" ")
    const d = +parts[0]
    const m = month.indexOf(parts[1])
    const y = +parts[2]
    const date = new Date(y, m, d)
    return date
}
function countDifference(){
    const date1String = dateDiffDates[0].innerHTML
    const date2String = dateDiffDates[1].innerHTML
    let date1 = convertDate(date1String)
    let date2 = convertDate(date2String)
    let diffTime = Math.abs(date2 - date1)/(1000 * 60 * 60 * 24)
    document.querySelector('.result__difference').innerHTML = `${diffTime} дн`
}