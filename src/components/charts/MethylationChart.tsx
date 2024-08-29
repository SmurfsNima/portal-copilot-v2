import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MethylationChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  let myChart: Chart | null = null;

  const data = {
    labels: ['Promoters', 'Enhancers', 'Gene bodies', 'Intergenic'],
    datasets: [
      {
        label: 'Current',
        data: [60, 70, 50, 40],
        backgroundColor: 'rgba(127, 57, 251, 1)',
      },
      {
        label: 'Average',
        data: [50, 60, 40, 30],
        backgroundColor: 'rgba(3, 218, 197, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x:{
        ticks: {
          color: "#FFFF",
          font : {
            size : 10,
          }
        },

      },
      y: {
        beginAtZero: true,
        max: 100,
        
        ticks: {
          color: "#FFFF",
          font : {
            size : 10,
          }
        },
        grid: {
          display : true ,
          color: "#444",
        },
        border: {
          dash: [3, 3],
          display: true,
        },
      },
    },
  };

  useEffect(() => {
    if (chartRef.current) {
      myChart = new Chart(chartRef.current, {
        type: 'bar',
        data: data,
        options: options,
      });
    }

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [data, options]);

  return (
    <div className=" bg-black-secondary border border-main-border p-6 rounded-lg shadow-md max-w-[872px] max-h-[223px]">
      <canvas ref={chartRef} />
      {/* <div className="text-right -mt-2 text-sm text-secondary-text ">
        24 May, 2024
      </div> */}
    </div>
  );
};

export default MethylationChart;