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

    let amountInProcent = sum / 100;
    let halfsBetweenMargin = (((great + bad) === 0) || ((good + normal) === 0)) ? 0 : 1.6;
    let leftHalfInProcent = (great / amountInProcent) + (bad / amountInProcent) - halfsBetweenMargin/2;
    let rightHalfInProcent = 100 - leftHalfInProcent - halfsBetweenMargin/2;
    chartElement.querySelector('.' + firstHalfClass).style.width = leftHalfInProcent + '%';
    chartElement.querySelector('.' + secondHalfClass).style.width = rightHalfInProcent + '%';


    let greatAndBadBetweenMargin = ((great === 0) || (bad === 0)) ? 0 : 1.6;

    let rightHalfSum = great + bad;
    let rightHalfAmountInProcent = rightHalfSum / 100;
    let greatPartOfHalf = (great / rightHalfAmountInProcent) - greatAndBadBetweenMargin/2;
    let badPartOfHalf = (bad / rightHalfAmountInProcent) - greatAndBadBetweenMargin/2;
    chartElement.querySelector('.' + greatClass).style.height = greatPartOfHalf + '%';
    chartElement.querySelector('.' + badClass).style.height = badPartOfHalf + '%';


    let goodAndNormalBetweenMargin = ((good === 0) || (normal === 0)) ? 0 : 1.6;
    let leftHalfSum = good + normal;
    let leftHalfAmountInProcent = leftHalfSum / 100;
    let normalPartOfHalf = (normal / leftHalfAmountInProcent) - goodAndNormalBetweenMargin/2;
    let goodPartOfHalf = (good / leftHalfAmountInProcent) - goodAndNormalBetweenMargin/2;
    chartElement.querySelector('.' + goodClass).style.height = goodPartOfHalf + '%';
    chartElement.querySelector('.' + normalClass).style.height = normalPartOfHalf + '%';
}

export default initPieChart;