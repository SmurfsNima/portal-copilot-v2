import { useState, useEffect } from "react";
import { btnInfo } from "./Data";
import { Accordion, Appointments } from "@/components";
import { InfoGraphicCenter } from "./infoGraphicCenter";
import { NormalChartCard } from "@/components/chartCard/normalChartCard";
import { useBiomarkers } from "@/hooks";
import { prepareChartData } from "@/utils/status";
import { ChartDataItem } from "@/types";

const fakeBiomarkers = [
  {
    chart: "linear",
    chartData: {
      dates: ['10 Apr' , '11 Apr' , '12 Apr'],
      values: [75,78,71]
    },
    isMeasured: true,
    status: 'low',
    type: "Heart Rate",
    otherTypes : []
  },
  {
    chart: "line",
    chartData: {
      dates: ['10 Apr' , '11 Apr' , '12 Apr'],
      values: [37,37.3,37.6]
    },
    isMeasured: true,
    status: 'low',
    type: "Temperature",
    otherTypes : []
  },
  {
    chart: "line",
    chartData: {
      dates: ['10 Apr' , '11 Apr' , '12 Apr'],
      values: [76,77,76.8]
    },
    isMeasured: false,
    status: 'low',
    type: "weight",
    otherTypes : []
  },
];

const OverView: React.FC = () => {
  const [type1Biomarkers, settype1Biomarkers] = useState<ChartDataItem[]>([]);
  const biomarkers = useBiomarkers();

  useEffect(() => {
    const chartData = prepareChartData(biomarkers);

    // Filter biomarkers that have a chart type other than "bar"
    const filteredBiomarkers = chartData.filter(item => item.chart !== "bar");
    settype1Biomarkers(filteredBiomarkers);
  }, [biomarkers]);

  const dataToRender = type1Biomarkers.length > 0 ? type1Biomarkers : fakeBiomarkers;

  return (
    <div className="flex justify-between o w-full bg-black-background gap-5">
      <div className="flex flex-col gap-1 min-w-[340px] max-h-[700px] overflow-auto hidden-scrollBar pb-[200px]">
        {btnInfo.map((item) => (
          <Accordion key={item.text} title={item.text}>
            {item.text === "Appointments History" && <Appointments />}
          </Accordion>
        ))}
      </div>
      <InfoGraphicCenter />
      <div>
        <div className={`flex flex-col gap-2 max-w-[300px] 2xl:max-w-[400px] max-h-[700px] overflow-auto hidden-scrollBar pb-[200px]`}>
          {dataToRender.map((item, i) => (
            <div key={i}>
              <NormalChartCard
                type={item.type}
                isMeasured={item.isMeasured}
                othersTypes={item.otherTypes}
                status={item.status}
                chartData={item.chartData}
                chartType={item.chart}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverView;