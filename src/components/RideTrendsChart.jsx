// src/components/RideTrendsChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RideTrendsChart = ({ pins }) => {
  // Example: Count rides per month
  const rideCounts = {};
  pins.forEach(pin => {
    const month = new Date(pin.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    rideCounts[month] = (rideCounts[month] || 0) + 1;
  });
  const labels = Object.keys(rideCounts);
  const data = Object.values(rideCounts);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Rides',
        data,
        backgroundColor: 'rgba(0, 123, 255, 0.5)'
      }
    ]
  };

  return (
    <div>
      <h2>Ride Trends</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default RideTrendsChart;
