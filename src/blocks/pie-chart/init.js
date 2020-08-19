import initPieChart from "./pie-chart";

let chartElements = document.getElementsByClassName('pie-chart');

for (let i = 0; i < chartElements.length; i++) {
    initPieChart(chartElements[i]);
}