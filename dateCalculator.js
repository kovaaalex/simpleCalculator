const _month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
class Calendar{
    constructor(element){
        this.element = element
        this._daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
        this._today = new Date()
        this.mnth = this._today.getMonth()
        this.year = this._today.getFullYear()
        this.renderCalendar()
    }
    
    renderCalendar(){
        let firstDayOfMonth = new Date(this.year, this.mnth, 1).getDay()
        let lastDateOfMonth = new Date(this.year, this.mnth + 1, 0).getDate()
        let dayOfWeek = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1
        let calendarHTML = 
        `<div class="calendar__header">
            <button class="prev__month">&lt;</button>
            <span>${_month[this.mnth]} ${this.year}</span>
            <button class="next__month">&gt;</button>
        </div>
        <table>
            <thead>
                <tr>`

        this._daysOfWeek.forEach(day => {
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
        this.element.querySelector('.prev__month').addEventListener('click', () => this.changeMonth(-1))
        this.element.querySelector('.next__month').addEventListener('click', () => this.changeMonth(1))
        this.addTdListeners()
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

    static getToday(){
        return this._today
    }

}
class DateManagement{
    constructor(element){
        this.element = element
        this.changeDate(this.element, new Date)
        this.addDateListener()
    }
    static convertDate(stringDate){
        const parts = stringDate.split(" ")
        const d = +parts[0]
        const m = _month.indexOf(parts[1])
        const y = +parts[2]
        const date = new Date(y, m, d)
        return date
    }
    changeDate(chosen__date, ch_dt){
        chosen__date.innerHTML = `${ch_dt.getDate()} ${_month[ch_dt.getMonth()]} ${ch_dt.getFullYear()}`
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
        let aaa = document.querySelector('.added__result')
        aaa.innerHTML = `${convertedDate.getDate()} ${_month[convertedDate.getMonth()]} ${convertedDate.getFullYear()}`
    }
    addDateListener(){
        this.element.addEventListener('click', () => {
            let closestCalendar = this.element.closest('.calendar')
            let clr = closestCalendar.querySelector('.choose__date')
            if(clr.style.display === 'none')
                clr.style.display = 'block'
            else
                clr.style.display = 'none'
        })
    }
    static countDifference() {
        const dateDiffDates = document.querySelectorAll('#date__difference .selected__date');
        const date1 = this.convertDate(dateDiffDates[0].innerHTML);
        const date2 = this.convertDate(dateDiffDates[1].innerHTML);
        const diffTime = Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
        document.querySelector('.result__difference').innerHTML = `${diffTime} дн`;
    }
}
class UnityPicker{
    constructor(element){
        this.element = element
        this.renders()
        this.addListeners()
    }
    renders(){
        let itemsHTML = '';
        for (var i = 0; i < 1000; i++)
            itemsHTML += `<div class="itemNumber" style="height: 20px;">${i}</div>`;
        this.element.querySelector('.from0to999').innerHTML = itemsHTML;
        const items = this.element.querySelectorAll('.itemNumber');
        const visibleItemCount = 12;
        if (items.length > 0) {
            const itemHeight = items[0].style.height;
            const containerHeight = parseInt(itemHeight) * visibleItemCount;
            this.element.querySelector('.from0to999').style.height = containerHeight + "px";
        }
    }
    addListeners(){
        this.element.addEventListener('click', () => {
            const choose__unity = this.element.querySelector('.from0to999');
            choose__unity.style.display = choose__unity.style.display === 'none' ? 'block' : 'none';
        });
        this.element.querySelectorAll('.itemNumber').forEach(item => {
            item.addEventListener('click', () => {
                const text = this.element.querySelector('.added__text');
                const unity__id = this.element.id + "s";
                text.innerHTML = `${item.innerHTML} ${unity__id}`;
                DateManagement.addDay();
            });
        });
    }
}
document.addEventListener('DOMContentLoaded', () =>{
    const calendars = document.querySelectorAll('.choose__date')
    calendars.forEach(calendar => new Calendar(calendar))

    const add999 = document.querySelectorAll('.added__unity')
    add999.forEach(item => new UnityPicker(item))
    
    const chosen__dates = document.querySelectorAll('.selected__date')
    chosen__dates.forEach(chosen__date => new DateManagement(chosen__date))
    

    const radioButtons = document.querySelectorAll('input[type="radio"]')
        radioButtons.forEach(radio => {
        radio.addEventListener('change', DateManagement.addDay());
    })
})