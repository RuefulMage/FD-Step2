function createPieChart(chartElement) {
  const greatSectorElementClass = 'js-pie-chart__great';
  const badSectorElementClass = 'js-pie-chart__bad';
  const goodSectorElementClass = 'js-pie-chart__good';
  const normalSectorElementClass = 'js-pie-chart__normal';
  const sectorHoveredModifier = 'pie-chart__circle_hovered';

  const votesWrapperClass = 'js-pie-chart__votes';
  const votesElementClass = 'js-pie-chart__votes-amount';

  const greatVotesAmountModifier = 'pie-chart__votes_great';
  const badVotesAmountModifier = 'pie-chart__votes_bad';
  const goodVotesAmountModifier = 'pie-chart__votes_good';
  const normalVotesAmountModifier = 'pie-chart__votes_normal';

  const values = JSON.parse(chartElement.getAttribute('data-values'));
  const {
    great, bad, normal, good,
  } = values;

  const totalAmount = great + bad + normal + good;
  const greatPercent = (great / totalAmount) * 100;
  const badPercent = (bad / totalAmount) * 100;
  const normalPercent = (normal / totalAmount) * 100;
  const goodPercent = (good / totalAmount) * 100;

  const greatSectorElements = chartElement.querySelectorAll(`.${greatSectorElementClass}`);
  const badSectorElements = chartElement.querySelectorAll(`.${badSectorElementClass}`);
  const goodSectorElements = chartElement.querySelectorAll(`.${goodSectorElementClass}`);
  const normalSectorElements = chartElement.querySelectorAll(`.${normalSectorElementClass}`);

  const votesAmountElement = chartElement.querySelector(`.${votesElementClass}`);
  const votesAmountWrapper = chartElement.querySelector(`.${votesWrapperClass}`);

  setSectorPosition(goodSectorElements[0], goodPercent, 0);
  setSectorPosition(normalSectorElements[0], normalPercent, normalPercent);
  setSectorPosition(greatSectorElements[0], greatPercent, normalPercent + greatPercent);
  setSectorPosition(badSectorElements[0], badPercent, 100);

  hangUpMouseEventListeners(greatSectorElements, great, greatVotesAmountModifier);
  hangUpMouseEventListeners(badSectorElements, bad, badVotesAmountModifier);
  hangUpMouseEventListeners(normalSectorElements, normal, normalVotesAmountModifier);
  hangUpMouseEventListeners(goodSectorElements, good, goodVotesAmountModifier);

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
