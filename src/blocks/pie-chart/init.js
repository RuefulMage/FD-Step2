import PieChart from './PieChart';

const chartElements = document.getElementsByClassName('js-pie-chart');
Array.from(chartElements).forEach(chart => {
  new PieChart(chart);
});
