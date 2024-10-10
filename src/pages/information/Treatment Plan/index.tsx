/* eslint-disable @typescript-eslint/no-explicit-any */
import { InfoCard } from "@/components";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "symphony-ui";
// import Data from './data.json';
import BenchmarkModal from "./benchmarkModal";
import { useParams } from "react-router-dom";
import "jspdf-autotable";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { AppContext } from "@/store/app";
import RegenerateModal from "./RegenerateModal";
import useModalAutoClose from "@/hooks/UseModalAutoClose";
import { Application } from "@/api";
import { BeatLoader } from "react-spinners";
// import ClinicReport from "@/components/Pdf/ClinicReport";
// import { pdf } from "@react-pdf/renderer";
// import { Application } from "@/api";
// import { blobToBase64 } from "@/help";
type Benchmark = {
  area: string;
  subCategory?: string;
  first12Weeks: {
    dos: string[];
    donts: string[];
  };
  second12Weeks: {
    dos: string[];
    donts: string[];
  };
};
type HistoryEntry = {
  date_text: string;
  formatted_date: string;
  formatted_time: string;
  description: string;
  t_plan_id: string;
};
export const TreatmentPlan = () => {
  const theme = useSelector((state: any) => state.theme.value.name);
  const [showHistory, setShowHistory] = useState(false);
  const [treatmentActive, setTreatmentActive] = useState(0);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isDescription, setIsDescription] = useState(true);
  const [isGenerated, setIsGenerated] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState("");
  const [historyData, setHistoryData] = useState<HistoryEntry[]>([]);

  const [, setplanID] = useState("");
  const { id } = useParams<{ id: string }>();
  const [benchmarks, setBenchmarks] = useState<Benchmark[]>([]);
  const [needFocusBenchmarks, setneedFocusBenchmarks] = useState([]);
  const [Description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Loading, setLoading] = useState(true)
  const { ApplicationManager } = useContext(AppContext);
  // const [ ] = useState('')
  // const navigate = useNavigate(); // Navigation hook
  const handleRegenerateClick = () => {
    setIsRegenerated(true);
    const currentDate = new Date();
    // Format the date as "Month Day, Year"
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setLastUpdateTime(formattedDate);
  };

  const [regenerated, setIsRegenerated] = useState(false);
  const regenerateModalRefrence = useRef(null);
  useModalAutoClose({
    refrence: regenerateModalRefrence,
    close: () => {
      setIsRegenerated(false);
    },
  });

  const toggleDetailsSection = () => setIsDetailsOpen(!isDetailsOpen);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // const fetchReport = async (treatmentPlanId: string) => {

  //   try {
  //     console.log(treatmentPlanId);
  //     // const response = await Application.downloadReport({
  //     //   treatment_plan_id: treatmentPlanId,
  //     // });
  //     // await reportManager.fetchReport(treatmentPlanId);
  //     await reportManager.fetchClinicReport(treatmentPlanId)
  //     // setPdfBase64String(reportManager.getReport());
  //     // console.log(reportManager.getReport());

  //   } catch (error) {
  //     console.error("Error fetching report:", error);
  //   }
  // };
  // useEffect(() => {
  //   const myData = localStorage.getItem("tretmentPlan-" + id);
  //   if (myData) {
  //     const data = JSON.parse(myData);
  //     if (data) {
  //       setBenchmarks(data.treatment_plans[0]);
  //       setplanID(data.treatment_plans[1]);
  //       setDescription(data.description_section.description);
  //       setneedFocusBenchmarks(
  //         data.description_section["need focus benchmarks"]
  //       );
  //       setIsGenerated(true);
  //     }
  //   }
  // }, [id]);
  // const handleViewReport = (reportType : string) => {

  //   localStorage.setItem("selectedReport", reportType);
  //   window.open("#/pdf-viewer", "_blank");

  // };

  useEffect(() => {
    const fetchHistory = async () => {

      try {
        const response = await Application.showHistory({
          member_id: id,
        });
        setHistoryData(response.data);
        const firstPlan = response.data[0]
        // console.log(firstPlan);
        ApplicationManager.addTreatmentPlanID(id as string, firstPlan.t_plan_id );
        fetchTreatmentPlan(firstPlan.t_plan_id)
       if(firstPlan){
        setIsGenerated(true)
       }
       
      } catch (err) {
        console.log(err);
      }
      finally{
        setLoading(false)
       
  
      }
    
    };
    fetchHistory();
  }, [id]);
  useEffect(()=> console.log(historyData), [historyData]
  )
  const fetchTreatmentPlan = async (t_plan_id: string) => {
    try {
      const response = await Application.showTreatmentPlan({
        tplan_id: t_plan_id,
      });
  
      const Data = response.data;
      console.log(Data);
  
      if (Data) {
        setDescription(Data.description_section.description);
        setneedFocusBenchmarks(Data.description_section["need focus benchmarks"]);
        setBenchmarks(Data.treatment_plans);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <InfoCard></InfoCard>
      {regenerated && (
        <>
          <div className="absolute top-0 left-0 z-30 w-full h-full flex justify-center items-center">
            <RegenerateModal
              onGenerate={async (data) => {
                console.log(data);
                if (data) {
                  if (
                    data != "there is no benchmark data for patient" &&
                    data != "Internal Server Error"
                  ) {
                    // localStorage.setItem(
                    //   "tretmentPlan-" + id,
                    //   JSON.stringify(data)
                    // );
                  }
                  // const pdfBlob = await pdf(<ClinicReport type="" values={Data} />).toBlob();

                  // const base64Pdf = await blobToBase64(pdfBlob);

                  setBenchmarks(data.treatment_plans[0]);
                  setplanID(data.treatment_plans[1]);
                  setDescription(data.description_section.description);
                  setneedFocusBenchmarks(
                    data.description_section["need focus benchmarks"]
                  );
                  setIsGenerated(true);
                  const treatmentPlanId = data.treatment_plans[1];
                  console.log(treatmentPlanId);
                  ApplicationManager.addTreatmentPlanID(
                    id as string,
                    treatmentPlanId
                  );
                  // fetchReport(treatmentPlanId);
                } else {
                  setIsGenerated(false); // No data found
                }
              }}
              onClose={() => {
                setIsRegenerated(false);
              }}
              refEl={regenerateModalRefrence}
            ></RegenerateModal>
          </div>
          <div className="w-full h-full bg-black bg-opacity-50 fixed left-0 top-0"></div>
        </>
      )}
      {/* <div className="w-full bg-black-primary border border-main-border px-[6px] py-1 flex items-center gap-3 rounded-md">
        <input
          className="w-full border text-[10px] border-main-border bg-black-secondary rounded-md outline-none text-xs pl-2 py-1 text-primary-text"
          type="text"
          placeholder="Write here..."
        />
        <img src="/Themes/Aurora/icons/send.svg" alt="" />
      </div> */}
      {isGenerated ? (
        <div className="w-full flex gap-2 ">
          <div className="bg-black-primary text-primary-text w-full h-[340px] overflow-x-hidden overflow-y-scroll p-3 rounded-lg space-y-3 border border-main-border">
            <div className="flex justify-between items- pb-4">
              <h2
                className="text-sm font-medium 
              "
              >
                Treatment Plan 012
              </h2>
              <div className="flex items-start space-x-4">
                {/* <Link> */}
                <button
                  onClick={() =>
                    window.open(
                      "/#/ClientReportPage/"+id+"/" +
                        ApplicationManager.getTreatmentPlanId(id as string),
                      "_blank"
                    )
                  }
                  className={`flex items-center gap-1 bg-black-secondary px-4 py-2 border border-main-border rounded-lg text-primary-text text-xs `}
                >
                  <img
                    src="/Themes/Aurora/icons/document-download.svg"
                    alt=""
                  />
                  Download Client Report
                </button>
                {/* </Link> */}
                {/* <Link to={"/ClinicReportPage/"+ApplicationManager.getTreatmentPlanId(id as string)}> */}
                <button
                  onClick={() =>
                    window.open(
                      "/#/ClinicReportPage/" +
                        ApplicationManager.getTreatmentPlanId(id as string),
                      "_blank"
                    )
                  }
                  className={`flex items-center gap-1 bg-black-secondary px-4 py-2 border border-main-border rounded-lg text-primary-text text-xs `}
                >
                  <img
                    src="/Themes/Aurora/icons/document-download.svg"
                    alt=""
                  />
                  Download Report
                </button>
                {/* </Link> */}

                {!showHistory && (
                  <button
                    onClick={() => setShowHistory(true)}
                    className={`flex items-center gap-1 bg-black-secondary px-4 py-2 border border-main-border rounded-lg text-primary-text text-xs `}
                  >
                    <img src="/Themes/Aurora/icons/clock.svg" alt="" />
                    Show History
                  </button>
                )}
                <div className="flex flex-col   gap-1">
                  <Button
                    onClick={handleRegenerateClick}
                    theme={theme}
                    data-width="full"
                  >
                    <img src="/Themes/Aurora/icons/refresh-2.svg" alt="" />
                    Re-Generate
                  </Button>
                  <span
                    className={` ${
                      !lastUpdateTime && "invisible"
                    } text-[9px] font-light `}
                  >
                    Last Update on {lastUpdateTime}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center gap-5 cursor-pointer text-sm font-medium">
              <div
                onClick={() => setIsDescription(!isDescription)}
                className="flex items-center gap-3"
              >
                {" "}
                <img
                  src="/Themes/Aurora/icons/chevron-down.svg"
                  className={`transition-transform ${
                    isDescription && "rotate-180"
                  }`}
                  alt=""
                />
                Description
              </div>

              <div className="h-[1px] w-full bg-secondary-text" />
            </div>
            {isDescription && (
              <div className="w-full space-y-2 text-xs">
                <p className="mt-4 text-primary-text text-xs ">{Description}</p>
                <div className="flex items-center gap-1 text-xs">
                  Needs Focus Benchmarks:{" "}
                  {/* <span
                    onClick={() => setIsModalOpen(true)}
                    className="underline text-brand-primary-color cursor-pointer"
                  >
                    Detail{" "}
                  </span> */}
                  <img
                    className=" transition-transform cursor-pointer w-5 h-5"
                    onClick={() => setIsModalOpen(true)}
                    src="./Themes/Aurora/icons/export-v2.svg"
                    alt=""
                  />
                  <BenchmarkModal isOpen={isModalOpen} onClose={closeModal} />
                </div>
                <ul className="list-disc ml-6 mt-4 text-primary-text text-xs">
                  {Array.isArray(needFocusBenchmarks) &&
                    needFocusBenchmarks.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                </ul>
                {/* <div className="w-full flex items-center justify-between mt-4 border-b border-main-border pb-2">
                  <input
                    className="w-full bg-black-primary outline-none text-primary-text pl-2"
                    type="text"
                    placeholder="your comment..."
                  />
                  <Button theme={theme}>Send</Button>
                </div> */}
              </div>
            )}

            <div className="flex items-center  gap-3 cursor-pointer">
              <div
                onClick={toggleDetailsSection}
                className="flex items-center gap-3"
              >
                <img
                  src="/Themes/Aurora/icons/chevron-down.svg"
                  className={`${
                    isDetailsOpen ? "rotate-180" : ""
                  } transition-transform`}
                />
                <span className="text-sm font-medium">Details</span>
              </div>

              <div className="h-[1px] w-full bg-secondary-text" />
              <img className={`${theme}-icons-edit w-6 h-6`} alt="" />
            </div>
            {isDetailsOpen && (
              <div className="mt-4">
                <div className="grid grid-cols-3  pb-2 border-b border-main-border font-medium text-sm">
                  <div>Benchmark Areas</div>
                  <div>First 12 weeks</div>
                  <div>Second 12 weeks</div>
                </div>
                {Array.isArray(benchmarks) && benchmarks.length > 0
                  ? benchmarks.map((benchmark, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-3 py-2 border-b border-main-border text-sm"
                      >
                        <div className="  flex justify-around w-[65%]   text-xs font-medium">
                          {index === 0 ||
                          benchmarks[index - 1].subCategory !==
                            benchmark.subCategory ? (
                            <div className="text-xs">
                              {benchmark.subCategory}
                            </div>
                          ) : null}
                          {index === 0 ||
                          benchmarks[index - 1].area !== benchmark.area ? (
                            <div className=" flex w-full justify-center items-start  text-xs">
                              {benchmark.area}
                            </div>
                          ) : null}
                        </div>
                        <div className=" ml-7 text-xs overflow-hidden flex flex-col text-left ">
                          <ul className="space-y-4 ">
                            {benchmark.first12Weeks.dos.map((doItem, i) => (
                              <li key={i}>{doItem}</li>
                            ))}
                          </ul>

                          {/* <ul className="space-y-4 ">
                            {benchmark.first12Weeks.donts.map((dontItem, i) => (
                              <li className="text-nowrap max-w-[250px]" key={i}>
                                {dontItem}{" "}
                                <span className="bg-red-status text-black rounded-full px-2 py-1 ml-1 text-xs font-medium">
                                  Don`t
                                </span>
                              </li>
                            ))}
                          </ul> */}
                        </div>
                        <div className=" ml-7 text-xs  overflow-hidden flex flex-col text-left ">
                          <ul className="  space-y-4 ">
                            {benchmark.second12Weeks.dos.map((doItem, i) => (
                              <li key={i}>{doItem}</li>
                            ))}
                          </ul>

                          {/* <ul className=" space-y-4 ">
                            {benchmark.second12Weeks.donts.map(
                              (dontItem, i) => (
                                <li className="text-nowrap" key={i}>
                                  {dontItem}{" "}
                                  <span className="bg-red-status text-black rounded-full px-2 py-1 ml-1 text-xs font-medium">
                                    Don`t
                                  </span>
                                </li>
                              )
                            )}
                          </ul> */}
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            )}
          </div>
          {showHistory && (
            <div className="bg-black-primary text-primary-text p-2 rounded-lg h-[340px] overflow-y-scroll space-y-2 border border-main-border w-[35%]">
              <div className="flex justify-between items-center text-lg font-medium">
                Treatment Plan History
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-secondary-text hover:text-primary-text"
                >
                  ✕
                </button>
              </div>

              <div className="showHistory">
                {historyData.length > 1 &&
                  historyData.map((entry: HistoryEntry, index: number) => (
                    <div key={index} className="space-y-2">
                      {(index === 0 ||
                        historyData[index - 1].date_text !==
                          entry.date_text) && (
                        <h3 className="my-5 text-sm text-secondary-text font-medium">
                          {entry.date_text}
                        </h3>
                      )}
                      <div
                        onClick={() => {
                          setTreatmentActive(index);
                          setplanID(entry.t_plan_id);
                          fetchTreatmentPlan(entry.t_plan_id);
                          ApplicationManager.addTreatmentPlanID(id as string, entry.t_plan_id );

                        }}
                        className={`${
                          treatmentActive === index && "bg-black-third"
                        } rounded-lg p-2 cursor-pointer space-y-3`}
                      >
                        <div className="w-full flex justify-between items-center">
                          <p className="text-primary-text text-sm font-medium">
                            {entry.formatted_date}
                          </p>
                          <div className="text-secondary-text text-xs flex items-center gap-1 ">
                            <img
                              src="./Themes/Aurora/icons/clock2.svg"
                              alt=""
                            />
                            {entry.formatted_time}
                          </div>
                        </div>
                        <p className="text-secondary-text text-sm w-full">
                          {String(entry.description).substring(0, 50) + "..."}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      ) :
      Loading ? (
        <div  className={
          "flex flex-col items-center justify-center bg-black-primary text-primary-text text-xs w-full h-[340px] overflow-y-scroll p-3 rounded-lg space-y-3 border border-main-border"
        }>
          <BeatLoader size={15} color={"#fff"} />
        </div>
      ) : historyData.length < 1 && 
      (
        <div
          className={
            "flex flex-col items-center justify-center bg-black-primary text-primary-text text-xs w-full h-[340px] overflow-y-scroll p-3 rounded-lg space-y-3 border border-main-border"
          }
        >
          <img src={"/images/EmptyState.png"} alt="Empty State" />
          <h1>Nothing to Show</h1>
          <Button
            onClick={() => {
              setIsRegenerated(true);
            }}
            theme={theme}
          >
            <img src="/Themes/Aurora/icons/add-square-fill.svg" alt="Add" />
            Generate
          </Button>
        </div>
      )
    }
    </div>
  );
};
