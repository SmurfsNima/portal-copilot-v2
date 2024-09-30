import { InfoCard } from "@/components";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "symphony-ui";
import BenchmarkModal from "./benchmarkModal";
import { useParams, useNavigate } from "react-router-dom";
import "jspdf-autotable";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { AppContext } from "@/store/app";
import RegenerateModal from "./RegenerateModal";
import useModalAutoClose from "@/hooks/UseModalAutoClose";
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
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDescription, setIsDescription] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState("");

  const [, setplanID] = useState();
  const { id } = useParams<{ id: string }>();
  const [benchmarks, setBenchmarks] = useState<Benchmark[]>([]);
  const [needFocusBenchmarks, setneedFocusBenchmarks] = useState([]);
  const [Description, setDescription] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {reportManager} = useContext(AppContext);
  // const [ ] = useState('')
  const navigate = useNavigate(); // Navigation hook
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
  useEffect(() => {
    const convertImageToBase64 = async () => {
      const response = await fetch("/path/to/your/image.png"); // Update with your image path
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          // setlogoBase64(reader.result);
        }
      };
      reader.readAsDataURL(blob);
    };

    convertImageToBase64();
  }, []);

  const toggleDetailsSection = () => setIsDetailsOpen(!isDetailsOpen);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const fetchReport = async (treatmentPlanId: string) => {
    try {
      console.log(treatmentPlanId);
      
      await reportManager.fetchReport(treatmentPlanId);
      // setPdfBase64String(reportManager.getReport()); 
      // console.log(reportManager.getReport());
      
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };
  useEffect(() => {
    const myData = localStorage.getItem("tretmentPlan-" + id);
    if (myData) {
      const data = JSON.parse(myData);
      if (data) {
        setBenchmarks(data.treatment_plans[0]);
        setplanID(data.treatment_plans[1]);
        setDescription(data.description_section.description);
        setneedFocusBenchmarks(
          data.description_section["need focus benchmarks"]
        );
        setIsGenerated(true);
      }
    }
  }, [id]);
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
                  localStorage.setItem(
                    "tretmentPlan-" + id,
                    JSON.stringify(data)
                  );

                  setBenchmarks(data.treatment_plans[0]);
                  setplanID(data.treatment_plans[1]);
                  setDescription(data.description_section.description);
                  setneedFocusBenchmarks(
                    data.description_section["need focus benchmarks"]
                  );
                  setIsGenerated(true);

                  const treatmentPlanId = data.treatment_plans[1];
                  console.log(treatmentPlanId);
                  
                  fetchReport(treatmentPlanId);
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
                <button
                  className={`flex items-center gap-1 bg-black-secondary px-4 py-2 border border-main-border rounded-lg text-primary-text text-xs `}
                >
                  <img
                    src="/Themes/Aurora/icons/document-download.svg"
                    alt=""
                  />
                  Download Client Report
                </button>
                <button
                  onClick={() => navigate("/pdf-viewer")}
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

            <div className="w-full flex items-center gap-10 cursor-pointer text-sm font-medium">
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

            <div className="flex items-center justify-between gap-10 cursor-pointer">
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
                        <div className="flex gap-24 text-xs font-medium">
                          {index === 0 ||
                          benchmarks[index - 1].area !== benchmark.area ? (
                            <div className=" text-xs">{benchmark.area}</div>
                          ) : null}
                          {benchmark.subCategory && (
                            <div className=" text-xs">
                              {benchmark.subCategory}
                            </div>
                          )}
                        </div>
                        <div className="text-xs overflow-hidden flex flex-col text-left ">
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
                        <div className="text-xs  overflow-hidden flex flex-col text-left ">
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
                      <p className="text-primary-text text-sm font-medium">
                        {entry.date}
                      </p>
                      <p className="text-secondary-text text-xs ">
                        {entry.time}
                      </p>
                    </div>
                    <p className="text-secondary-text text-sm w-full">
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
            onClick={() => {
              setIsRegenerated(true);
            }}
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
