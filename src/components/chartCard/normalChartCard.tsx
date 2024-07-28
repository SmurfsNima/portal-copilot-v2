/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { LineChart, MixedLinesChart } from "@/components/charts";

interface ChartData {
  dates: string[];
  values: number[] | { Low: number[]; High: number[] };
}

interface ChartCardProps {
  type: null | string;
  isMeasured: boolean;
  status?: string;
  othersTypes?: string[];
  chartData: ChartData;
}

export const NormalChartCard: React.FC<ChartCardProps> = ({
  type,
  isMeasured,
  othersTypes,
  status,
  chartData,
}) => {
  const [active, setActive] = useState("HCT");
  const theme = useSelector((state: any) => state.theme.value.name);
  if (type === "Blood Pressure") {
    console.log(chartData);
  }

  const isBloodPressureValues = (
    values: any
  ): values is { Low: number[]; High: number[] } => {
    return (
      values &&
      typeof values === "object" &&
      'Low' in values &&
      'High' in values &&
      Array.isArray(values.Low) &&
      Array.isArray(values.High)
    );
  };
  const flattenArray = (arr: any[]) => arr.reduce((acc, val) => acc.concat(val), []);

  const averageValue = useMemo(() => {
    const { values } = chartData;

    if (type === "Blood Pressure" && isBloodPressureValues(values)) {
      const { Low, High } = values;
      const flattenedLow = flattenArray(Low);
      const flattenedHigh = flattenArray(High);
      const sumLow = flattenedLow.reduce((acc: number, val: number) => acc + val, 0);
      const sumHigh = flattenedHigh.reduce((acc: number, val: number) => acc + val, 0);
      const avgLow = sumLow / flattenedLow.length;
      const avgHigh = sumHigh / flattenedHigh.length;
      return (avgLow + avgHigh) / 2;
    } else if (Array.isArray(values)) {
      const flattenedValues = flattenArray(values);
      if (flattenedValues.length === 0) return 0;
      const sum = flattenedValues.reduce((acc: number, val: number) => acc + val, 0);
      return sum / flattenedValues.length;
    }
    return 0;
  }, [chartData, type]);

  const lowHighValues = useMemo(() => {
    const { values, dates } = chartData;
    if (type === "Blood Pressure" && isBloodPressureValues(values)) {
      return {
        lowValues: values.Low,
        highValues: values.High,
        dates: dates,
      };
    }
    return { lowValues: [], highValues: [], dates };
  }, [chartData, type]);

  const lineChartData = useMemo(() => {
    const { values, dates } = chartData;
    if (!isBloodPressureValues(values)) {
      return { dates, values };
    }
    return { dates: [], values: [] };
  }, [chartData, type]);
console.log(lowHighValues);

  return (
    <div className={`${theme}-normalChartCard-container  `}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-lg bg-black-background p-1">
            <img
              className={`${theme}-icons-${type?.replace(/\s+/g, "")}`}
              alt=""
            />
          </div>

          <h2 className={`${theme}-normalChartCard-title`}>{type}</h2>
        </div>
        <div className="flex gap-2">
          {!isMeasured && <img className={`${theme}-icons-Bell`} alt="" />}
          <div className="flex flex-col ">
            <h2
              data-isMeasured={isMeasured}
              className={`${theme}-normalChartCard-isMeasured`}
            >
              {isMeasured ? "Measured" : "Not Measured"}
            </h2>
            <h2 className="text-secondary-text text-[10px] font-normal">
              Status:
              <span className="text-primary-text text-[10px] font-medium">
                {status}
              </span>
            </h2>
          </div>
        </div>
      </div>
      <div className="flex w-full   ">
        {othersTypes?.map((item, i) => (
          <span
            key={i}
            onClick={() => setActive(item)}
            data-active={active === item}
            className={`${theme}-normalChartCard-otherTypes-item`}
          >
            {item}
          </span>
        ))}
      </div>
      <h2 className="text-secondary-text  text-[10px] font-normal">
        Average:
        <span className="mx-1 text-primary-text font-medium text-xs">
          {averageValue.toFixed(2)}
        </span>
        {type === "Temperature" ? "oF" : type === "Heart Rate" ? "bpm" : "%"}
      </h2>
      <div className="bg-black-secondary border border-main-border px-2    h-full max-h-[140px] xl:max-h-[162px] 2xl:max-h-[175px] rounded-lg ">
        <div className="flex w-full justify-between items-center">
          <span className="text-secondary-text  text-xs">
            {type === "Temperature"
              ? "oF"
              : type === "Heart Rate"
              ? "bpm"
              : "%"}
          </span>
          <div className="flex items-center gap-2">
            <h2 className="text-brand-primary-color text-[10px] 2xl:text-xs">
              24 May, 2024
            </h2>
            <img
              data-color="green"
              className={`${theme}-icons-arrow-down`}
              alt=""
            />
          </div>
        </div>
        {type === "Blood Pressure" ? (
          <MixedLinesChart ChartData={lowHighValues} />
        ) : (
          <LineChart
            ChartData={lineChartData}
            dashed
            model={type === "CBC" ? "linear" : "line"}
          />
        )}
      </div>
    </div>
  );
};
