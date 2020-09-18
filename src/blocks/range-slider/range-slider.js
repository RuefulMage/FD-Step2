import noUiSlider from 'nouislider';

function createRangeSlider(sliderElement, startValues, minValue, maxValue) {
  noUiSlider.create(sliderElement, {
    start: startValues,
    connect: true,
    range: {
      min: minValue,
      max: maxValue,
    },
  });

  const rangeInterval = sliderElement.previousSibling.lastChild;

  sliderElement.noUiSlider.on('update', updateFunction);

  function updateFunction(values) {
    const resultValues = values.map((item1) => {
      let outputValue = Math.round(item1);
      if (outputValue >= 1000) {
        outputValue = outputValue.toString();
        const borderIndex = outputValue.length - 3;

        outputValue = `${outputValue.slice(0, borderIndex)} ${outputValue.slice(borderIndex)}`;
      }

      return outputValue;
    });
    rangeInterval.innerHTML = `${resultValues[0]}₽ - ${resultValues[1]}₽`;
  }
}

export default createRangeSlider;
