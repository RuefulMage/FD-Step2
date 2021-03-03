class ShowFormButton {
  static filterClass = 'js-search__filter-column';
  static filterHiddenClass = 'search__filter-column_hidden';


  constructor(buttonElement) {
    this.buttonElement = buttonElement;
    this.init();
  }

  init() {
    this.filterElement = this.buttonElement.parentElement
      .querySelector(`.${ShowFormButton.filterClass}`);
    this.buttonElement.addEventListener('click', this.handleFilterButtonClick);
    if (document.body.clientWidth <= 880) {
      this.filterElement.classList.add(ShowFormButton.filterHiddenClass);
    }
    this.addWindowResizeHandler();
  }

  handleFilterButtonClick = () => {
    if (this.filterElement.classList.contains(ShowFormButton.filterHiddenClass)) {
      this.filterElement.classList.remove(ShowFormButton.filterHiddenClass);
    } else {
      this.filterElement.classList.add(ShowFormButton.filterHiddenClass);
    }
  }

  addWindowResizeHandler() {
    const handleWindowResize = () => {
      if (document.body.clientWidth >= 880) {
        this.filterElement.classList.remove(ShowFormButton.filterHiddenClass);
      }
    }
    window.addEventListener('resize', handleWindowResize);
  }

}

export default ShowFormButton;
