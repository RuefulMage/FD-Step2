import createCalendar from './date-dropdown';


let dateDropdownsList = document.getElementsByClassName('js-date-dropdown');
console.log(dateDropdownsList);

for(let i = 0; i < dateDropdownsList.length; i++){
    createCalendar(dateDropdownsList[i]);
}