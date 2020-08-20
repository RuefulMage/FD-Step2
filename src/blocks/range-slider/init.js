import createRangeSlider from './range-slider';

let slidersList = document.getElementsByClassName('range-slider__slider');

for (let i = 0; i < slidersList.length; i++) {
    createRangeSlider(slidersList[i], [5000, 10000], 500, 15000);
}