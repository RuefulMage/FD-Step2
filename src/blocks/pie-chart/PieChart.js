class PieChart {
  static sectorClass = 'js-pie-chart__sector';

  static sectorHoveredModifier = 'pie-chart__sector_hovered';

  static gradientIdBasis = 'gradient-color-';

  static votesWrapperClass = 'js-pie-chart__votes-wrapper';

  static votesElementClass = 'js-pie-chart__votes-amount';

  static bulletClass = 'js-pie-chart__bullet';

  constructor(chartElement) {
    this.pieChart = chartElement;
    this.init();
  }

  init() {
    this.totalAmount = +this.pieChart.getAttribute('data-amount');
    this.votesAmountElement = this.pieChart.querySelector(`.${PieChart.votesElementClass}`);
    this.votesWrapper = this.pieChart.querySelector(`.${PieChart.votesWrapperClass}`);
    this.votesAmountElement.innerText = this.totalAmount;
    this.sectors = this.pieChart.querySelectorAll(`.${PieChart.sectorClass}`);
    this.bullets = this.pieChart.querySelectorAll(`.${PieChart.bulletClass}`);
    this.initSectors();
  }

  initSectors() {
    let offset = 0;
    this.sectors.forEach((sector, index) => {
      const amount = +sector.getAttribute('data-amount');
      const sectorPercent = (amount / this.totalAmount) * 100;
      if (index !== 0) {
        offset += sectorPercent;
      }
      PieChart.setSectorPosition(sector, sectorPercent, offset);
      const bullet = this.bullets[index];
      const gradientElement = document.querySelector(`#${PieChart.gradientIdBasis + (index + 1)}`);
      const startColor = gradientElement.children[0].getAttribute('stop-color');
      const endColor = gradientElement.children[1].getAttribute('stop-color');
      this.hangUpMouseEventListeners([sector, bullet], amount, startColor, endColor);
      PieChart.addColorToBullet(bullet, startColor, endColor);
    });
  }

  hangUpMouseEventListeners(elements, amount, startColor, endColor) {
    const sector = elements[0];

    const handleMouseOver = () => {
      sector.classList.add(PieChart.sectorHoveredModifier);
      this.votesAmountElement.innerText = amount;
      this.votesWrapper.style.background = `linear-gradient(${startColor}, ${endColor})`;
      this.votesWrapper.style.webkitBackgroundClip = 'text';
      this.votesWrapper.style.webkitTextFillColor = 'transparent';
    };

    const handleMouseOut = () => {
      sector.classList.remove(PieChart.sectorHoveredModifier);
      this.votesAmountElement.innerText = this.totalAmount;
      this.votesWrapper.style = '';
    };

    elements.forEach((item) => item.addEventListener('mouseover', handleMouseOver));
    elements.forEach((item) => item.addEventListener('mouseout', handleMouseOut));
  }

  static setSectorPosition(element, percent, offsetPercent) {
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

  static addColorToBullet(bullet, startColor, endColor) {
    const bulletPointer = bullet.children[0];
    bulletPointer.style.background = `linear-gradient(${startColor}, ${endColor})`;
  }
}

export default PieChart;
