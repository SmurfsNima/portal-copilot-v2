import { InfoCard } from "@/components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "symphony-ui";
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
  const [showHistory, setShowHistory] = useState(false);
  const [treatmentActive, setTreatmentActive] = useState(0);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isDescription, setIsDescription] = useState(true);
  const toggleDetailsSection = () => setIsDetailsOpen(!isDetailsOpen);
  return (
    <div className="flex flex-col gap-3 w-full">
      <InfoCard></InfoCard>
      <div className="w-full bg-black-primary border border-main-border px-[6px] py-1 flex items-center gap-3 rounded-md">
        <input
          className="w-full border border-main-border bg-black-secondary rounded-md outline-none  pl-2 py-1 text-xs text-primary-text"
          type="text"
          placeholder="Write here..."
        />
        <img className={`${theme}-icons-send`} alt="" />
      </div>
      <div className="w-full flex gap-2">
        <div className="bg-black-primary text-primary-text w-full p-3 rounded-lg space-y-3 border border-main-border">
          <div className="flex justify-between items-center pb-4">
            <h2 className="text-sm font-semibold">Action Plan 012</h2>
            <div className="  flex items-center space-x-4">
              {!showHistory && (
                <button
                  onClick={() => setShowHistory(true)}
                  className={`flex items-center gap-1 bg-black-secondary  px-4 py-2 border border-main-border rounded-lg text-primary-text text-xs `}
                >
                  <img className={`${theme}-icons-history`} alt="" />
                  Show History
                </button>
              )}

              <Button theme={theme}>
                <img className={`${theme}-icons-update`} alt="" />
                Re-Generate
              </Button>
            </div>
          </div>

          <div className=" w-full flex items-center gap-2 cursor-pointer text-sm">
            <img
              onClick={() => setIsDescription(!isDescription)}
              className={` transition-transform ${
                isDescription && "rotate-180"
              }  w-6 ${theme}-icons-arrow-down`}
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
                <span className="underline text-brand-primary-color">
                  Detail{" "}
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
                  className="w-full bg-black-primary text-primary-text pl-2"
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
              className={` ${theme}-icons-arrow-down ${
                isDetailsOpen ? "rotate-180" : ""
              } transition-transform w-6`}
            />
            <span className="text-sm font-medium">Details</span>
            <div className="h-[1px] w-full bg-secondary-text" />
          </div>
          {isDetailsOpen && (
            <div className="mt-4 space-y-4 text-xs">
              <div className="space-y-3">
                <div className=" w-full text-lg font-semibold text-gray-300 flex justify-between  items-center gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    {" "}
                    <div className="bg-black-third rounded-lg p-1">
                      <img className={`${theme}-icons-nutrition`} alt="" />
                    </div>
                    Nutrition
                  </div>

                  <img className={`${theme}-icons-edit`} alt="" />
                </div>
                <ul className=" ml-6 list-disc space-y-2 text-primary-text">
                  <li>
                    <div className="flex items-center w-full gap-3">
                      <div className="">
                        {" "}
                        Omeprazole (Oral Pill) 40 MG/
                        <span className="text-secondary-text">
                          Ingredient:
                        </span>{" "}
                        omeprazole/{" "}
                        <span className="text-secondary-text">
                          Instructions:{" "}
                        </span>
                        1am
                      </div>

                      <span className="bg-green-status text-black-background px-4 py-1 rounded-full text-xs font-medium">
                        Supplement
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="flex w-full gap-3">
                      <div>
                        {" "}
                        Vitamin C 500 mg
                        <span className="text-secondary-text">
                          Instructions:
                        </span>{" "}
                        Take two a day first thing in the morning/
                      </div>

                      <span className="bg-green-status text-black-background px-4 py-1 rounded-full text-xs font-medium">
                        Supplement
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="flex w-full gap-3">
                      <div className="flex">
                        TA-65 500 IU/{" "}
                        <span className="text-secondary-text">
                          Instructions:
                        </span>{" "}
                        Take two a day first thing in the morning/{" "}
                        <span className="text-secondary-text ">
                          Based on your:
                        </span>{" "}
                        <div className="ml-1 flex items-center gap-2 text-brand-primary-color">
                          TelomerAge
                          <img className={`${theme}-icons-export`} alt="" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {" "}
                        <span className="bg-[#FDC0A6] text-black-background px-4 py-1 rounded-full text-xs font-medium">
                          Diet
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex w-full gap-3">
                      <div className="flex">
                        stradiol 6 mg/ml cream 30 ml Topi-pump/
                        <span className="text-secondary-text">
                          Instructions:
                        </span>{" "}
                        Apply 2 pumps daily after showering/
                        <span className="text-secondary-text ">
                          Based on your:
                        </span>{" "}
                        <div className="ml-1 flex items-center gap-2 text-brand-primary-color">
                          Estradiol{" "}
                          <img className={`${theme}-icons-export`} alt="" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {" "}
                        <span className="bg-[#9381FF] text-black-background px-4 py-1 rounded-full text-xs font-medium">
                          Hormone Optimization
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex w-full gap-3">
                      <div className="flex">
                        Continue 5.2 diet /
                        <span className="text-secondary-text">Notes:</span> Try
                        also to substitute healthy fats such as avocado and fish
                        for meat and dairy fats/
                        <span className="text-secondary-text ">
                          Based on your:
                        </span>{" "}
                        <div className="ml-1 flex items-center gap-2 text-brand-primary-color">
                          : LDL Cholesterol{" "}
                          <img className={`${theme}-icons-export`} alt="" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {" "}
                        <span className="bg-[#FDC0A6] text-black-background px-4 py-1 rounded-full text-xs font-medium">
                          Diet
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="space-y-6">
                <div className="text-lg font-semibold text-primary-text w-full flex justify-between items-center gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="bg-black-third rounded-lg p-1">
                      <img className={`${theme}-icons-mind `} alt="" />
                    </div>
                    Mind
                  </div>
                  <img className={`${theme}-icons-edit`} alt="" />
                </div>
                <ul className=" ml-6 list-disc space-y-1 text-primary-text">
                  <li>
                    <div className="flex w-full gap-3">
                      <div className="">
                        Paced breathing with Inner Balance or Muse/
                        <span className="text-secondary-text">Notes:</span>{" "}
                        While your BP and arterial stiffness are improved since
                        restarting the lisinopril, you could gradually reduce
                        the need for medication with 3-5 times per week
                        breathing exercises and-or meditation/
                        <div className="flex">
                          <span className="text-secondary-text ">
                            Based on your:
                          </span>{" "}
                          <div className="ml-1 flex items-center gap-2 text-brand-primary-color">
                             Augmentation Pressure{" "}
                            <img className={`${theme}-icons-export`} alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {" "}
                        <span className="bg-[#86D8E8] text-black-background px-4 py-1 rounded-full text-xs font-medium">
                          Lifestyle
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex justify-between w-full gap-3">
                      <div className="">
                        Continue smoking abstinence/
                        <span className="text-secondary-text">Notes:</span>{" "}
                        Since you quit smoking, your FEV1 has continued to
                        improve/
                        <div className="flex">
                          <span className="text-secondary-text ">
                            Based on your:
                          </span>{" "}
                          <div className="ml-1 flex items-center gap-2 text-brand-primary-color">
                             FEV1 Percent Predicted{" "}
                            <img className={`${theme}-icons-export`} alt="" />
                          </div>
                        </div>
                      </div>
                      <div className=" flex items-center gap-2">
                        <span className="bg-red-status text-black-background px-4 py-1 rounded-full text-xs font-medium">
                          Don’t
                        </span>
                        <span className="bg-[#86D8E8] text-black-background px-4 py-1 rounded-full text-xs font-medium">
                          Lifestyle
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="space-y-6">
                <div className="text-lg font-semibold text-primary-text w-full flex justify-between items-center gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="bg-black-third rounded-lg p-1">
                      <img className={`${theme}-icons-activity`} alt="" />
                    </div>
                    Activity
                  </div>
                  <img className={`${theme}-icons-edit`} alt="" />
                </div>
                <ul className=" ml-6 list-disc space-y-1 text-primary-text">
                  <li>
                    <div className="flex w-full justify-between">
                        <div className="flex gap-1">
                      Follow HIIT program for 4 weeks/
                      <div className="text-secondary-text flex gap-1">
                        Based on your:
                        <div className="flex items-center gap-2 text-brand-primary-color">
                            Body Mass Index <img className={`${theme}-icons-export`} alt="" />
                        </div>
                        </div>
                      </div>
                      <span className="bg-[#FBAD37] text-black-background px-4 py-1 rounded-full text-xs font-medium">
                        Exercise
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="flex w-full justify-between gap-3">
                      <div className="flex gap-1">
                        {" "}
                        Metabolic Overdrive HIIT /
                        <span className="text-secondary-text">
                        Instructions:
                        </span>{" "}
                        Three times a week/
                        <div className="text-secondary-text flex gap-1">
                        Based on your:
                        <div className="flex items-center gap-1 text-brand-primary-color">
                            CardioAge
                            <img className={`${theme}-icons-export`} alt="" />
                        </div>
                        </div>
                       
                      </div>

                      <span className="bg-[#FBAD37] text-black-background px-4 py-1 rounded-full text-xs font-medium">
                          Exercise
                        </span>
                    </div>
                  </li>
                  <li>
                    <div className="flex w-full justify-between">
                      Don’t lead a sedentary lifestyle; try to incorporate
                      movement throughout the day.
                      <div className="flex items-center gap-2">
                        {" "}
                        <span className="bg-[#FBAD37] text-black-background px-4 py-1 rounded-full text-xs font-medium">
                          Exercise
                        </span>
                        <span className="bg-red-status text-black-background px-4 py-1 rounded-full text-xs font-medium">
                          Don`t
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="space-y-6">
                <div className="text-lg font-semibold text-primary-text w-full flex justify-between items-center gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="bg-black-third rounded-lg p-1">
                      <img className={`${theme}-icons-sleep`} alt="" />
                    </div>
                    Sleep
                  </div>
                  <img className={`${theme}-icons-edit`} alt="" />
                </div>
                <ul className=" ml-6 list-disc space-y-1 text-primary-text">
                  <li>
                    <div className="flex justify-between w-full gap-3">
                      <div className="flex">
                        Do not sleep during the day/
                        <div className="flex">
                          <span className="text-secondary-text ">
                            Based on your:
                          </span>{" "}
                          <div className="ml-1 flex items-center gap-2 text-brand-primary-color">
                            Insomnia
                            <img className={`${theme}-icons-export`} alt="" />
                          </div>
                        </div>
                      </div>
                      <div className=" flex items-center gap-2">
                        <span className="bg-red-status text-black-background px-4 py-1 rounded-full text-xs font-medium">
                          Don’t
                        </span>
                        <span className="bg-[#B8B8FF] text-black-background px-4 py-1 rounded-full text-xs font-medium">
                          Relaxation
                        </span>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="w-full flex items-center justify-between">
                      <div className="flex w-full">
                        6-8 hours of sleep during the night/{" "}
                        <span className="text-secondary-text">Note:</span>Take a
                        shower and drink a glass of water before going to bed
                      </div>
                      <span className="bg-[#B8B8FF] text-black-background px-4 py-1 rounded-full text-xs font-medium">
                        Relaxation
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
        {showHistory && (
          <div className="bg-black-primary text-primary-text p-2 rounded-lg space-y-2 border border-main-border w-[35%] ">
            <div className="flex justify-between items-center font-medium text-lg">
              Action Plan History
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
    </div>
  );
};
