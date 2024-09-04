import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';
import React, { useState } from 'react';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);
interface VerticalBarChartProps{
    performane : number
}
const VerticalBarChart: React.FC<VerticalBarChartProps> = ({performane}) => {
    const [performanceData] = useState(performane);

  const data = {
    labels: [''],
    datasets: [
      {
        label: 'Performance',
        data: [performanceData],
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
        legend:{
            display: false
        },
      tooltip: {
        enabled: true,
      },
      
    },
  };
  return(
    <>
   
  <div className="relative flex  items-center">
        <Bar data={data} options={options} />
        <div className="absolute -right-[10%] h-full w-2 bg-gradient-to-b from-blue-500 via-green-500 to-red-500 rounded-full"></div>
        <div className="absolute -right-2 transform -translate-x-1/2 bg-blue-300 w-3 h-3 rounded-full" style={{ top: `${performanceData}%` }}></div>
      </div>
      <div className="text-[10px] text-brand-primary-color flex flex-col gap-[10px]   absolute -right-[43%] top-0">
        <div className="">Excellent</div>
        <div className="">Good</div>
        <div className="">Ok</div>
        <div className="">Need Focus</div>
      </div>
      </>
  )
}
export default VerticalBarChart