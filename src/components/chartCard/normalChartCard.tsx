/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { LineChart, MixedLinesChart } from "@/components/charts";

interface ChartData {
  dates: string[];
  values: number[] | { systolic: number[]; diastolic: number[] };
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
  ): values is { systolic: number[]; diastolic: number[] } => {
    return (
      values &&
      typeof values === "object" &&
      'systolic' in values &&
      'diastolic' in values &&
      Array.isArray(values.systolic) &&
      Array.isArray(values.diastolic)
    );
  };
  const flattenArray = (arr: any[]) =>
    arr.reduce((acc, val) => acc.concat(val), []);

  const averageValue = useMemo(() => {
    const { values } = chartData;

    if (type === "Blood Pressure" && isBloodPressureValues(values)) {
      const { systolic, diastolic } = values;
      const flattenedLow = flattenArray(systolic);
      const flattenedHigh = flattenArray(diastolic);
      const sumLow = flattenedLow.reduce(
        (acc: number, val: number) => acc + val,
        0
      );
      const sumHigh = flattenedHigh.reduce(
        (acc: number, val: number) => acc + val,
        0
      );
      const avgLow = sumLow / flattenedLow.length;
      const avgHigh = sumHigh / flattenedHigh.length;
      return (avgLow + avgHigh) / 2;
    } else if (Array.isArray(values)) {
      const flattenedValues = flattenArray(values);
      if (flattenedValues.length === 0) return 0;
      const sum = flattenedValues.reduce(
        (acc: number, val: number) => acc + val,
        0
      );
      return sum / flattenedValues.length;
    }
    return 0;
  }, [chartData, type]);

  const lowHighValues = useMemo(() => {
    const { values, dates } = chartData;
    if (type === "Blood Pressure" && isBloodPressureValues(values)) {
      return {
        lowValues: values.systolic,
        highValues: values.diastolic,
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

  return (
    <div className={`${theme}-normalChartCard-container py-3 `}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* <div className="flex items-center justify-center rounded-lg bg-black-background p-1">
            <img
              className={`${theme}-icons-${type?.replace(/\s+/g, "")}`}
              alt=""
            />
          </div> */}

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
      <h2 className="text-secondary-text my-2  text-xs font-normal">
        Average:
        <span className="mx-1 text-primary-text font-medium text-sm">
          {averageValue.toFixed(2)}
        </span>
        {type === "Temperature"
          ? "oF"
          : type === "Heart Rate"
          ? "bpm"
          : type === "CBC"
          ? "%"
          : type === "Left Leg Stand Duration"
          ? "seconds"
          : type === "Weight"
          ? "kg"
          : "mm/hg"}
      </h2>
      <div className="bg-black-secondary border h-auto  border-main-border px-2 w-full pt-1 pb-4   max-h-[140px] xl:max-h-[223px]  rounded-md ">
        <div className="flex w-full justify-between items-center">
          <span className="text-secondary-text  text-xs">
            {type === "Temperature"
              ? "oF"
              : type === "Heart Rate"
              ? "bpm"
              : type === "CBC"
              ? "%"
              : type === "Left Leg Stand Duration"
              ? "seconds"
              : type === "Weight"
              ? "kg"
              : "mm/hg"}
          </span>
          <div className="flex items-center gap-2">
            <h2 className="text-brand-primary-color text-xs">24 May, 2024</h2>
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
