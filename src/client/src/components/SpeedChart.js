import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

const SpeedChart = ({ time = [], speed = [] }) => {
  const data = {
    labels: time,
    datasets: [
      {
        label: 'Speed',
        data: speed,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Speed (km/h)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="col-md-12">
      <h2 className="mb-3">Speed Profile</h2>
      <Line data={data} options={options} />
    </div>
  )
};

export default SpeedChart;
