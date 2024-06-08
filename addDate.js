const calendars = document.querySelectorAll('.choose__date');
const month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

calendars.forEach(calendar => addCalendar(calendar));

function addCalendar(calendar){
    const today = new Date()
    let mnth = today.getMonth()
    let year = today.getFullYear()
    let firstDayOfMonth = new Date(year, mnth, 1).getDay()
    let lastDateOfMonth = new Date(year, mnth + 1, 0).getDate()
    let lastDateOfPreviousMonth = new Date(year, mnth, 0).getDate()
    let dayOfWeek = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1
    let calendarHTML = 
    `<table>
        <thead>
            <tr>
                <th colspan="7">${month[mnth]} ${year}</th>
            </tr>
            <tr>`
    daysOfWeek.forEach(day => {
        calendarHTML += `<th>${day}</th>`
    })
    calendarHTML += `</tr>
        </thead>
        <tbody><tr>`
    for (let i = 0; i < dayOfWeek; i++)
        calendarHTML += `<td>${lastDateOfPreviousMonth - dayOfWeek + i + 1}</td>`
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
}
