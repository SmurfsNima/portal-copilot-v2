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
  type StatusType = 'Excellent' | 'Good' | 'Ok' | 'Needs Focus';
  const statusPosition: Record<StatusType, string> = {
    "Excellent": '5%',
    "Good": '30%',
    "Ok": '60%',
    "Needs Focus": '85%'
  };
  const statusColors: Record<StatusType, string> = {
    "Excellent": 'bg-[#7F39FB]',
    "Good": 'bg-[#03DAC5]',
    "Ok": 'bg-[#E8D284]',
    "Needs Focus": 'bg-[#E2798E]'
  };

  const circlePosition = statusPosition[status as StatusType] || '0%';
  const circleColor = statusColors[status as StatusType] || 'bg-blue-300'; // Default color


;console.log(status);

const statuses = ['Excellent' , 'Good' , 'Ok' , 'Needs Focus']
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
          <div className={`flex flex-col text-center ${average === "null" && 'hidden'}`}>
            <h2 data-active={active === type} className={`ml-[2px] ${theme}-smallChartCard-text text-xs`}>Avg</h2>
            <h2 data-active={active === type} className={`ml-[2px] ${theme}-smallChartCard-text text-primary-text text-sm 2xl:text-[16px]`}>
              {average != 'null' ?average:'-'}
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
            <div className="absolute top-0 right-[28%] h-full w-2  rounded-full">
              <div className='bg-[#7F39FB] h-1/4 w-full rounded-t-full'></div>
              <div className='bg-[#03DAC5] h-1/4 w-full'></div>
              <div className='bg-[#E8D284] h-1/4 w-full'></div>
              <div className='bg-[#E2798E] h-1/4 w-full rounded-b-full'></div>
            </div>
            <div className={` ${status === "Unknown Status" && 'hidden'} absolute right-[35%] transform ${circleColor} w-3 h-3 rounded-full`} style={{ top: circlePosition }}></div>
          </div>
          <div className="text-[8px] text-secondary-text absolute right-0 flex flex-col gap-4  mt-1">
           {
            statuses.map((item , i)=>(
              <div key={i} className={`${item === status && 'text-brand-primary-color'}`}>{item}</div>
            ))
           }
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default BarChart;