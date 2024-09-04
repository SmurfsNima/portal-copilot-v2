/* eslint-disable @typescript-eslint/no-explicit-any */
import { InfoCard , PopUp } from "@/components";
import { useState  } from "react";
import { useSelector } from "react-redux";
import { Button } from "symphony-ui";
import { actionPlan } from "@/types";
import { ApplicationMock } from "@/api";
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

export const ActionPlan = () => {
  const theme = useSelector((state: any) => state.theme.value.name);
  const [actionPlans, setActionPlans] = useState<actionPlan[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [treatmentActive, setTreatmentActive] = useState(0);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isDescription, setIsDescription] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const toggleDetailsSection = () => setIsDetailsOpen(!isDetailsOpen);
  const fetchData = async () => {
    try {
      const response = await ApplicationMock.getActionPLan();
      setActionPlans(response.data);
      console.log(response.data)
    } catch (err) {
      console.error(err);
    }
  };

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  return (
    <>
      <PopUp isOpen={isPopupOpen} onClose={closePopup} />
    <div className="flex flex-col gap-3 w-full">
      <InfoCard />
      <div className="w-full bg-black-primary border border-main-border px-[6px] py-1 flex items-center gap-3 rounded-md">
        <input
          className="w-full border border-main-border bg-black-secondary rounded-md outline-none pl-2 py-1 text-xs text-primary-text"
          type="text"
          placeholder="Write here..."
        />
        <img src="/Themes/Aurora/icons/send.svg" alt="" />
      </div>
      {actionPlans.length>0?
      <div className="w-full flex gap-2">
        <div className="bg-black-primary text-primary-text w-full h-[340px] overflow-y-scroll p-3 rounded-lg space-y-3 border border-main-border">
          <div className="flex justify-between items-center pb-4">
            <h2 className="text-sm font-semibold">Action Plan 012</h2>
            <div className="flex items-center space-x-4">
              <button
                  onClick={() => setShowHistory(true)}
                  className={`flex items-center gap-1 bg-black-secondary  px-4 py-2 border border-main-border rounded-lg text-primary-text text-xs `}
              >
                <img src="/Themes/Aurora/icons/document-download.svg" alt=""/>
                Download Report
              </button>
              {!showHistory && (
                  <button
                      onClick={() => setShowHistory(true)}
                      className="flex items-center gap-1 bg-black-secondary px-4 py-2 border border-main-border rounded-lg text-primary-text text-xs"
                  >
                    <img src="/Themes/Aurora/icons/clock.svg" alt=""/>
                    Show History
                  </button>
              )}
              <Button onClick={() => fetchData()} theme={theme}>
                <img src="/Themes/Aurora/icons/refresh-2.svg" alt=""/>
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
                This patient has high blood sugar and cholesterol, insomnia at
                night, and sometimes migraine headaches. By referring to the
                mentioned authority, the following plan is considered for this
                patient.
              </p>
              <div>
                Concerning Results:{" "}
                <span
                    className="underline text-brand-primary-color cursor-pointer"
                    onClick={openPopup} // Open PopUp on click
                  >
                    Detail
                  </span>
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
            className="flex items-center gap-2 cursor-pointer text-sm"
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
            <div className="mt-4 space-y-4 text-xs">
              {actionPlans.map((plan, planIndex) =>
                plan.plan_info.monthly_plan.weekly_plan.map((week, weekIndex) =>
                    {
                      console.log("week:",week)
                      return(
                          week.categories.map((category, categoryIndex) => (
                              <div
                                  key={`${planIndex}-${weekIndex}-${categoryIndex}`}
                                  className="space-y-3"
                              >
                                <div className="w-full text-lg font-semibold text-gray-300 flex justify-between items-center gap-2">
                                  <div className="flex items-center gap-3 text-xs">
                                    <div className="bg-black-third rounded-lg p-1">
                                      <div
                                          className={`${theme}-icons-${category.category_name}`}
                                      />
                                    </div>
                                    {category.category_name}
                                  </div>
                                  <img src="/Themes/Aurora/icons/edit.svg" alt="" />
                                </div>
                                <ul className="ml-6 list-disc space-y-2 text-primary-text">
                                  {category.tasks.map((task) => (
                                      <li key={task.task_id}>
                                        <div className="flex items-center w-full gap-1">
                                          <div className="">
                                            {" "}
                                            {task.description}{" "}
                                            <span className="text-secondary-text">
                                  / Instructions:{" "}
                                </span>
                                            {task.how}
                                            <span className="text-secondary-text">
                                  /Based on your :
                                </span>
                                            <div className="text-brand-primary-color text-xs inline-flex gap-1 items-center cursor-pointer">
                                              {" "}
                                              {task.biomarker}
                                              <img
                                                  className="w-4 h-4"
                                                  src="/Themes/Aurora/icons/export.svg"
                                                  alt=""
                                              />
                                            </div>
                                          </div>

                                          {task.tags.map((tag, index) => (
                                              <span
                                                  key={index}
                                                  className={` ${
                                                      tag === "antioxidants"
                                                          ? "bg-[#9381FF]"
                                                          : tag === "lung health"
                                                              ? "bg-[#06C78D] "
                                                              : tag === "oxygenation"
                                                                  ? "bg-[#FDC0A6]"
                                                                  : tag === "mindfulness"
                                                                      ? "bg-[#86D8E8]"
                                                                      : "bg-[#FBAD37]"
                                                  } text-nowrap text-black-background px-4 py-1 rounded-full text-xs font-medium`}
                                              >
                                  {tag}
                                </span>
                                          ))}
                                        </div>
                                      </li>
                                  ))}
                                </ul>
                              </div>
                          ))

                      )
                    }
                )
              )}
            </div>
          )}
        </div>

        {showHistory && (
          <div className="bg-black-primary text-primary-text p-2 rounded-lg space-y-2 border border-main-border w-[35%]">
            <div className="flex justify-between items-center font-medium text-lg">
              Action Plan History
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
                    <p className="text-secondary-text text-sm">{entry.time}</p>
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
  :
          (<div className={"flex flex-col items-center justify-center bg-black-primary text-primary-text w-full h-[340px] overflow-y-scroll p-3 rounded-lg space-y-3 border border-main-border"}>
            <img src={"/images/EmptyState.png"}/>
            <h1>Nothing to Show</h1>
            <Button onClick={()=>fetchData()} theme={theme}>
              <img src="/Themes/Aurora/icons/add-square-fill.svg" alt="" />
              Generate
            </Button>
          </div>)
      }
    </div>
    </>
  );
};
