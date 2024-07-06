import React, { useRef } from "react";
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
  active : boolean;
}
 export const MixedLinesChart : React.FC<MixedLinesChartProps> = ({active}) => {
  const chartRef = useRef<ChartJS<"line">>(null);

  const data = {
    labels: ["2 ", "3 ", "4 ", "5 ", "6 ", "7 ", "8 ", "9 ", "10 ", "11 "],
    datasets: [
      {
        label: "SPB",
        data: [140, 130, 135, 145, 138, 130, 135, 140, 130, 140],
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
        data: [90, 85, 88, 92, 90, 85, 88, 90, 85, 88],
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
    maintainAspectRatio: true,
    scales: {
      x: {
        ticks: {
          color: active ? "#1E1E1" : "#FFF",
        },
        grid: {
          display: false,
          color: "#444",
        },
      },
      y: {
        ticks: {
          color: active ? "#1E1E1" : "#FFF",
          callback: function (value) {
            return value;
          },
        },
        grid: {
          display: false,
          color: "#444",
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
    <div className="w-full h-full">
      <div className="flex items-center gap-2 justify-end">
        <div className="flex items-center gap-1"> 
          <div className="w-2 h-1 bg-blue-600" />
          <span className={`text-[8px] ${active ? 'text-black' : 'text-secondary-text'}`}>SPB</span>
        </div>
        <div className="flex items-center gap-1"> 
          <div className="w-2 h-1 bg-red-600" />
          <span className={`text-[8px] ${active ? 'text-black' : 'text-secondary-text'}`}>DPB</span>
        </div>
      </div>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};
