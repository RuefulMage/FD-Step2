class FilterForm {
  static filterClass = 'js-search__filter-column';

  static filterHiddenClass = 'search__filter-column_hidden';

  constructor(filterButton) {
    this.filterButton = filterButton;
    this.init();
  }

  init() {
    this.filterColumn = this.filterButton.parentElement
      .querySelector(`.${FilterForm.filterClass}`);
    this.filterButton.addEventListener('click', this.handleFilterButtonClick);
    if (document.body.clientWidth <= 880) {
      this.filterColumn.classList.add(FilterForm.filterHiddenClass);
    }
    this.addWindowResizeHandler();
  }

  handleFilterButtonClick = () => {
    this.filterColumn.classList.toggle(FilterForm.filterHiddenClass);
  }

  addWindowResizeHandler() {
    const handleWindowResize = () => {
      if (document.body.clientWidth >= 880) {
        this.filterColumn.classList.remove(FilterForm.filterHiddenClass);
      }
    };
    window.addEventListener('resize', handleWindowResize);
  }
}

export default FilterForm;
