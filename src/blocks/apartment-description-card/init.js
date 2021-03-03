import ImagesSlider from './ImagesSlider';

const sliderList = document.getElementsByClassName('js-apartment-description-card__slider');
for (let i = 0; i < sliderList.length; i += 1) {
  new ImagesSlider(sliderList[i]);
}
