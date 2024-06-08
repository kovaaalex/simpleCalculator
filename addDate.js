const calendars = document.querySelectorAll('.choose__date')
const month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
/*const daysInWeek = ['']*/
calendars.forEach(calendar => addCalendar(calendar))

function addCalendar(calendar){
    const today = new Date()
    let mnth = today.getMonth()
    let year = today.getFullYear()
    let firstDayOfMonth = new Date(year, mnth, 1).getDay()
    let lastDayOfMonth = new Date(year, mnth+ 1, 0).getDate()
    let dayOfWeek = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Adjust to start week on Monday
    calendar.innerHTML += 
    `<table>
        <th colspan="7">${month[mnth]}</th>
        <tr>
            <td>Пн</td>
            <td>Вт</td>
            <td>Ср</td>
            <td>Чт</td>
            <td>Пт</td>
            <td>Сб</td>
            <td>Вс</td>
        </tr>

    </table>`

    for (let i = 0; i < dayOfWeek; i++) {
        calendarHTML += `<td></td>`;
    }
}

function addddd(){

}