/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import bellIcon from "/public/Themes/Aurora/icons/bell-icon.svg";
import arrowDown from '/public/Themes/Aurora/icons/chevron-down-green.svg'
import { useSelector } from "react-redux";
import { LineChart } from "@/components/charts";

interface chartCardProps {
  type: null | string;
  value: number;
  isMeasured: boolean;
  status: string;
  othersTypes?: string[];
  
}

export const OverviewChartCard: React.FC<chartCardProps> = ({
  type,
  value,
  isMeasured,
  othersTypes,
  status,
  
}) => {

  const [active, setActive] = useState("HCT");
  const theme = useSelector((state: any) => state.theme.value.name);


  

  return (
    <div className={`${theme}-graphicinfo-chartCard-container`}>
      <div className="flex justify-between items-center">
        <div className="flex items-start gap-2">
          <img className={`${theme}-biomarker-charts-${type?.replace(/\s+/g, '')}`} alt="" />
          
          <h2 className="text-primary-text font-medium text-xs">{type}</h2>
        </div>
        <div className="flex gap-2">
          {!isMeasured && <img width={32} src={bellIcon} alt="" />}
          <div className="flex flex-col ">
            <h2
              className={`${
                isMeasured ? "text-brand-primary-color" : "text-red-status"
              } font-medium text-xs`}
            >
              {isMeasured ? "Measured" : "Not Measured"}
            </h2>
            <h2 className="text-gray-400 text-[10px] font-normal">
              Status:
              <span className="text-primary-text text-[10px] font-medium">
                {status}
              </span>
            </h2>
          </div>
        </div>
      </div>
      <div className="flex  my-1 ">
        {othersTypes?.map((item , i) => (
          <span key={i}
            onClick={() => setActive(item)}
            className={`${
              active === item
                ? "text-brand-primary-color   border-brand-primary-color"
                : "text-secondary-text border-main-border "
            } border-b cursor-pointer px-2 text-sm`}
          >
            {item}
          </span>
        ))}
      </div>
      <h2 className="text-secondary-text  text-[10px] font-normal">
        Average:
        <span className="mx-1 text-primary-text font-medium text-[14px]">
          {value}
        </span>
        {type === "Temperature" ? "oF" : type === "Heart Rate" ? "bpm" : "%"}
      </h2>
      <div className="bg-black-secondary border border-main-border px-2 pb-5  h-full max-h-[175px] rounded-lg ">
        <div className="flex w-full justify-between items-center">
          <span className="text-secondary-text">oF</span>
          <div className="flex items-center gap-2">
            <h2 className="text-brand-primary-color text-xs">24 May,  2024</h2>
            <img src={arrowDown} alt="" />
          </div>
        </div>
        
        <LineChart model={type === "CBC" ? "linear" : "line"} active={false}  />
        
      </div>
    </div>
  );
};
