import React from "react";
import { btnInfo, chartsInfo } from "./Data";

import { Accordion, Appointments } from "@/components";
import {InfoGraphicCenter} from './infoGraphicCenter'
import { OverviewChartCard } from "./chartCard";
const OverView: React.FC = () => {
  return (
    <div className="flex justify-between w-full px-[20px] xl:px-[30px] 2xl:px-[40px] bg-black-background  gap-5 ">
      <div className="flex flex-col gap-2">
       {btnInfo.map((item )=>(
        <>
            <Accordion title={item.text}>
                <Appointments></Appointments>
            </Accordion>
        </>
       ))}
      </div>
        <InfoGraphicCenter />  
       <div className="flex flex-col  px-2 pb-7 gap-3">
        {chartsInfo.map((item ,i )=>(
          <div key={i} >
          <OverviewChartCard  type={item.type} value={item.value} isMeasured={item.isMeasured} othersTypes={item.otherTypes} status={item.status} />
          </div>
        ))}
       </div>
    </div>
  );
};

export default OverView