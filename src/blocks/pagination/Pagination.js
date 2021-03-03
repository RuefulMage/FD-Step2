class Pagination{
  static itemClass = 'js-pagination__item';

  constructor(paginationElement) {
    this.paginationElement = paginationElement;
    this.init();
  }

  init() {
    this.paginationPage = parseInt(this.paginationElement.getAttribute('data-current-page'), 10);
    const items = this.paginationElement.getElementsByClassName(Pagination.itemClass);
    for (let i = 0; i < items.length; i += 1) {
      items[i].addEventListener('click', this.handlePageButtonClick);
    }
  }

  handlePageButtonClick = (event) => {
    const go = event.currentTarget.getAttribute('data-page-number');
    if (go === '+1') {
      this.paginationPage += 1;
    } else if (go === '-1') {
      this.paginationPage -= 1;
    } else {
      this.paginationPage = parseInt(go, 10);
    }
    this.paginationElement.setAttribute('data-current-page', this.paginationPage);
  }
}
export default Pagination;
