/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef , useMemo} from "react";
import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  Legend,
  Title,
  ChartOptions,
} from "chart.js";
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  Legend,
  Title,
  annotationPlugin
);
interface MixedLinesChartProps{
  active?: boolean;
  ChartData: {
    dates: string[];
    lowValues: number[];
    highValues: number[];
  };
}
 export const MixedLinesChart : React.FC<MixedLinesChartProps> = ({ ChartData}) => {
  const chartRef = useRef<ChartJS<"line">>(null);
  console.log(ChartData);
  const flattenArray = (arr: any[]) => arr.reduce((acc, val) => acc.concat(val), []);

  const flattenedDates = useMemo(() => flattenArray(ChartData.dates), [ChartData.dates]);
  const flattenedLowValues = useMemo(() => flattenArray(ChartData.lowValues), [ChartData.lowValues]);
  const flattenedHighValues = useMemo(() => flattenArray(ChartData.highValues), [ChartData.highValues]);
  const data = {
    labels: flattenedDates,
    datasets: [
      {
        label: "SPB",
        data: flattenedLowValues,
        borderColor: "blue",
        borderWidth: 1.5,
        pointBackgroundColor: "blue",
        pointBorderColor: "blue",
        pointRadius: 3,
        pointHoverRadius: 4,
        pointHitRadius: 5,
        tension: 0.4,
        fill: true,
        pointStyle: "rect",
      },
      {
        label: "DPB",
        data: flattenedHighValues,
        borderColor: "red",
        borderWidth: 1.5,
        pointBackgroundColor: "red",
        pointBorderColor: "red",
        pointRadius: 3,
        pointHoverRadius: 4,
        pointHitRadius: 5,
        tension: 0.4,
        pointStyle: "rect",
      },
    ],
  };

  const options: ChartOptions<"line"> & {
    plugins: { annotation: { annotations: any } };
  } = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#FFF",
        },
        grid: {
          display: false,
          color: "#444",
        },
      },
      y: {
        ticks: {
          color:  "#FFF",
          callback: function (value) {
            return value;
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
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "#fff",
        },
      },
      tooltip: {
        enabled: true,
      },

      annotation: {
        annotations: {},
      },
    },
  };
  // const backgroundColorPlugin = {
  //   id: 'customCanvasBackgroundColor',
  //   beforeDraw: (chart: Chart) => {
  //     const ctx = chart.canvas.getContext('2d');
  //     if(ctx){
  //     ctx.save();
  //     ctx.globalCompositeOperation = 'destination-over';
  //     ctx.fillStyle = '#121212';
  //     ctx.fillRect(0, 0, chart.width, chart.height);
  //     ctx.restore();
  //     }
  //   }
  // };
  // ChartJS.register(backgroundColorPlugin);
  return (
    <div className="w-full h-[100px] pb-6">
      <div className="my-2 flex items-center gap-2 justify-end">
        <div className="flex items-center gap-1"> 
          <div className="w-2 h-1 bg-blue-600" />
          <span className={`text-[8px]  text-secondary-text`}>SPB</span>
        </div>
        <div className="flex items-center gap-1"> 
          <div className="w-2 h-1 bg-red-600" />
          <span className={`text-[8px] text-secondary-text`}>DPB</span>
        </div>
      </div>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};
