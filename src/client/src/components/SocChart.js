import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, PointElement, LineController, LineElement, Title, Tooltip, Legend, LinearScale, Filler } from 'chart.js';

Chart.register(
  CategoryScale,
  PointElement,
  LineController,
  LineElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SocChart = ({ time = [], soc = [] }) => {
  const data = useMemo(() => ({
    labels: time,
    datasets: [
      {
        label: 'State of Charge',
        data: soc,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        fill: false,
      },
    ],
  }), [time, soc]);

  const options = useMemo(() => ({
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'State of Charge (%)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
    },
  }), []);

  return (
    <div className="col-md-12">
      <h2 className="mb-3">State of Charge Profile</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default SocChart;
