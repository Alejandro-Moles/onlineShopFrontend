import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler 
);

export default function LinesChart({ labels, data }) {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Profits',
                data: data,
                tension: 0.5,
                fill: true,
                borderColor: 'rgb(236, 107, 34)',
                backgroundColor: 'rgb(236, 107, 34, 0.5)',
                pointRadius: 5,
                pointBorderColor: 'rgb(236, 107, 34)',
                pointBackgroundColor: 'rgb(236, 107, 34)',
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                min: 0,
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)',
                },
            },
            x: {
                ticks: { color: 'rgb(255, 255, 255)' },
                grid: {
                    color: 'transparent',
                },
            },
        },
    };

    return <Line data={chartData} options={chartOptions} />;
}