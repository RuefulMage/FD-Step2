import DateDropdown from "./DateDropdown";

const dateDropdownsList = document.getElementsByClassName('js-date-dropdown');
for (let i = 0; i < dateDropdownsList.length; i += 1) {
  new DateDropdown(dateDropdownsList[i], 'js-date-dropdown__input');
}
