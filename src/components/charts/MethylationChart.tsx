/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { AppContext } from '@/store/app';

 interface MethylationChartProps {
  labels:Array<any>
  values:Array<any>
}

const MethylationChart: React.FC<MethylationChartProps> = ({labels,values}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const context= useContext(AppContext)
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
          labels: labels,
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
              
              data: values,
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
                color:context.themeISLight?"#262626" :"#FFFF",
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
                color: context.themeISLight?"#262626" :"#FFFF",
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
  }, [values,labels]);

  return (
    <div className=" w-full bg-gray-50 dark:bg-black-secondary border border-none dark:border-main-border p-4 rounded-lg shadow-md  h-full ">
      <canvas ref={chartRef} />
    </div>
  );
};

export default MethylationChart;