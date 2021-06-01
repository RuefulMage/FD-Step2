import noUiSlider from 'nouislider';

class RangeSlider {
  constructor(slider) {
    this.slider = slider;
    this.init();
  }

  init() {
    const startValues = [+this.slider.getAttribute('data-start-low-value'),
      +this.slider.getAttribute('data-start-high-value')];
    const minValue = +this.slider.getAttribute('data-min-value');
    const maxValue = +this.slider.getAttribute('data-max-value');
    noUiSlider.create(this.slider, {
      start: startValues,
      connect: true,
      range: {
        min: minValue,
        max: maxValue,
      },
    });
    this.rangeInterval = this.slider.previousSibling.lastChild;
    this.slider.noUiSlider.on('update', this.updateFunction);
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
