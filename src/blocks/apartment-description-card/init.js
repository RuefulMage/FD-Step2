import ImagesSlider from './ImagesSlider';

const sliderList = document.getElementsByClassName('js-apartment-description-card__slider');
Array.from(sliderList).forEach(slider => new ImagesSlider(slider));
