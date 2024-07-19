/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useSelector } from "react-redux";
import { LineChart } from "@/components/charts";

interface chartCardProps {
  type: null | string;
  value: number;
  isMeasured: boolean;
  status: string;
  othersTypes?: string[];
  
}

export const NormalChartCard: React.FC<chartCardProps> = ({
  type,
  value,
  isMeasured,
  othersTypes,
  status,
  
}) => {

  const [active, setActive] = useState("HCT");
  const theme = useSelector((state: any) => state.theme.value.name);


  

  return (
    <div className={`${theme}-normalChartCard-container  `}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-lg bg-black-background p-1">
          <img className={`${theme}-icons-${type?.replace(/\s+/g, '')}`} alt="" />
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
        {othersTypes?.map((item , i) => (
          <span key={i}
            onClick={() => setActive(item)}
            data-active={active===item}
            className={`${theme}-normalChartCard-otherTypes-item`}
          >
            {item}
          </span>
        ))}
      </div>
      <h2 className="text-secondary-text  text-[10px] font-normal">
        Average:
        <span className="mx-1 text-primary-text font-medium text-xs">
          {value}
        </span>
        {type === "Temperature" ? "oF" : type === "Heart Rate" ? "bpm" : "%"}
      </h2>
      <div className="bg-black-secondary border border-main-border px-2    h-full max-h-[140px] xl:max-h-[162px] 2xl:max-h-[175px] rounded-lg ">
        <div className="flex w-full justify-between items-center">
          <span className="text-secondary-text  text-xs">{type === "Temperature" ? "oF" : type === "Heart Rate" ? "bpm" : "%"}</span>
          <div className="flex items-center gap-2">
            <h2 className="text-brand-primary-color text-[10px] 2xl:text-xs">24 May,  2024</h2>
            <img data-color="green" className={`${theme}-icons-arrow-down`} alt="" />
          </div>
        </div>
        
        <LineChart dashed model={type === "CBC" ? "linear" : "line"} active={false}  />
        
      </div>
    </div>
  );
};
