import { InfoCard } from "@/components";
import {  useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "symphony-ui";
import BenchmarkModal from "./benchmarkModal";
import { Application } from "@/api";
import { useParams } from "react-router-dom";
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
const treatmentHistory = [
  {
    date: "July 17th, 2024",
    time: "8:12 pm",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 16th, 2024",
    time: "8:12 pm",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 13rd, 2024",
    time: "8:12 pm",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 11rd, 2024",
    time: "8:12 pm",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 9th, 2024",
    time: "8:12 pm",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 8th, 2024",
    time: "8:12 pm",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 7th, 2024",
    time: "8:12 pm",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 6th, 2024",
    time: "8:12 pm",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 5th, 2024",
    time: "9:30 am",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 4th, 2024",
    time: "8:15 am",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 3rd, 2024",
    time: "2:30 pm",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 2nd, 2024",
    time: "11:30 pm",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 1st, 2024",
    time: "11:30 pm",
    description: "Fasting Diet could be changed to a normal...",
  },
  // Add more entries as needed
];

export const TreatmentPlan = () => {
  const theme = useSelector((state: any) => state.theme.value.name);
  const [showHistory, setShowHistory] = useState(false);
  const [treatmentActive, setTreatmentActive] = useState(0);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isDescription, setIsDescription] = useState(true);
  const [isGenerated, setIsGenerated] = useState(false);
 const [planID, setplanID] = useState()
  const { id } = useParams<{ id: string }>();

  const [benchmarks, setBenchmarks] = useState<Benchmark[]>([]);
  const [needFocusBenchmarks, setneedFocusBenchmarks] = useState([])
  const [Description, setDescription] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchData = async () => {
    try {
      const response = await Application.generateTreatmentPlan({
        member_id: Number(id),
      });
      console.log(response);
      setBenchmarks(response.data[0]);
      setplanID(response.data[1])
      setIsGenerated(true);
      const desResponse = await Application.showPlanDescription(Number(id))
      console.log(desResponse);
      setneedFocusBenchmarks(desResponse.data["need focus benchmarks"]);
      setDescription(desResponse.data.description)
    } catch (err) {
      console.log(err);
    }
  };


const onButtonClick = async (planId : any) => {
  try {
    const response = await Application.downloadReport({ treatment_plan_id: planId });
   
    
    let base64String = response.data

    if (!base64String) {
      console.error('Base64 string is undefined. Check the API response structure.');
      return;
    }

    base64String = base64String.replace(/\s/g, '');

  
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: 'application/pdf' });


    const fileURL = window.URL.createObjectURL(blob);

    const alink = document.createElement('a');
    alink.href = fileURL;
    alink.download = 'Benchmark_Assessment_Report.pdf';
    alink.click();
  } catch (error) {
    console.error('Error downloading the PDF:', error);
  }
};
  const toggleDetailsSection = () => setIsDetailsOpen(!isDetailsOpen);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <InfoCard></InfoCard>
      <div className="w-full bg-black-primary border border-main-border px-[6px] py-1 flex items-center gap-3 rounded-md">
        <input
          className="w-full border text-[10px] border-main-border bg-black-secondary rounded-md outline-none text-xs pl-2 py-1 text-primary-text"
          type="text"
          placeholder="Write here..."
        />
        <img src="/Themes/Aurora/icons/send.svg" alt="" />
      </div>
      {isGenerated? (
        <div className="w-full flex gap-2 ">
          <div className="bg-black-primary text-primary-text w-full h-[340px] overflow-x-hidden overflow-y-scroll p-3 rounded-lg space-y-3 border border-main-border">
            <div className="flex justify-between items-center pb-4">
              <h2 className="text-sm font-semibold">Treatment Plan 012</h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onButtonClick(planID)}
                  className={`flex items-center gap-1 bg-black-secondary px-4 py-2 border border-main-border rounded-lg text-primary-text text-xs `}
                >
                  <img
                    src="/Themes/Aurora/icons/document-download.svg"
                    alt=""
                  />
                  Download Report
                </button>
                {!showHistory && (
                  <button
                    onClick={() => setShowHistory(true)}
                    className={`flex items-center gap-1 bg-black-secondary px-4 py-2 border border-main-border rounded-lg text-primary-text text-xs `}
                  >
                    <img src="/Themes/Aurora/icons/clock.svg" alt="" />
                    Show History
                  </button>
                )}

                <Button theme={theme}>
                  <img src="/Themes/Aurora/icons/refresh-2.svg" alt="" />
                  Re-Generate
                </Button>
              </div>
            </div>

            <div
              onClick={() => setIsDescription(!isDescription)}
              className="w-full flex items-center gap-2 cursor-pointer text-sm"
            >
              <img
                src="/Themes/Aurora/icons/chevron-down.svg"
                className={`transition-transform ${
                  isDescription && "rotate-180"
                }`}
                alt=""
              />
              Description
              <div className="h-[1px] w-full bg-secondary-text" />
            </div>
            {isDescription && (
              <div className="w-full space-y-2 text-xs">
                <p className="mt-4 text-primary-text">
                {Description}
                </p>
                <div>
                  Concerning Results:{" "}
                  <span
                    onClick={() => setIsModalOpen(true)}
                    className="underline text-brand-primary-color cursor-pointer"
                  >
                    Detail{" "}
                  </span>
                  <BenchmarkModal isOpen={isModalOpen} onClose={closeModal} />
                </div>
                <ul className="list-disc ml-6 mt-4 text-primary-text">
                 { Array.isArray(needFocusBenchmarks) && needFocusBenchmarks.map((item , i)=>(
                  <li key={i}>{item}</li>
                 ))}
                </ul>
                <div className="w-full flex items-center justify-between mt-4 border-b border-main-border pb-2">
                  <input
                    className="w-full bg-black-primary outline-none text-primary-text pl-2"
                    type="text"
                    placeholder="your comment..."
                  />
                  <Button theme={theme}>Send</Button>
                </div>
              </div>
            )}

            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={toggleDetailsSection}
            >
              <img
                src="/Themes/Aurora/icons/chevron-down.svg"
                className={`${
                  isDetailsOpen ? "rotate-180" : ""
                } transition-transform`}
              />
              <span className="text-sm font-medium">Details</span>
              <div className="h-[1px] w-full bg-secondary-text" />
            </div>
            {isDetailsOpen && (
              <div className="mt-4">
                <div className="grid grid-cols-3 pb-2 border-b border-main-border font-medium text-sm">
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
                        <div className="flex gap-24">
                          {index === 0 ||
                          benchmarks[index - 1].area !== benchmark.area ? (
                            <div className="font-semibold text-xs">
                              {benchmark.area}
                            </div>
                          ) : null}
                          {benchmark.subCategory && (
                            <div className="font-normal text-xs">
                              {benchmark.subCategory}
                            </div>
                          )}
                        </div>
                        <div className="text-xs font-medium">
                          <ul className="space-y-4 ">
                            {benchmark.first12Weeks.dos.map((doItem, i) => (
                              <li key={i}>{doItem}</li>
                            ))}
                          </ul>

                          <ul className="space-y-4 ">
                            {benchmark.first12Weeks.donts.map((dontItem, i) => (
                              <li className="text-nowrap max-w-[250px]" key={i}>
                                {dontItem}{" "}
                                <span className="bg-red-status text-black rounded-full px-2 py-1 ml-1 text-xs font-medium">
                                  Don`t
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-xs space-y-10">
                          <ul className="  space-y-4 ">
                            {benchmark.second12Weeks.dos.map((doItem, i) => (
                              <li key={i}>{doItem}</li>
                            ))}
                          </ul>

                          <ul className=" space-y-4 ">
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
                          </ul>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            )}
          </div>
          {showHistory && (
            <div className="bg-black-primary text-primary-text p-2 rounded-lg h-[340px] overflow-y-scroll space-y-2 border border-main-border w-[35%]">
              <div className="flex justify-between items-center font-medium">
                Treatment Plan History
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-secondary-text hover:text-primary-text"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm text-secondary-text font-medium">
                  Last Week
                </h3>
                {treatmentHistory.map((entry, index) => (
                  <div
                    onClick={() => setTreatmentActive(index)}
                    key={index}
                    className={`${
                      treatmentActive === index && "bg-black-third"
                    } rounded-lg p-2 cursor-pointer space-y-3`}
                  >
                    <div className="w-full flex justify-between items-center">
                      <p className="text-primary-text text-sm font-semibold">
                        {entry.date}
                      </p>
                      <p className="text-secondary-text text-sm">
                        {entry.time}
                      </p>
                    </div>
                    <p className="text-secondary-text text-xs w-full">
                      {entry.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className={
            "flex flex-col items-center justify-center bg-black-primary text-primary-text w-full h-[340px] overflow-y-scroll p-3 rounded-lg space-y-3 border border-main-border"
          }
        >
          <img src={"/images/EmptyState.png"} alt="Empty State" />
          <h1>Nothing to Show</h1>
          <Button
            onClick={fetchData}
            theme={theme}
          >
            <img src="/Themes/Aurora/icons/add-square-fill.svg" alt="Add" />
            Generate
          </Button>
        </div>
      )}
    </div>
  );
};
