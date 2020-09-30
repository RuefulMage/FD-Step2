function createPieChart(chartElement) {
  const sectorClass = 'js-pie-chart__circle';
  const sectorHoveredModifier = 'pie-chart__circle_hovered';
  const gradientIdBasis = 'gradient-color-';

  const votesWrapperClass = 'js-pie-chart__votes';
  const votesElementClass = 'js-pie-chart__votes-amount';

  const bulletClass = 'js-pie-chart__list-item';

  const totalAmount = +chartElement.getAttribute('data-amount');

  const votesAmountElement = chartElement.querySelector(`.${votesElementClass}`);
  const votesAmountWrapper = chartElement.querySelector(`.${votesWrapperClass}`);

  votesAmountElement.innerText = totalAmount;

  const sectors = chartElement.querySelectorAll(`.${sectorClass}`);
  const bullets = chartElement.querySelectorAll(`.${bulletClass}`);

  let offset = 0;
  sectors.forEach((sector, index) => {
    const amount = +sector.getAttribute('data-amount');
    const sectorPercent = (amount / totalAmount) * 100;
    if (index !== 0) {
      offset += sectorPercent;
    }
    setSectorPosition(sector, sectorPercent, offset);

    const bullet = bullets[index];

    const gradientElement = document.querySelector(`#${gradientIdBasis + (index + 1)}`);
    const startColor = gradientElement.children[0].getAttribute('stop-color');
    const endColor = gradientElement.children[1].getAttribute('stop-color');

    hangUpMouseEventListeners([sector, bullet], amount, startColor, endColor);
    addColorToBullet(bullet, startColor, endColor);
  });

  function setSectorPosition(element, percent, offsetPercent) {
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

  function hangUpMouseEventListeners(elements, amount, startColor, endColor) {
    const sector = elements[0];

    function handleMouseOver() {
      sector.classList.add(sectorHoveredModifier);
      votesAmountElement.innerText = amount;
      votesAmountWrapper.style.background = `linear-gradient(${startColor}, ${endColor})`;
      votesAmountWrapper.style.webkitBackgroundClip = 'text';
      votesAmountWrapper.style.webkitTextFillColor = 'transparent';
    }

    function handleMouseOut() {
      sector.classList.remove(sectorHoveredModifier);
      votesAmountElement.innerText = totalAmount;
      votesAmountWrapper.style = '';
    }

    elements.forEach((item) => item.addEventListener('mouseover', handleMouseOver));
    elements.forEach((item) => item.addEventListener('mouseout', handleMouseOut));
  }

  function addColorToBullet(bullet, startColor, endColor) {
    const bulletPointer = bullet.children[0];
    bulletPointer.style.background = `linear-gradient(${startColor}, ${endColor})`;
  }
}

export default createPieChart;
