class ImagesSlider{
  static sliderItemClass = 'js-apartment-description-card__slider-item';
  static indicatorsClass = 'js-apartment-description-card__indicator';
  static currentImageClass = 'apartment-description-card__slider-item_showing';
  static currentIndicatorClass = 'apartment-description-card__indicator_current';
  static prevButtonClass = 'js-apartment-description-card__prev-button';
  static nextButtonClass = 'js-apartment-description-card__next-button';

  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.items = this.element.querySelectorAll(`.${ImagesSlider.sliderItemClass}`);
    this.indicators = this.element.querySelectorAll(`.${ImagesSlider.indicatorsClass}`);
    this.currentId = 0;
    this.items[this.currentId].classList.add(ImagesSlider.currentImageClass);
    this.indicators[this.currentId].classList.add(ImagesSlider.currentIndicatorClass);
    this.prevButton = this.element.querySelector(`.${ImagesSlider.prevButtonClass}`);
    this.nextButton = this.element.querySelector(`.${ImagesSlider.nextButtonClass}`);
    this.addEventListeners();
  }

  addEventListeners() {
    this.nextButton.addEventListener('click', this.handleNextButtonClick);
    this.prevButton.addEventListener('click', this.handlePrevButtonClick);
    this.indicators.forEach((item) => {
      item.addEventListener('click', this.handleIndicatorClick);
    });
  }

  handleNextButtonClick = () => {
    this.items[this.currentId].classList.remove(ImagesSlider.currentImageClass);
    this.indicators[this.currentId].classList.remove(ImagesSlider.currentIndicatorClass);
    if (this.currentId === (this.items.length - 1)) {
      this.currentId = 0;
    } else {
      this.currentId += 1;
    }
    this.items[this.currentId].classList.add(ImagesSlider.currentImageClass);
    this.indicators[this.currentId].classList.add(ImagesSlider.currentIndicatorClass);
  }

  handlePrevButtonClick = () => {
    this.items[this.currentId].classList.remove(ImagesSlider.currentImageClass);
    this.indicators[this.currentId].classList.remove(ImagesSlider.currentIndicatorClass);
    if (this.currentId === 0) {
      this.currentId = this.items.length - 1;
    } else {
      this.currentId -= 1;
    }
    this.items[this.currentId].classList.add(ImagesSlider.currentImageClass);
    this.indicators[this.currentId].classList.add(ImagesSlider.currentIndicatorClass);
  }

  handleIndicatorClick = (event) => {
    const indicator = event.currentTarget;
    this.items[this.currentId].classList.remove(ImagesSlider.currentImageClass);
    this.indicators[this.currentId].classList.remove(ImagesSlider.currentIndicatorClass);
    this.indicators.forEach((item, index) => {
      if (item === indicator) {
        this.currentId = index;
      }
    });
    this.items[this.currentId].classList.add(ImagesSlider.currentImageClass);
    this.indicators[this.currentId].classList.add(ImagesSlider.currentIndicatorClass);
  }
}
export default ImagesSlider;
