import createDropdown from "./dropdown";

let dropdownsWithButtonsList = document.getElementsByClassName('js-dropdown-with-buttons');
for( let i = 0; i < dropdownsWithButtonsList.length; i++) {
    createDropdown(dropdownsWithButtonsList[i] ,true, false);
}

let dropdownsList = document.getElementsByClassName('js-dropdown');
for( let i = 0; i < dropdownsList.length; i++) {
    createDropdown(dropdownsList[i],false, true);
}