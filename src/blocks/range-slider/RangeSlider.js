import noUiSlider from 'nouislider';

class RangeSlider {
  constructor(sliderElement) {
    this.sliderElement = sliderElement;
    this.init();
  }

  init() {
    const startValues = [+this.sliderElement.getAttribute('data-start-low-value'),
      +this.sliderElement.getAttribute('data-start-high-value')];
    const minValue = +this.sliderElement.getAttribute('data-min-value');
    const maxValue = +this.sliderElement.getAttribute('data-max-value');
    noUiSlider.create(this.sliderElement, {
      start: startValues,
      connect: true,
      range: {
        min: minValue,
        max: maxValue,
      },
    });
    this.rangeInterval = this.sliderElement.previousSibling.lastChild;
    this.sliderElement.noUiSlider.on('update', this.updateFunction);
  }

  updateFunction = (values) => {
    const resultValues = values.map((item1) => {
      let outputValue = Math.round(item1);
      if (outputValue >= 1000) {
        outputValue = outputValue.toString();
        const borderIndex = outputValue.length - 3;
        outputValue = `${outputValue.slice(0, borderIndex)}&nbsp;${outputValue.slice(borderIndex)}`;
      }
      return outputValue;
    });
    this.rangeInterval.innerHTML = `${resultValues[0]}₽ - ${resultValues[1]}₽`;
  }
}

export default RangeSlider;
