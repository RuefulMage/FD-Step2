function initShowFormButton(buttonElement) {
  const filterClass = 'js-search__filter-column';
  const filterHiddenClass = 'search__filter-column_hidden';
  const filterElement = buttonElement.parentElement
    .querySelector(`.${filterClass}`);
  buttonElement.addEventListener('click', handleFilterButtonClick);
  if (document.body.clientWidth <= 880) {
    filterElement.classList.add(filterHiddenClass);
  }
  addWindowResizeHandler(filterElement);

  function handleFilterButtonClick() {
    if (filterElement.classList.contains(filterHiddenClass)) {
      filterElement.classList.remove(filterHiddenClass);
    } else {
      filterElement.classList.add(filterHiddenClass);
    }
  }
}

function addWindowResizeHandler(filterElement) {
  window.addEventListener('resize', handleWindowResize);

  function handleWindowResize() {
    const filterHiddenClass = 'search__filter-column_hidden';
    if (document.body.clientWidth >= 880) {
      filterElement.classList.remove(filterHiddenClass);
    }
  }
}

const buttonsList = document.getElementsByClassName('js-search__show-filter-button');
for (let i = 0; i < buttonsList.length; i += 1) {
  initShowFormButton(buttonsList[i]);
}
