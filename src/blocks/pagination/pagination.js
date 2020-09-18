function hangUpListenerToPagination(paginationElement) {
  const itemClass = 'js-pagination__item';

  let paginationPage = parseInt(paginationElement.getAttribute('data-current-page'), 10);
  const items = paginationElement.getElementsByClassName(itemClass);

  for (let i = 0; i < items.length; i += 1) {
    items[i].addEventListener('click', clickHandler);
  }

  function clickHandler() {
    const go = this.getAttribute('data-page-number');
    if (go === '+1') {
      paginationPage += 1;
    } else if (go === '-1') {
      paginationPage -= 1;
    } else {
      paginationPage = parseInt(go, 10);
    }
    paginationElement.setAttribute('data-current-page', paginationPage);
  }
}

export default hangUpListenerToPagination;
