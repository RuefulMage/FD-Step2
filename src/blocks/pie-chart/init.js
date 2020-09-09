import createPieChart from './pie-chart';

let chartElements = document.getElementsByClassName('js-pie-chart');

for (let i = 0; i < chartElements.length; i++) {
    createPieChart(chartElements[i]);
}