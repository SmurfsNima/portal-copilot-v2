import { useState } from "react";
import { useSelector } from "react-redux";
import { TabsWrapper, InfoCard, SearchBox } from "@/components";
import { Button } from "symphony-ui";
import { DoughnutChart } from "@/components/charts";
import { RightChartCard } from "./RightChartcard";
// import { SmallChartCard } from "@/components/chartCard/smallChartCard";
import { useDiagnosis } from "@/hooks";
// import { prepareDiagnosisData } from "@/utils/status";
import { getStatusBgColorClass } from "@/utils/status";
const TabsInfo = [
  {
    text: "All",
    path: "",
  },
  {
    text: "Genomics",
    path: "",
    number: 4,
  },
  {
    text: "Epigenomics",
    path: "",
    number: 0,
  },
  {
    text: "Proteomics",
    path: "",
    number: 1,
  },
  {
    text: "Metabolomics",
    path: "",
    number: 2,
  },
  {
    text: "Microbiomics",
    path: "",
    number: 1,
  },
];
export const Diagnosis = () => {
  const theme = useSelector((state: any) => state.theme.value.name);
  const diagnosis = useDiagnosis();
  // const preparedDiagnosis = prepareDiagnosisData(diagnosis);

  const [active, setActive] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(true);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  console.log(diagnosis);

  const activeDiagnosis = diagnosis?.find(
    (diag) => diag.information.name === active
  );
  const relatedDiagnoses = diagnosis?.filter(
    (diag) => diag.information.name !== active
  );
  const activeStatus = activeDiagnosis?.information.data.value.status || "";
 
  return (
    <div className=" w-full h-full flex flex-col  overflow-hidden  gap-3 ">
      <InfoCard></InfoCard>
      <div className=" flex     items-center gap-2">
        <SearchBox
          theme="Aurora"
          placeholder="Quick alphabetical search for biomarkers"
        />
        <div className="rounded-xl bg-black-primary border border-main-border flex text-xs text-primary-text">
          <div className="border-r border-main-border px-4 py-1">
            <div
              className={` ${getStatusBgColorClass(
                activeStatus,
                "low"
              )} py-[10px] px-6 rounded-2xl`}
            >
              low
            </div>
          </div>
          <div className="border-r border-main-border px-4 py-1">
            <div
              className={` ${getStatusBgColorClass(
                activeStatus,
                "medium"
              )} py-[10px] px-6 rounded-2xl`}
            >
              Medium
            </div>
          </div>
          <div className="px-4 py-1">
            <div
              className={` ${getStatusBgColorClass(
                activeStatus,
                "high"
              )} py-[10px] px-6 rounded-2xl`}
            >
              Critical
            </div>
          </div>
        </div>
      </div>
      <TabsWrapper TabsInfo={TabsInfo} />
      <div className="flex   w-full gap-5">
        <div
          id="charts-container"
          className={`w-full ${
            active
              ? "grid-cols-1  max-w-[330px] gap-10 h-full  "
              : " grid-cols-4"
          } grid  gap-3  `}
        >
          <div
            className={`flex  ${
              active ? "flex-row" : "flex-col"
            }  gap-5 w-full `}
          >
            <div
              onClick={() => setActive("chat")}
              className={` ${
                active && "hidden"
              } cursor-pointer flex justify-center items-center gap-2 bg-brand-primary-color rounded-xl text-sm font-medium px-8 py-4`}
            >
              <img className={`${theme}-icons-stars`} alt="" />{" "}
              <h2
                className={`${
                  active && "hidden"
                } text-sm font-medium text-black-primary`}
              >
                Analyze by AI-Copilot
              </h2>
            </div>

            <div
              onClick={() => setActive(null)}
              className={` bg-black-primary rounded-xl flex items-center justify-center px-5  ${
                active ? "" : "hidden"
              }`}
            >
              <img className={`${theme}-icons-arrow-left`} />
            </div>

            <div
              id="custom-border"
              className={`${
                active ? "px-8 py-4" : "px-12 py-8"
              } text-nowrap w-full  flex justify-center items-center gap-2 text-white cursor-pointer custom-border`}
            >
              <img className={`${theme}-icons-Add`} alt="" />
              <h2 className="text-xs font-medium text-secondary-text">
                Add New Biomarker
              </h2>
            </div>
          </div>

          {/* {preparedDiagnosis?.map((item, i) => {
            console.log(item);

            return (
              <SmallChartCard
                active={active}
                setActive={setActive}
                key={i}
                type={item.information.name}
                chartData={{
                  dates: item.information.data.date,
                  values: item.information.data.value.value,
                  chart: item.information.data.
                }}
              />
            );
          })} */}
        </div>
        {active && (
          <div className=" w-full flex flex-col gap-3">
            <div className="flex  gap-6 w-full justify-between  ">
              <div className="px-6 pt-6 pb-2 bg-black-primary w-full h-fit max-h-[556px]    rounded-2xl border border-main-border">
                <h4 className="font-medium text-primary-text">
                  Diagnosis Details
                </h4>
                <div className="flex justify-center gap-3 mt-5">
                  <div className="flex flex-col items-center justify-center p-3 gap-2 rounded-lg bg-black-third text-orange-status ">
                    <div className=" bg-black-primary rounded-2xl px-3 py-1">
                      {activeDiagnosis?.information.data.patient_value}mg/dl
                    </div>
                    <h6 className="text-xs font-medium">Patient Value</h6>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 gap-2 rounded-lg bg-black-third text-brand-primary-color ">
                    <div className=" bg-black-primary rounded-2xl px-3 py-1 text-sm text-nowrap">
                      {`${activeDiagnosis?.information.data.normal_range[0]}-${activeDiagnosis?.information.data.normal_range[1]}`}{" "}
                      mg/dl
                    </div>
                    <h6 className="text-xs font-medium">Normal Range</h6>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 gap-2 rounded-lg bg-black-third text-brand-secondary-color ">
                    <div className=" bg-black-primary rounded-2xl px-3 py-1">
                      {activeDiagnosis?.information.data.avg_age_group_value}
                      mg/dl
                    </div>
                    <h6 className="text-xs font-medium">Avg Age Group</h6>
                  </div>
                </div>
                <div className="text-secondary-text flex items-center gap-5 my-4">
                  Show more details{" "}
                  <img
                    className={` ${theme}-icons-arrow-up ${
                      !showDetails && "rotate-180"
                    }`}
                    onClick={toggleDetails}
                    width={8}
                    alt=""
                  />
                </div>
                {showDetails && (
                  <div className="flex flex-col gap-4 text-primary-text">
                    <div className="w-full h-[1px] rounded-full bg-secondary-text" />
                    <div className="w-full flex justify-between  items-center">
                      Diagnosis Type{" "}
                      <div className="bg-brand-primary-color px-3 py-1 rounded-2xl text-black-background text-xs font-normal">
                        {activeDiagnosis?.information.data.type}
                      </div>
                    </div>
                    <div className="w-full flex justify-between  items-center">
                      Diagnosis Severity{" "}
                      <div className="bg-red-status px-3 py-1 rounded-2xl text-black-background text-xs font-normal">
                        {activeDiagnosis?.information.data.severity}
                      </div>
                    </div>
                    <div className="w-full flex justify-between  items-center">
                      Date of Diagnosis{" "}
                      <div className="bg-black-third px-3 py-1 rounded-2xl text-primary-text text-xs font-normal">
                        {activeDiagnosis?.information.data.diagnosis_date}
                      </div>
                    </div>

                    <div className="flex justify-center  w-full ">
                      <DoughnutChart
                        patientValue={
                          activeDiagnosis?.information.data.patient_value
                        }
                        normalRange={
                          activeDiagnosis?.information.data.normal_range
                        }
                        avgAgeGroupValue={
                          activeDiagnosis?.information.data.avg_age_group_value
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="px-6 pt-3 pb-2 bg-black-primary w-full max-w-[492px] h-fit  max-h-[502px]   rounded-2xl border border-main-border">
                <h4 className="font-medium text-primary-text">
                  Related Biomarkers
                </h4>
                <div
                  id="copilot-chat"
                  className=" w-full  flex  flex-col items-start justify-start mt-4 gap-4 h-full max-h-[445px] overflow-auto  "
                >
                  {relatedDiagnoses.map((diagnosis) => (
                    <RightChartCard
                      type={diagnosis.information.name}
                      chartData={{
                        dates: diagnosis.information.data.date,
                        values: diagnosis.information.data.value.value,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            {active && (
              <div className="bg-black-primary w-full h-full max-h-[110px]  flex flex-col  rounded-2xl border border-main-border px-6 pt-3 pb-2 ">
                <div className="flex gap-1">
                  <img className={`${theme}-icons-logo`} width={24} alt="" />
                  <h2 className="text-primary-text text-14 font-medium">
                    AI-Copilot
                  </h2>
                </div>
                <div className=" mt-6 flex w-full justify-between items-center  ">
                  <h5 className="text-secondary-text text-sm font-normal">
                    5 Biomarkers need updated information. Send notification to
                    patient?
                  </h5>
                  <div className="flex gap-3 items-center  ">
                    <Button theme={theme + "-secondary"}>
                      <img className={`${theme}-icons-openbook`} alt="" />
                      Learn more
                    </Button>
                    <Button theme={theme} onClick={() => setActive("chat")}>
                      Get started
                      <img className={`${theme}-icons-arrow-right`} />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
