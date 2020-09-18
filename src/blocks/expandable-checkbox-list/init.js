import hangUpListenerToExpandableList from './expandable-checkbox-list';

const checkboxListButtons = document.getElementsByClassName('js-expandable-checkbox-list__button');

for (let i = 0; i < checkboxListButtons.length; i += 1) {
  hangUpListenerToExpandableList(checkboxListButtons[i]);
}
