import createDropdown from './dropdown';

const dropdownsWithButtonsList = document.getElementsByClassName('js-dropdown_with-buttons');
for (let i = 0; i < dropdownsWithButtonsList.length; i += 1) {
  createDropdown(dropdownsWithButtonsList[i], true, true);
}

const dropdownsList = document.getElementsByClassName('js-dropdown');
for (let i = 0; i < dropdownsList.length; i += 1) {
  createDropdown(dropdownsList[i], false, false);
}
