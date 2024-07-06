import React, { useRef, useEffect, useMemo } from "react";
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
  ChartOptions,
} from "chart.js";
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  annotationPlugin
);
interface LineChartProps {
  model: string;
  active : boolean;
  
}
 export const LineChart: React.FC<LineChartProps> = ({ model , active }) => {
  const chartRef = useRef<ChartJS<"line">>(null);
  const data = useMemo(() => [5, 5.8, 3, 5, 3, 3.3], []);
  const xData = useMemo(
    () => ["01am", "02am", "03am", "04am", "05am", "06am"],
    []
  );
  const chartData = useMemo(
    () => ({
      labels: xData,
      datasets: [
        {
          label: "bpm",
          data: data,
          borderColor: active ? "#1E1E1" : "#00FFFF",
          borderWidth: 2,
          pointBackgroundColor: model === "linear" ? "#00FFFF" : "#1e1e1e",
          pointBorderColor: active ? "#1E1E1" : "#00FFFF",
          pointRadius:
            model === "area"
              ? 0
              : model === "linear"
              ? data.map((_, i) => (xData[i] === "04am" ? 5 : 0))
              : 3,
          pointHitRadius: 10,
          pointHoverRadius: 5,
          tension: model === "line" ? 0.1 : 0.3,
          fill: model === "line" ? false : true,
        },
      ],
    }),
    [data, xData, model , active]
  );

  useEffect(() => {
    if (model === "linear" || model === "area") {
      const chart = chartRef.current;
      if (chart) {
        const ctx = chart.ctx;
        if (ctx) {
          const gradient = ctx.createLinearGradient(
            0,
            0,
            0,
            chart.chartArea.bottom
          );
          gradient.addColorStop(0, "rgba(0, 255, 255, 0.8)");
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
          chart.data.datasets[0].backgroundColor = gradient;
          chart.update();
        }
      }
    }
  }, [chartData, model]);

  const lineChartOptions: ChartOptions<"line"> = useMemo(() => {
    const plugins: ChartOptions<"line">["plugins"] = {
      legend: {
        display: false,
      },
    };

    if (model === "linear") {
      plugins.annotation = {
        annotations: {
          line1: {
            type: "line",
            xMin: "04am",
            xMax: "04am",
            yMin: 0,
            yMax: 10,
            borderColor: active ? "#1E1E1" : "rgba(0, 255, 255, 0.8)",
            borderWidth: 1,
            label: {
              content: "Separation Line",
              position: "center",
              color :active ? "#1E1E1" : "rgba(0, 255, 255, 0.8)"
            },
          },
        },
      };
    }

    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            color: active ? "#1E1E1" : "#FFF",
               maxRotation: 0,
            minRotation: 0,
            autoSkip: true,
            maxTicksLimit: 7, // Adjust this
          },
          grid: {
            display: false,
          },
        },
        y: {
          
        
          ticks: {
            color: active ? "#1E1E1" : "#FFFF",
          },
          grid: {
            display : true,
            color: "#444",
          },
          border: {
            dash: [3, 3],
            display: true,
          },
        },
      },
      plugins,
    };
  }, [model , active]);

  return (
    
  <div className="w-full h-full">
     <Line ref={chartRef} data={chartData} options={lineChartOptions} />
   </div>
     
  )
};

