class Calendar{
    constructor(element){
        this.element = element
        this.month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
        this.daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
        this.today = new Date()
        this.mnth = today.getMonth()
        this.year = today.getFullYear()
        this.renderCalendar()
    }
    renderCalendar(){
        let firstDayOfMonth = new Date(this.year, this.mnth, 1).getDay()
        let lastDateOfMonth = new Date(this.year, this.mnth + 1, 0).getDate()
        let dayOfWeek = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

        let calendarHTML = 
        `<div class="calendar__header">
            <button class="prev__month">&lt;</button>
            <span>${this.month[this.mnth]} ${this.year}</span>
            <button class="next__month">&gt;</button>
        </div>
        <table>
            <thead>
                <tr>`

        this.daysOfWeek.forEach(day => {
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
        calendarHTML += `</tr></tbody></table>`
        this.element.innerHTML = calendarHTML
        this.element.querySelector('.prev__month').addEventListener('click', () => {
            mnth--
            if (mnth < 0) {
                mnth = 11
                year--
            }
            renderCalendar()
        })
        this.element.addTdListeners()
    }
}
document.addEventListener('DOMContentLoaded', () =>{
    const calendars = document.querySelectorAll('.choose__date')
    calendars.forEach(calendar => new Calendar(calendar))
})