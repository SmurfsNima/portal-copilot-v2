import React from "react";
import { btnInfo } from "./Data";
import { Accordion, Appointments } from "@/components";
import { InfoGraphicCenter } from "./infoGraphicCenter";
import { NormalChartCard } from "@/components/chartCard/normalChartCard";
import { useBiomarkers } from "@/hooks";
import { prepareChartData } from "@/utils/status";
const OverView: React.FC = () => {
  const biomarkers = useBiomarkers();
  const chartData = prepareChartData(biomarkers);
  console.log(chartData);
  
  return (
    <div className="flex justify-between o  w-full  bg-black-background gap-5 ">
      <div className="flex   flex-col gap-1 min-w-[340px] max-h-[700px] overflow-auto hidden-scrollBar pb-[200px] ">
        {btnInfo.map((item) => (
          <>
            <Accordion title={item.text}>
              {item.text === "Appointments History" &&<Appointments></Appointments> } 
            </Accordion>
          </>
        ))}
      </div>
      <InfoGraphicCenter />
      <div>
        <div className="flex flex-col gap-2 max-w-[300px] 2xl:max-w-[400px] max-h-[700px] overflow-auto hidden-scrollBar pb-[200px] ">
          {chartData.map((item, i) => (
            <div key={i}>
              <NormalChartCard
                type={item.type}
                isMeasured={item.isMeasured}
                othersTypes={item.otherTypes}
                status={item.status}
                chartData={item.chartData}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverView;
