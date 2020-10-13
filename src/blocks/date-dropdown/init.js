import createCalendar from './date-dropdown';

const dateDropdownsList = document.getElementsByClassName('js-date-dropdown');

for (let i = 0; i < dateDropdownsList.length; i += 1) {
  createCalendar(dateDropdownsList[i], 'js-date-dropdown__input');
}
