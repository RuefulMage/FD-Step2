function initShowFormButton(buttonElement) {
  const filterClass = 'js-search__filter-column';
  const filterHiddenClass = 'search__filter-column_hidden';
  const filterElement = buttonElement.parentElement
    .querySelector(`.${filterClass}`);
  buttonElement.addEventListener('click', buttonClickHandler);
  if (document.body.clientWidth <= 880) {
    filterElement.classList.add(filterHiddenClass);
  }
  filterResizeHandler(filterElement);

  function buttonClickHandler() {
    if (filterElement.classList.contains(filterHiddenClass)) {
      filterElement.classList.remove(filterHiddenClass);
    } else {
      filterElement.classList.add(filterHiddenClass);
    }
  }
}

function filterResizeHandler(filterElement) {
  window.addEventListener('resize', resizeHandler);

  function resizeHandler() {
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
