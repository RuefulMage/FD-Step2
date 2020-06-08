

function createImagesSlider(element) {
    let items = element.querySelectorAll('.js-slider-item');
    let indicators = element.querySelectorAll('.js-slider-indicators');
    let currentId = 0;
    items[currentId].classList.add('apartment-description-card__image-list-item_showing');
    indicators[currentId].classList.add('apartment-description-card__indicator_current');

    let prevButton = element.querySelector('.js-slider-button-prev');
    let nextButton = element.querySelector('.js-slider-button-next');

    nextButton.addEventListener('click', function () {
        items[currentId].classList.remove('apartment-description-card__image-list-item_showing');
        indicators[currentId].classList.remove('apartment-description-card__indicator_current');
        if(currentId == (items.length - 1)){
            currentId = 0;
        } else {
            currentId ++;
        }
        items[currentId].classList.add('apartment-description-card__image-list-item_showing');
        indicators[currentId].classList.add('apartment-description-card__indicator_current');
    });

    prevButton.addEventListener('click', function () {
        items[currentId].classList.remove('apartment-description-card__image-list-item_showing');
        indicators[currentId].classList.remove('apartment-description-card__indicator_current');
        if(currentId == 0){
            currentId = items.length - 1;
        } else {
            currentId --;
        }
        items[currentId].classList.add('apartment-description-card__image-list-item_showing');
        indicators[currentId].classList.add('apartment-description-card__indicator_current');
    })
}

let sliderList = document.getElementsByClassName('js-slider');

for(let i = 0; i < sliderList.length; i++){
    createImagesSlider(sliderList[i]);
}