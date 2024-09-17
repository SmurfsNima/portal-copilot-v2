import { InfoCard } from "@/components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "symphony-ui";
import BenchmarkModal from "./benchmarkModal";
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
  const [treatmentPlanDataApi, setTreatmentPlanDataApi] = useState<string[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onButtonClick = () => {
    // using Java Script method to get PDF file
    fetch("Benchmark Assessment Report Template (2).pdf").then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);

        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "Benchmark Assessment Report Template.pdf";
        alink.click();
      });
    });
  };
  const toggleDetailsSection = () => setIsDetailsOpen(!isDetailsOpen);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const benchmarks = [
    {
      area: "Physiological",
      subCategory: "Time Priorities",
      first12Weeks: "Make time for exercise and daily walking.",
      second12Weeks: "Make time for exercise and daily walking. Don't",
    },
    {
      area: "Physiological",
      subCategory: "Recovery",
      first12Weeks: "",
      second12Weeks: "Increase sleep time and quality",
    },
    {
      area: "Physiological",
      subCategory: "Metabolic Function",
      first12Weeks: "Get blood tests as benchmark. Don't",
      second12Weeks: "",
    },
    {
      area: "Nutrition",
      first12Weeks: "Improve protein intake and reduce fat intake with anti-Reflux diet",
      second12Weeks: "Adoption of rules based nutrition",
    },
    {
      area: "Body Composition",
      first12Weeks: "Begin body fat reduction by managing calories and activity levels",
      second12Weeks: "Get to 20% body fat while retaining muscle mass",
    },
    {
      area: "Fitness",
      subCategory: "Daily Activity",
      first12Weeks: "Increase daily step count",
      second12Weeks: "Increase to > 10k steps per day. Don't",
    },
    {
      area: "Fitness",
      subCategory: "Stability",
      first12Weeks: "Build posterior and core to improve posture",
      second12Weeks: "Improve foot strength, Build glute and hamstring mass",
    },
    {
      area: "Fitness",
      subCategory: "Mobility",
      first12Weeks: "Squat and hinge movement patterns",
      second12Weeks: "Left shoulder. Don't",
    },
    {
      area: "Flexibility",
      first12Weeks: "Hamstring, hips, lats and shoulders",
      second12Weeks: "",
    },
    {
      area: "Bodyweight max strength",
      first12Weeks: "Develop strong foundational movement patterns",
      second12Weeks: "Increase capability to good benchmark level. Don't",
    },
    {
      area: "Emotional",
      subCategory: "Stress",
      first12Weeks: "Adopt tools to reduce stress",
      second12Weeks: "Increase to > 10k steps per day. Don't",
    },
  ];
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
      {treatmentPlanDataApi.length > 0 ? (
        <div className="w-full flex gap-2">
          <div className="bg-black-primary text-primary-text w-full h-[340px] overflow-y-scroll p-3 rounded-lg space-y-3 border border-main-border">
            <div className="flex justify-between items-center pb-4">
              <h2 className="text-sm font-semibold">Treatment Plan 012</h2>
              <div className="  flex items-center space-x-4">
                <button
                  onClick={() => onButtonClick()}
                  className={`flex items-center gap-1 bg-black-secondary  px-4 py-2 border border-main-border rounded-lg text-primary-text text-xs `}
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
                    className={`flex items-center gap-1 bg-black-secondary  px-4 py-2 border border-main-border rounded-lg text-primary-text text-xs `}
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
              className=" w-full flex items-center gap-2 cursor-pointer text-sm"
            >
              <img
                src="/Themes/Aurora/icons/chevron-down.svg"
                className={` transition-transform ${
                  isDescription && "rotate-180"
                } `}
                alt=""
              />
              Description
              <div className="h-[1px] w-full bg-secondary-text" />
            </div>
            {isDescription && (
              <div className="w-full space-y-2 text-xs">
                <p className="mt-4 text-primary-text ">
                  This patient has high blood sugar and cholesterol, insomnia at
                  night, and sometimes migraine headaches. By referring to the
                  mentioned authority, the following plan is considered for this
                  patient.
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
                  <li>Sex Hormones</li>
                  <li>Growth/IGF-I Hormones</li>
                  <li>Free Testosterone</li>
                  <li>Major Essential Minerals</li>
                  <li>Liver Function</li>
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
                className={` ${
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
          {benchmarks.map((benchmark, index) => (
            <div key={index} className="grid grid-cols-3 py-2 border-b border-main-border text-sm">
              <div className="flex  gap-28">
                {index === 0 || benchmarks[index - 1].area !== benchmark.area ? (
                  <div className="font-semibold text-xs">{benchmark.area}</div>
                ) : null}
                {benchmark.subCategory && <div className="font-normal text-xs">{benchmark.subCategory}</div>}
              </div>
              <div>{benchmark.first12Weeks}</div>
              <div className="flex items-center">
                {benchmark.second12Weeks}
                {benchmark.second12Weeks.includes("Don't") && (
                  <span className="ml-2 bg-red-status text-black px-2 py-1 rounded-full text-xs font-medium">
                    Don't
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
          </div>
          {showHistory && (
            <div className="bg-black-primary text-primary-text p-2 rounded-lg h-[340px] overflow-y-scroll space-y-2 border border-main-border w-[35%] ">
              <div className="flex justify-between items-center font-medium">
                Treatment Plan History
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-secondary-text hover:text-primary-text"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2  ">
                <h3 className=" text-sm text-secondary-text font-medium">
                  Last Week
                </h3>
                {treatmentHistory.map((entry, index) => (
                  <div
                    onClick={() => setTreatmentActive(index)}
                    key={index}
                    className={` ${
                      treatmentActive === index && "bg-black-third"
                    }  rounded-lg p-2 cursor-pointer space-y-3`}
                  >
                    <div className="w-full flex justify-between items-center">
                      {" "}
                      <p className=" text-primary-text text-sm font-semibold">
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
          <img src={"/images/EmptyState.png"} />
          <h1>Nothing to Show</h1>
          <Button
            onClick={() => setTreatmentPlanDataApi((prv) => [...prv, "hi"])}
            theme={theme}
          >
            <img src="/Themes/Aurora/icons/add-square-fill.svg" alt="" />
            Generate
          </Button>
        </div>
      )}
    </div>
  );
};
