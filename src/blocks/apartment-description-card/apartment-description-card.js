function createImagesSlider(element) {
  const sliderItemClass = 'js-apartment-description-card__slider-item';
  const indicatorsClass = 'js-apartment-description-card__indicator';
  const currentImageClass = 'apartment-description-card__slider-item_showing';
  const currentIndicatorClass = 'apartment-description-card__indicator_current';
  const prevButtonClass = 'js-apartment-description-card__prev-button';
  const nextButtonClass = 'js-apartment-description-card__next-button';

  const items = element.querySelectorAll(`.${sliderItemClass}`);
  const indicators = element.querySelectorAll(`.${indicatorsClass}`);
  let currentId = 0;
  items[currentId].classList.add(currentImageClass);
  indicators[currentId].classList.add(currentIndicatorClass);

  const prevButton = element.querySelector(`.${prevButtonClass}`);
  const nextButton = element.querySelector(`.${nextButtonClass}`);

  nextButton.addEventListener('click', handleNextButtonClick);

  prevButton.addEventListener('click', handlePrevButtonClick);

  function handleNextButtonClick() {
    items[currentId].classList.remove(currentImageClass);
    indicators[currentId].classList.remove(currentIndicatorClass);
    if (currentId === (items.length - 1)) {
      currentId = 0;
    } else {
      currentId += 1;
    }
    items[currentId].classList.add(currentImageClass);
    indicators[currentId].classList.add(currentIndicatorClass);
  }

  function handlePrevButtonClick() {
    items[currentId].classList.remove(currentImageClass);
    indicators[currentId].classList.remove(currentIndicatorClass);
    if (currentId === 0) {
      currentId = items.length - 1;
    } else {
      currentId -= 1;
    }
    items[currentId].classList.add(currentImageClass);
    indicators[currentId].classList.add(currentIndicatorClass);
  }
  function handleIndicatorClick(event) {
    const indicator = event.currentTarget;
    items[currentId].classList.remove(currentImageClass);
    indicators[currentId].classList.remove(currentIndicatorClass);

    indicators.forEach((item, index) => {
      if (item === indicator) {
        currentId = index;
      }
    });
    items[currentId].classList.add(currentImageClass);
    indicators[currentId].classList.add(currentIndicatorClass);
  }

  indicators.forEach((item) => {
    item.addEventListener('click', handleIndicatorClick);
  });
}

export default createImagesSlider;
