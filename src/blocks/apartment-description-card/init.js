import createImagesSlider from './apartment-description-card';

const sliderList = document.getElementsByClassName('js-slider');

for (let i = 0; i < sliderList.length; i += 1) {
  createImagesSlider(sliderList[i]);
}
