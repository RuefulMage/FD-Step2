import createPieChart from './pie-chart';

const chartElements = document.getElementsByClassName('js-pie-chart');
for (let i = 0; i < chartElements.length; i += 1) {
  createPieChart(chartElements[i]);
}
