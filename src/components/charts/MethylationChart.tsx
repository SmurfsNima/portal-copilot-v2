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
        gradientAverage.addColorStop(0, 'rgba(217, 217, 217, 0)');
        gradientAverage.addColorStop(0.1, 'rgba(3, 218, 197, 1)');

        const data = {
          labels: ['Promoters', 'Enhancers', 'Gene bodies', 'Intergenic'],
          datasets: [
            {
              label: 'Current',
              data: [60, 70, 50, 40],
              backgroundColor: gradientCurrent,
            },
            {
              label: 'Average',
              data: [50, 60, 40, 30],
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
              max: 100,
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
    <div className="bg-black-secondary border border-main-border p-6 rounded-lg shadow-md max-w-[872px] max-h-[223px]">
      <canvas ref={chartRef} />
    </div>
  );
};

export default MethylationChart;