import PieChart from './PieChart';

const chartElements = document.getElementsByClassName('js-pie-chart');
for (let i = 0; i < chartElements.length; i += 1) {
  new PieChart(chartElements[i]);
}
