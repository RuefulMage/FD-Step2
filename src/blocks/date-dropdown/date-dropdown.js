import createCalendar from "../calendar/calendar";


let dateDropdownsList = document.getElementsByClassName('js-date-dropdown');

for(let i = 0; i < dateDropdownsList.length; i++){
    createCalendar(dateDropdownsList[i]);
}

let calendarList = document.getElementsByClassName('calendar');

for(let i = 0; i < calendarList.length; i++){
    createCalendar(calendarList[i]);
}