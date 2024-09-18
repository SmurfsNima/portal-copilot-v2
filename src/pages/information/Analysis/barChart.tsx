import { useSelector } from 'react-redux';
import { Dispatch, SetStateAction } from "react";
import React from 'react';

import { Tooltip } from 'react-tooltip'
interface BarChartProps {
  type: string | null;
  average: string;
  current: string;
  status: string;
  active: string | null;
  setActive: Dispatch<SetStateAction<any>>;
}

const BarChart: React.FC<BarChartProps> = ({ type, active, setActive, average, current, status }) => {
  const theme = useSelector((state: any) => state.theme.value.name);
  type StatusType = 'Excellent' | 'Good' | 'Ok' | 'Need Focus';

  // Determine the position of the circle based on the status
  const statusPosition: Record<StatusType, string> = {
    "Excellent": '0',
    "Good": '25%',
    "Ok": '50%',
    "Need Focus": '75%'
  };

  const circlePosition = statusPosition[status as StatusType] || '0';

  return (
    <div
      onClick={() => setActive(type)}
      data-active={active === type}
      className={`${theme}-smallChartCard-container relative cursor-pointer  w-[314px] h-[148px]`}
    >
      <Tooltip place='top-end' className='absolute top-0' id={type as string} />
      <h3 data-tooltip-id={type as string} data-tooltip-content={type} className="text-sm text-primary-text text-nowrap font-medium mb-2">{type?.substring(0,30)}</h3>
      
      <div className='w-full flex items-center justify-between'>
        <div className={`flex-row absolute top-[40%] left-8 gap-8 justify-start flex items-start w-full`}>
          <div className="flex flex-col text-center">
            <h2 data-active={active === type} className={`ml-[2px] ${theme}-smallChartCard-text text-xs`}>Avg</h2>
            <h2 data-active={active === type} className={`ml-[2px] ${theme}-smallChartCard-text text-primary-text text-sm 2xl:text-[16px]`}>
              {average}
            </h2>
          </div>
          <div className={`flex text-center flex-col`}>
            <h2 data-active={active === type} className={`ml-[2px] ${theme}-smallChartCard-text text-xs`}>Current</h2>
            <h2 data-active={active === type} className={`ml-[2px] ${theme}-smallChartCard-text text-primary-text text-sm 2xl:text-[14px]`}>
              {current.substring(0,20)}
            </h2>
          </div>
        </div>

        <div className='absolute right-2 w-[180px] h-[100px]'>
          <div className="flex items-center">
            <div className="absolute top-0 right-[28%] h-full w-2 bg-gradient-to-b from-blue-500 via-green-500 to-red-500 rounded-full"></div>
            <div className="absolute right-[35%] transform bg-blue-300 w-3 h-3 rounded-full" style={{ top: circlePosition }}></div>
          </div>
          <div className="text-[8px] text-brand-primary-color absolute right-0 flex flex-col gap-4 ">
            <div>Excellent</div>
            <div>Good</div>
            <div>Ok</div>
            <div>Need Focus</div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default BarChart;