function hangUpListenerToExpandableList(checkboxListButton) {
  const rotatedArrowClass = 'expandable-checkbox-list__arrow_rotated';
  const expandedListClass = 'expandable-checkbox-list__list_expanded';

  checkboxListButton.addEventListener('click', handleClick);

  function handleClick(event) {
    event.preventDefault();
    let checkboxList = this.nextElementSibling;
    let icon = this.lastChild;
    if (checkboxList.classList.contains(expandedListClass)) {
      checkboxList.classList.remove(expandedListClass);
      icon.classList.remove(rotatedArrowClass);
    } else {
      checkboxList.classList.add(expandedListClass);
      icon.classList.add(rotatedArrowClass);
    }
  }
}

export default hangUpListenerToExpandableList;