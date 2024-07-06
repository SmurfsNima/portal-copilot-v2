import React from "react";
import { btnInfo } from "./Data";

import { Accordion, Appointments } from "@/components";

const OverView: React.FC = () => {
  return (
    <div className="flex justify-start w-full mx-auto  bg-black-background  gap-5 ">
      <div className="flex  flex-col gap-2">
       {btnInfo.map((item )=>(
        <>
            <Accordion title={item.text}>
                <Appointments></Appointments>
            </Accordion>
        </>
       ))}
      </div>
        {/* <InfoGraphicCenter />  
       <div className="flex flex-col gap-3">
        {chartsInfo.map((item ,i )=>(
          <div key={i} >
          <OverviewChartCard  type={item.type} value={item.value} isMeasured={item.isMeasured} othersTypes={item.otherTypes} status={item.status} />
          </div>
        ))}
       </div> */}
    </div>
  );
};

export default OverView