let element = document.getElementsByClassName('pie-chart')[0];
let values = JSON.parse(element.getAttribute('data-values'));
let {great, bad, good, normal} = values;
let sum = great + bad + good + normal;
let center = element.querySelector('.pie-chart__sum');
center.innerText = sum;


let amountInProcent = sum / 100;
let halfsBetweenMargin = (((great + bad) == 0) || ((good + normal) == 0)) ? 0 : 1.6;;
let leftHalfInProcent = (great / amountInProcent) + (bad / amountInProcent) - halfsBetweenMargin/2;
let rightHalfInProcent = 100 - leftHalfInProcent - halfsBetweenMargin/2;
element.querySelector('.pie-chart__first-half').style.width = leftHalfInProcent + '%';
element.querySelector('.pie-chart__second-half').style.width = rightHalfInProcent + '%';




let greatAndBadBetweenMargin = ((great == 0) || (bad == 0)) ? 0 : 1.6;

let rightHalfSum = great + bad;
let rightHalfAmountInProcent = rightHalfSum / 100;
let greatPartOfHalf = (great / rightHalfAmountInProcent) - greatAndBadBetweenMargin/2;
let badPartOfHalf = (bad / rightHalfAmountInProcent) - greatAndBadBetweenMargin/2;
element.querySelector('.pie-chart__great').style.height = greatPartOfHalf + '%';
element.querySelector('.pie-chart__bad').style.height = badPartOfHalf + '%';


let goodAndNormalBetweenMargin = ((good == 0) || (normal == 0)) ? 0 : 1.6;
let leftHalfSum = good + normal;
let leftHalfAmountInProcent = leftHalfSum / 100;
let normalPartOfHalf = (normal / leftHalfAmountInProcent) - goodAndNormalBetweenMargin/2;
let goodPartOfHalf = (good / leftHalfAmountInProcent) - goodAndNormalBetweenMargin/2;
element.querySelector('.pie-chart__good').style.height = goodPartOfHalf + '%';
element.querySelector('.pie-chart__normal').style.height = normalPartOfHalf + '%';
