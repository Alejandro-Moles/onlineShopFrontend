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
const Bars = ({ title, labels, data, options }) => {
  const midata = {
    labels: title,
    datasets: [
      {
        label: 'Sold',
        data: data,
        backgroundColor: 'rgb(236, 107, 34)',
      },
    ],
  };

  const updatedOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      tooltip: {
        callbacks: {
          title: function (tooltipItems) {
            const index = tooltipItems[0]?.dataIndex;
            return index !== undefined ? labels[index] : '';
          },
        },
      },
    },
  };

  return <Bar data={midata} options={updatedOptions} />;
};

export default Bars;
