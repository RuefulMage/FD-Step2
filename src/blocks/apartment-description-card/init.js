import createImagesSlider from "./apartment-description-card";

let sliderList = document.getElementsByClassName('js-slider');

for(let i = 0; i < sliderList.length; i++){
    createImagesSlider(sliderList[i]);
}