import ExpandableCheckboxList from './ExpandableCheckboxList';

const checkboxListButtons = document.getElementsByClassName('js-expandable-checkbox-list__button');
Array.from(checkboxListButtons).forEach(checkbox => {
  new ExpandableCheckboxList(checkboxListButtons[i]);
});
