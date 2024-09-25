import { useState, useEffect } from "react";
import { btnInfo } from "./Data";
import { Accordion, Appointments } from "@/components";
import { InfoGraphicCenter } from "./infoGraphicCenter";
import { NormalChartCard } from "@/components/chartCard/normalChartCard";
import { useBiomarkers } from "@/hooks";
import { prepareChartData } from "@/utils/status";
import { ChartDataItem } from "@/types";
import { Application } from "@/api";
import { useParams } from "react-router-dom";
const fakeBiomarkers = [
  {
    chart: "line",
    chartData: {
      dates: [],
      values: []
    },
    status: '',
    isMeasured: false,
    type: "Heart Rate",
    otherTypes : []
  },
  {
    chart: "line",
    chartData: {
      dates: ['10 Apr' , '11 Apr' , '12 Apr'],
      values: []
    },
    isMeasured: false,
    
    type: "Temperature",
    otherTypes : []
  },
  {
    chart: "line",
    chartData: {
      dates: ['10 Apr' , '11 Apr' , '12 Apr'],
      values: []
    },
    isMeasured: false,
    
    type: "weight",
    otherTypes : []
  },
];

const OverView: React.FC = () => {
  const [type1Biomarkers, settype1Biomarkers] = useState<ChartDataItem[]>([]);
  const { id } = useParams<{ id: string }>();

  const [appointments, setAppointments] = useState([])
const [hasFetched, setHasFetched] = useState(false);
  const biomarkers = useBiomarkers();

  useEffect(() => {
    const chartData = prepareChartData(biomarkers);

    // Filter biomarkers that have a chart type other than "bar"
    const filteredBiomarkers = chartData.filter(item => item.chart !== "bar");
    settype1Biomarkers(filteredBiomarkers);
  }, [biomarkers]);

  const dataToRender = type1Biomarkers.length > 0 ? type1Biomarkers : fakeBiomarkers;
  useEffect(() => {
    const fetchData = async () => {
      if (!hasFetched) {
        const response = await Application.getAppoinments(Number(id));
        setAppointments(response.data);
        setHasFetched(true);
      }
    };
    fetchData();
  }, [id, hasFetched]);
  return (
    <div className="flex justify-between o w-full bg-black-background gap-5">
      <div className={` ${appointments.length <1 && 'invisible'} flex flex-col gap-1 min-w-[340px] max-h-[700px] overflow-auto hidden-scrollBar pb-[200px]`}>
        {btnInfo.map((item) => (
          <Accordion key={item.text} title={item.text}>
            {item.text === "Appointments History" && <Appointments appointments={appointments} />}
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