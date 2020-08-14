import hangUpListenerToExpandableList from "./expandable-checkbox-list";

let checkboxListButtons = document.getElementsByClassName("js-expandable-checkbox-list__button");

for (let i = 0; i < checkboxListButtons.length; i++) {
    hangUpListenerToExpandableList(checkboxListButtons[i]);
}