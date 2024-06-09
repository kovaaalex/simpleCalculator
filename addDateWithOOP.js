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
        this.element.querySelector('.prev__month').addEventListener('click', this.changeMonth(-1))
        this.element.querySelector('.next__month').addEventListener('click', this.changeMonth(1))
        this.element.addTdListeners()
    }
    changeMonth(direction){
        this.mnth += direction
        if (this.mnth < 0) {
            this.mnth = 11
            this.year--
        }
        else if (this.mnth > 11) {
            this.mnth = 0
            this.year++
        }
        this.renderCalendar()
    }
    addTdListeners(){
        const tds = document.querySelectorAll('td')
        tds.forEach(td => td.addEventListener('mouseenter', () => {
            if(!(+td.innerHTML)) {
                td.style.backgroundColor = "#444546"
                td.style.cursor = "pointer"
            }
        }))
        tds.forEach(td => td.addEventListener('click', () => {
            if(!isNaN(td.innerHTML) && td.innerHTML !== '') {
                let closestCalendar = td.closest('.calendar')
                let closestDT = closestCalendar.closest('.dt')
                let inn = closestCalendar.querySelector('span')
                let text = `${td.innerHTML} ${inn.innerHTML}`
                closestCalendar.querySelector('.selected__date').innerHTML = text
                if(closestDT.id === 'add__day') 
                    DateManagement.addDay()
                else
                    DateManagement.countDifference()
            }
        }))
    }
}
class DateManagement{
    static convertDate(stringDate){
        const parts = stringDate.split(" ")
        const d = +parts[0]
        const m = month.indexOf(parts[1])
        const y = +parts[2]
        const date = new Date(y, m, d)
        return date
    }
    static changeDate(chosen__date, ch_dt = today){
        chosen__date.innerHTML = `${ch_dt.getDate()} ${month[ch_dt.getMonth()]} ${ch_dt.getFullYear()}`
    }
    static addDay(){
        const mainDate = document.querySelector('#add__day .selected__date')
        const convertedDate = this.convertDate(mainDate.innerHTML)
        let addedYear = parseInt(document.querySelector('#year .added__text').innerHTML)
        let addedMonth = parseInt(document.querySelector('#month .added__text').innerHTML)
        let addedDay = parseInt(document.querySelector('#day .added__text').innerHTML)
        if(document.querySelector('#add').checked){
            convertedDate.setFullYear(convertedDate.getFullYear() + addedYear)
            convertedDate.setMonth(convertedDate.getMonth() + addedMonth)
            convertedDate.setDate(convertedDate.getDate() + addedDay)
        }
        else{
            convertedDate.setFullYear(convertedDate.getFullYear() - addedYear)
            convertedDate.setMonth(convertedDate.getMonth() - addedMonth)
            convertedDate.setDate(convertedDate.getDate() - addedDay)
        }
        this.changeDate(document.querySelector('.added__result'), convertedDate)
    }
}
document.addEventListener('DOMContentLoaded', () =>{
    const calendars = document.querySelectorAll('.choose__date')
    calendars.forEach(calendar => new Calendar(calendar))
})