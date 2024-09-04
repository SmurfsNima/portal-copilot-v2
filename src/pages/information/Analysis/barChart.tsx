import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const VerticalBarChart = () => {
  const data = {
    labels: [''],
    datasets: [
      {
        label: 'Performance',
        data: [26],
        backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent to allow gradient
        borderColor: 'rgba(0, 0, 0, 0)', // Transparent to allow gradient
        barThickness: 20,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    scales: {
      x: {
        display: false,
      },
      y: {
        min: 0,
        max: 100,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="bg-black-secondary text-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold mb-2">Left Leg Stand Duration</h3>
        <div className="flex space-x-8">
          <div>
            <div className="text-sm">Avg</div>
            <div className="text-2xl font-bold">26 <span className="text-base">Second</span></div>
          </div>
          <div>
            <div className="text-sm">Current</div>
            <div className="text-2xl font-bold flex items-center">
              <span className="text-yellow-500">&#x2192;</span>
              26 <span className="text-base">Second</span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex items-center">
        <Bar data={data} options={options} />
        <div className="absolute h-full w-2 bg-gradient-to-b from-blue-500 via-green-500 to-red-500 rounded-full"></div>
        <div className="absolute left-1/2 transform -translate-x-1/2 bg-blue-300 w-3 h-3 rounded-full" style={{ top: '25%' }}></div>
      </div>
      <div className="text-xs ml-4">
        <div className="text-blue-300">Excellent</div>
        <div className="text-green-500">Good</div>
        <div className="text-yellow-500">Ok</div>
        <div className="text-red-500">Need Focus</div>
      </div>
    </div>
  );
};

export default VerticalBarChart;