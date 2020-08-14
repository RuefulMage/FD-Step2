function hangUpListenerToPagination(paginationElement) {
    const itemClass = 'js-pagination__item';

    let paginationPage = parseInt(paginationElement.getAttribute('data-current-page'), 10);
    let items = paginationElement.getElementsByClassName(itemClass);


    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', clickHandler);
    }

    function clickHandler() {
        let go = this.getAttribute('data-page-number');
        if (go === '+1') {
            paginationPage++;
        } else if (go === '-1') {
            paginationPage--;
        }else{
            paginationPage = parseInt(go, 10);
        }
        paginationElement.setAttribute('data-current-page', paginationPage)
    }
}

export default hangUpListenerToPagination;