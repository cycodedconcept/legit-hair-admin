import React from 'react'
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);

const BarChart = () => {
    const data = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: '#FF962E',
          borderColor: '#FF962E',
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  
    return <Bar data={data} options={options} />;
  };
  
  const PieChart = () => {
    const data = {
      labels: ['Excellent', 'Good', 'Poor'],
      datasets: [
        {
          label: '# of Votes',
          data: [30, 60, 10,],
          backgroundColor: [
            '#FF962E',
            '#FFCC91',
            '#CC5F5F',
          ],
          borderColor: [
            '#FF962E',
            '#FFCC91',
            '#CC5F5F',
          ],
          borderWidth: 1,
        },
      ],
    };
  
    return <Pie data={data} />;
};

export { BarChart, PieChart };
