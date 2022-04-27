import { Chart, registerables } from 'chart.js';
import { juegosGanados } from './components';


const generarGrafica = document.querySelector(".button__grafica");

Chart.register( ...registerables )

let chart

let labels = [];

const data = {
    labels: labels,
    datasets: [{
        label: 'Simulacion paracaidista',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: juegosGanados,
    }]
};

const config = {
    type: 'pie',
    data: data,
    options: {
        maintainAspectRatio: false,
    }
}


const renderChart = () => {
   chart = new Chart( context, config );
}


generarGrafica.addEventListener("click", () => {
    renderChart();
})