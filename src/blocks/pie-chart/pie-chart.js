function createPieChart(chartElement) {
  const sectorClass = 'js-pie-chart__circle';
  const sectorHoveredModifier = 'pie-chart__circle_hovered';

  const votesWrapperClass = 'js-pie-chart__votes';
  const votesElementClass = 'js-pie-chart__votes-amount';

  const bulletClass = 'js-pie-chart__bullet';
  const votesModifierBasis = 'pie-chart__votes_';

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

    hangUpMouseEventListeners([sector, bullet], amount,
      `${votesModifierBasis + ((index % 4) + 1)}`);
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

  function hangUpMouseEventListeners(elements, amount, amountElementModifier) {
    const sector = elements[0];

    function handleMouseOver() {
      sector.classList.add(sectorHoveredModifier);
      votesAmountElement.innerText = amount;
      votesAmountWrapper.classList.add(amountElementModifier);
    }

    function handleMouseOut() {
      sector.classList.remove(sectorHoveredModifier);
      votesAmountElement.innerText = totalAmount;
      votesAmountWrapper.classList.remove(amountElementModifier);
    }

    elements.forEach((item) => item.addEventListener('mouseover', handleMouseOver));
    elements.forEach((item) => item.addEventListener('mouseout', handleMouseOut));
  }
}

export default createPieChart;
