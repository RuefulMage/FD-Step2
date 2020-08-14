import noUiSlider from "nouislider";

function createRangeSlider(sliderElement, startValues, minValue, maxValue) {
    noUiSlider.create(sliderElement, {
        start: startValues,
        connect: true,
        range: {
            'min': minValue,
            'max': maxValue
        }
    });

    let rangeInterval = sliderElement.previousSibling.lastChild;

    sliderElement.noUiSlider.on('update', updateFunction);

    function updateFunction(values, handle) {
        values = values.map(item => Math.round(item));
        rangeInterval.innerHTML = values[0] + "₽ - " + values[1] +"₽";
    }

}

export default createRangeSlider;