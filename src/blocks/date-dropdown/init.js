import DateDropdown from './DateDropdown';

const dateDropdownsList = document.getElementsByClassName('js-date-dropdown');
Array.from(dateDropdownsList).forEach((dropdown) => new DateDropdown(dropdown, 'js-date-dropdown__input'));
