import {Dispatch , SetStateAction } from "react";
import { LineChart , MixedLinesChart } from "@/components/charts/index"
import { useSelector } from "react-redux";
interface CharCardProps {

  title: string;
  type ?: string;
  Avarage: number;
  current: number;
  active : string | null;
  setActive: Dispatch<SetStateAction<any>>;
}
export const ChartCard: React.FC<CharCardProps> = ({

  title,
  type = 'line',
  Avarage,
  current,
  active,
  setActive
}) => {
  const theme = useSelector((state: any) => state.theme.value.name);

  return (
    <div onClick={()=> setActive(title)} className={`${active === title ? 'bg-brand-primary-color' : 'bg-black-primary'} px-3 py-3  border border-main-border rounded-2xl flex gap-2 max-w-sm`}>
        <div className="flex flex-col gap-3 flex-[1.5]">
            <div className="flex gap-2 items-center">
              <div className="bg-black-background flex items-center justify-center rounded-lg p-1"><img className={`${theme}-icons-${title?.replace(/\s+/g, '')}`} alt="" /></div>
                
                <h2 className={`text-base ${active === title ? 'text-black' : 'text-primary-text'} font-medium`} >{title}</h2>
            </div>
            <div className="w-48 h-24">
                {title === 'Blood Pressure' ? <MixedLinesChart active={active===title} /> :   <LineChart active={active === title} model={type} /> }
         
            </div>
        </div>
        <div className="flex flex-col items-end justify-between flex-[0.5]">
            <div className="flex flex-col text-center ">
                <h2 className={` ${active === title ? 'text-black' : 'text-secondary-text'}  text-xs`}>Avg</h2>
                <h2 className={`${active === title ? 'text-black' : 'text-primary-text'}   text-lg flex items-center`} >{Avarage}</h2> <span className={` ml-[2px]  ${active === title ? 'text-black-secondary' : 'text-secondary-text'}  text-xs`}>{title === 'Temperature' ? 'oF' : title === 'Heart Rate' ?  'bpm' : title === "CBC" ? '%' : title === "Blood Pressure" ? 'mm/hg' : ''}</span>
            </div>
            <div className="flex text-center  flex-col">
                <h2 className={` ${active === title ? 'text-black' : 'text-secondary-text'}  text-xs`}>Current</h2>
                <h2 className={`${active === title ? 'text-black' : 'text-primary-text'}   text-lg  `} >{current}</h2> <span className={`ml-[2px]   ${active === title ? 'text-black-secondary' : 'text-secondary-text'} text-xs`}>{title === 'Temperature' ? 'oF' : title === 'Heart Rate' ?  'bpm' : title === 'CBC' ? '%' : title === "Blood Pressure" ? 'mm/hg' : ''}</span>
            </div>
            
        </div>
    </div>
  );
};
