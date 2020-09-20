import createRangeSlider from './range-slider';

const slidersList = document.getElementsByClassName('js-range-slider__slider');

for (let i = 0; i < slidersList.length; i += 1) {
  createRangeSlider(slidersList[i]);
}
