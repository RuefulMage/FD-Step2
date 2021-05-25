import Dropdown from './Dropdown';

const dropdownsWithButtonsList = document.getElementsByClassName('js-dropdown_with-buttons');
Array.from(dropdownsWithButtonsList).forEach(dropdown => {
  new Dropdown(dropdown, true);
});

const dropdownsList = document.getElementsByClassName('js-dropdown');
Array.from(dropdownsList).forEach(dropdown => {
  new Dropdown(dropdown, false);
});
