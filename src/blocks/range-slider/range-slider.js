import noUiSlider from 'nouislider';

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
        values = values.map(item => {
            item = Math.round(item);
            if( item >= 1000 ){
                item = item.toString();
                let borderIndex = item.length - 3;

                item = item.slice(0,borderIndex) + ' ' + item.slice(borderIndex);
            }

            return item;
        });
        rangeInterval.innerHTML = values[0] + '₽ - ' + values[1] +'₽';
    }

}

export default createRangeSlider;