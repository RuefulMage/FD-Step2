class Pagination {
  static pagesWrapperClass = 'js-pagination__pages-wrapper'

  constructor(paginationElement) {
    this.paginationElement = paginationElement;
    this.init();
  }

  init() {
    this.pagesWrapper = this.paginationElement.querySelector(`.${Pagination.pagesWrapperClass}`)
    this.page = parseInt(this.paginationElement.getAttribute('data-current-page'), 10);
    this.addListener();
  }

  addListener = () => {
    this.pagesWrapper.addEventListener('click', this.handlePagesWrapperClick);
  }

  handlePagesWrapperClick = (event) => {
    const go = event.target.getAttribute('data-page-number') || null;
    if (go === '+1') {
      this.page += 1;
    } else if (go === '-1') {
      this.page -= 1;
    } else if (go !== null) {
      this.page = parseInt(go, 10);
    }
    this.paginationElement.setAttribute('data-current-page', this.page);
  }
}

export default Pagination;
