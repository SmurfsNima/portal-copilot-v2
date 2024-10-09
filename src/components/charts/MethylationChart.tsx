import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MethylationChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        const gradientCurrent = ctx.createLinearGradient(0, 0, 0, 400);
        gradientCurrent.addColorStop(0, 'rgba(217, 217, 217, 0)');
        gradientCurrent.addColorStop(0.1, 'rgba(127, 57, 251, 1)');

        const gradientAverage = ctx.createLinearGradient(0, 0, 0, 400);
        // gradientAverage.addColorStop(0, 'rgba(217, 217, 217, 0)');
        // gradientAverage.addColorStop(0.1, 'rgba(3, 218, 197, 1)');
        gradientAverage.addColorStop(1, '#D9D9D900');
        gradientAverage.addColorStop(0, '#7F39FB');  
        const data = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr','May','Jun','Jul','Aug','Sep','Sep','Oct','Nov','Dec'],
          datasets: [
            // {
            //   label: 'Current',
            //   data: [60, 70, 50, 40],
            //   backgroundColor: gradientCurrent,
            // },
            {
              label: 'Average',
              borderRadius: 100,
              // width:10,
              barThickness: 10,  // Fixed bar width of 40px
              
              data: [50, 60, 40, 30,20,14,36,41,12,51,34,25,45],
              backgroundColor: gradientAverage,
            },
          ],
        };

        const options = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              ticks: {
                color: "#FFFF",
                font: {
                  size: 10,
                },
              },
              grid: {
                display: false,
              },
              categoryPercentage: 0.8,
              barPercentage: 0.7,
            },
            y: {
              beginAtZero: true,
              max:100,
              ticks: {
                color: "#FFFF",
                font: {
                  size: 10,
                },
              },
              grid: {
                display: true,
                color: "#444",
              },
              border: {
                dash: [3, 3],
                display: true,
              },
            },
          },
        };

        const myChart = new Chart(ctx, {
          type: 'bar',
          data: data,
          options: options,
        });

        return () => {
          myChart.destroy();
        };
      }
    }
  }, []);

  return (
    <div className=" w-full bg-black-secondary border border-main-border p-4 rounded-lg shadow-md  h-[50px]}">
      <canvas ref={chartRef} />
    </div>
  );
};

export default MethylationChart;