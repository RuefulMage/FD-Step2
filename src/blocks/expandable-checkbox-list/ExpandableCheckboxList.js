class ExpandableCheckboxList {
  static rotatedArrowClass = 'expandable-checkbox-list__arrow_rotated';

  static expandedListClass = 'expandable-checkbox-list__list_expanded';

  constructor(checkboxListButton) {
    this.checkboxListButton = checkboxListButton;
    this.addListener();
  }

  handleButtonClick = (event) => {
    event.preventDefault();
    const checkboxList = this.checkboxListButton.nextElementSibling;
    const icon = this.checkboxListButton.lastChild;
    if (checkboxList.classList.contains(ExpandableCheckboxList.expandedListClass)) {
      checkboxList.classList.remove(ExpandableCheckboxList.expandedListClass);
      icon.classList.remove(ExpandableCheckboxList.rotatedArrowClass);
    } else {
      checkboxList.classList.add(ExpandableCheckboxList.expandedListClass);
      icon.classList.add(ExpandableCheckboxList.rotatedArrowClass);
    }
  }

  addListener = () => {
    this.checkboxListButton.addEventListener('click', this.handleButtonClick);
  }
}

export default ExpandableCheckboxList;
