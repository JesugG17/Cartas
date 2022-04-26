import { Chart, registerables } from 'chart.js';
import { juegosGanados } from './components';

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


export const renderChart = () => {
   chart = new Chart( context, config );
}