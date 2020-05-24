import noUiSlider from "nouislider";

let slidersList = document.getElementsByClassName('range-slider__slider');
let i;


for(i=0; i < slidersList.length; i++){
    let slider = slidersList[i];
    noUiSlider.create(slider, {
        start: [5000, 10000],
        connect: true,
        range: {
            'min': 500,
            'max': 15000
        }
    });

    let rangeInterval = slider.previousSibling.lastChild;

    slider.noUiSlider.on('update', function (values, handle) {
        values = values.map(item => Math.round(item));
        rangeInterval.innerHTML = values[0] + "₽ - " + values[1] +"₽";
    });

}
