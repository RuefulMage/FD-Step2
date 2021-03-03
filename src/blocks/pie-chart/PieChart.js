class PieChart{
  static sectorClass = 'js-pie-chart__circle';
  static sectorHoveredModifier = 'pie-chart__circle_hovered';
  static gradientIdBasis = 'gradient-color-';
  static votesWrapperClass = 'js-pie-chart__votes';
  static votesElementClass = 'js-pie-chart__votes-amount';
  static bulletClass = 'js-pie-chart__list-item';

  constructor(chartElement) {
    this.chartElement = chartElement;
    this.init();
  }

  init(){
    this.totalAmount = +this.chartElement.getAttribute('data-amount');
    this.votesAmountElement = this.chartElement.querySelector(`.${PieChart.votesElementClass}`);
    this.votesAmountWrapper = this.chartElement.querySelector(`.${PieChart.votesWrapperClass}`);
    this.votesAmountElement.innerText = this.totalAmount;
    this.sectors = this.chartElement.querySelectorAll(`.${PieChart.sectorClass}`);
    this.bullets = this.chartElement.querySelectorAll(`.${PieChart.bulletClass}`);
    this.initSectors();
  };

  initSectors(){
    let offset = 0;
    this.sectors.forEach((sector, index) => {
      const amount = +sector.getAttribute('data-amount');
      const sectorPercent = (amount / this.totalAmount) * 100;
      if (index !== 0) {
        offset += sectorPercent;
      }
      this.setSectorPosition(sector, sectorPercent, offset);
      const bullet = this.bullets[index];
      const gradientElement = document.querySelector(`#${PieChart.gradientIdBasis + (index + 1)}`);
      const startColor = gradientElement.children[0].getAttribute('stop-color');
      const endColor = gradientElement.children[1].getAttribute('stop-color');
      this.hangUpMouseEventListeners([sector, bullet], amount, startColor, endColor);
      this.addColorToBullet(bullet, startColor, endColor);
    });
  }

  setSectorPosition(element, percent, offsetPercent) {
    const pi = 22 / 7;
    const radius = element.getAttribute('r');
    const circumference = 2 * pi * radius;
    let sectionLength = circumference * (percent / 100);
    let restLength = circumference * ((100 - percent) / 100);
    const offsetLength = circumference * (offsetPercent / 100) - 1;
    if (sectionLength !== 0) {
      sectionLength -= 2;
    }
    if (restLength !== 0) {
      restLength += 2;
    }
    element.setAttribute('stroke-dasharray', `${sectionLength},${restLength}`);
    element.setAttribute('stroke-dashoffset', offsetLength);
  }

  hangUpMouseEventListeners(elements, amount, startColor, endColor){
    const sector = elements[0];

    const handleMouseOver = () => {
      sector.classList.add(PieChart.sectorHoveredModifier);
      this.votesAmountElement.innerText = amount;
      this.votesAmountWrapper.style.background = `linear-gradient(${startColor}, ${endColor})`;
      this.votesAmountWrapper.style.webkitBackgroundClip = 'text';
      this.votesAmountWrapper.style.webkitTextFillColor = 'transparent';
    }

    const handleMouseOut = () => {
      sector.classList.remove(PieChart.sectorHoveredModifier);
      this.votesAmountElement.innerText = this.totalAmount;
      this.votesAmountWrapper.style = '';
    }

    elements.forEach((item) => item.addEventListener('mouseover', handleMouseOver));
    elements.forEach((item) => item.addEventListener('mouseout', handleMouseOut));
  }

  addColorToBullet(bullet, startColor, endColor) {
    const bulletPointer = bullet.children[0];
    bulletPointer.style.background = `linear-gradient(${startColor}, ${endColor})`;
  }
}

export default PieChart;
