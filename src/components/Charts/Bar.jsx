import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);
import React from 'react';
const Bars = ({ labels, data, options }) => {
  const midata = {
    labels: labels,
    datasets: [
      {
        label: 'Sold',
        data: data,
        backgroundColor: 'rgba(0, 220, 195, 0.5)',
      },
    ],
  };

  return <Bar data={midata} options={options} />;
};

export default Bars;
