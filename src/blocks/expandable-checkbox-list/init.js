import ExpandableCheckboxList from './ExpandableCheckboxList';

const checkboxListButtons = document.getElementsByClassName('js-expandable-checkbox-list__button');
for (let i = 0; i < checkboxListButtons.length; i += 1) {
  new ExpandableCheckboxList(checkboxListButtons[i]);
}
