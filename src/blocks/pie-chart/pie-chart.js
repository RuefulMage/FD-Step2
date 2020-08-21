function initPieChart(chartElement) {
    const sumClass = 'js-pie-chart__sum';
    const firstHalfClass = 'js-pie-chart__first-half';
    const secondHalfClass = 'js-pie-chart__second-half';
    const greatClass = 'js-pie-chart__great';
    const badClass = 'js-pie-chart__bad';
    const goodClass = 'js-pie-chart__good';
    const normalClass = 'js-pie-chart__normal';

    let values = JSON.parse(chartElement.getAttribute('data-values'));
    let {great, bad, good, normal} = values;
    let sum = great + bad + good + normal;
    let center = chartElement.querySelector('.' + sumClass);

    center.innerText = sum;

    let amountInPercents = sum / 100;
    let halfBetweenMargin = (((great + bad) === 0) || ((good + normal) === 0)) ? 0 : 1.6;
    let leftHalfInPercents = (great / amountInPercents) + (bad / amountInPercents) - halfBetweenMargin/2;
    let rightHalfInPercents = 100 - leftHalfInPercents - halfBetweenMargin/2;
    chartElement.querySelector('.' + firstHalfClass).style.width = leftHalfInPercents + '%';
    chartElement.querySelector('.' + secondHalfClass).style.width = rightHalfInPercents + '%';


    let greatAndBadBetweenMargin = ((great === 0) || (bad === 0)) ? 0 : 1.6;

    let rightHalfSum = great + bad;
    let rightHalfAmountInPercents = rightHalfSum / 100;
    let greatPartOfHalf = (great / rightHalfAmountInPercents) - greatAndBadBetweenMargin/2;
    let badPartOfHalf = (bad / rightHalfAmountInPercents) - greatAndBadBetweenMargin/2;
    chartElement.querySelector('.' + greatClass).style.height = greatPartOfHalf + '%';
    chartElement.querySelector('.' + badClass).style.height = badPartOfHalf + '%';


    let goodAndNormalBetweenMargin = ((good === 0) || (normal === 0)) ? 0 : 1.6;
    let leftHalfSum = good + normal;
    let leftHalfAmountInPercents = leftHalfSum / 100;
    let normalPartOfHalf = (normal / leftHalfAmountInPercents) - goodAndNormalBetweenMargin/2;
    let goodPartOfHalf = (good / leftHalfAmountInPercents) - goodAndNormalBetweenMargin/2;
    chartElement.querySelector('.' + goodClass).style.height = goodPartOfHalf + '%';
    chartElement.querySelector('.' + normalClass).style.height = normalPartOfHalf + '%';
}

export default initPieChart;