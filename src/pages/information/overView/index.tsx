import React from "react";
import { btnInfo, chartsInfo } from "./Data";

import { Accordion, Appointments } from "@/components";
import {InfoGraphicCenter} from './infoGraphicCenter'
import { NormalChartCard } from "@/components/chartCard/normalChartCard";
const OverView: React.FC = () => {
  return (
    <div className="flex justify-between  w-full  bg-black-background gap-5 ">
      <div className="flex   flex-col gap-2">
       {btnInfo.map((item )=>(
        <>
            <Accordion title={item.text}>
                <Appointments></Appointments>
            </Accordion>
        </>
       ))}
      </div>
        <InfoGraphicCenter />  
       <div >
        <div className="flex flex-col gap-2 max-w-[300px] 2xl:max-w-[400px]">
        {chartsInfo.map((item ,i )=>(
          <div key={i} >
          <NormalChartCard  type={item.type} value={item.value} isMeasured={item.isMeasured} othersTypes={item.otherTypes} status={item.status} />
          </div>
        ))}
        </div>
       
       </div>
    </div>
  );
};

export default OverView