function createImagesSlider(element) {
    const sliderItemClass = 'js-slider-item';
    const indicatorsClass = 'js-slider-indicators'
    const currentImageClass = 'apartment-description-card__image-list-item_showing';
    const currentIndicatorClass = 'apartment-description-card__indicator_current';
    const prevButtonClass = 'js-slider-button-prev';
    const nextButtonClass = 'js-slider-button-next';

    let items = element.querySelectorAll('.' + sliderItemClass);
    let indicators = element.querySelectorAll('.' + indicatorsClass);
    let currentId = 0;
    items[currentId].classList.add(currentImageClass);
    indicators[currentId].classList.add(currentIndicatorClass);

    let prevButton = element.querySelector('.' + prevButtonClass);
    let nextButton = element.querySelector('.' + nextButtonClass);

    nextButton.addEventListener('click', nextButtonClickHandler);

    prevButton.addEventListener('click', prevButtonClickHandler);

    function nextButtonClickHandler() {
        items[currentId].classList.remove(currentImageClass);
        indicators[currentId].classList.remove(currentIndicatorClass);
        if(currentId === (items.length - 1)){
            currentId = 0;
        } else {
            currentId ++;
        }
        items[currentId].classList.add(currentImageClass);
        indicators[currentId].classList.add(currentIndicatorClass);
    }


    function prevButtonClickHandler() {
        items[currentId].classList.remove(currentImageClass);
        indicators[currentId].classList.remove(currentIndicatorClass);
        if(currentId === 0){
            currentId = items.length - 1;
        } else {
            currentId --;
        }
        items[currentId].classList.add(currentImageClass);
        indicators[currentId].classList.add(currentIndicatorClass);
    }
}

export default createImagesSlider;