import RangeSlider from './RangeSlider';

const slidersList = document.getElementsByClassName('js-range-slider__slider');
Array.from(slidersList).forEach((slider) => {
  (() => new RangeSlider(slider))();
});
