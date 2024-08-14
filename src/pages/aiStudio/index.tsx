import { SearchBox } from "@/components";
import { useState } from "react";
import { Button } from "symphony-ui";
import { useSelector } from "react-redux";
import { ClientCard } from "./ClientCard";
import { ClientInfo } from "./ClientsInfo";
export const AiStudio = () => {
  const theme = useSelector((state: any) => state.theme.value.name);
  const [navActive, setNavActive] = useState("Copilot");
  const [isStateOpen, setIsStateOpen] = useState(true);
  const [isRecommendationOpen, setIsRecommendationOpen] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(true);
  const [isEngagementOpen, setIsEngagementOpen] = useState(true);
  const [cardActive, setcardActive] = useState("Davide Kemp");
  const toggleStateSection = () => setIsStateOpen(!isStateOpen);
  const toggleRecommendationSection = () =>
    setIsRecommendationOpen(!isRecommendationOpen);
  const toggleAlertSection = () => setIsAlertOpen(!isAlertOpen);
  const toggleEngagementSection = () => setIsEngagementOpen(!isEngagementOpen);

  return (
    <div className="bg-black-background h-fit w-full  overflow-hidden px-5 flex items-start  gap-2 ">
      <div className="w-full flex flex-col  gap-3">
        <div className=" w-full flex gap-2 justify-center items-center">
          <div
            onClick={() => setNavActive("Copilot")}
            className={` cursor-pointer px-4 py-2 rounded-md text-xs ${
              navActive === "Copilot"
                ? "bg-black-third text-primary-text"
                : "text-secondary-text"
            }`}
          >
            Copilot
          </div>
          <div
            onClick={() => setNavActive("Overview")}
            className={` cursor-pointer px-4 py-2 rounded-md text-xs  ${
              navActive === "Overview"
                ? "bg-black-third text-primary-text"
                : "text-secondary-text"
            }`}
          >
            Overview
          </div>
        </div>

        <div className="w-full bg-black-primary border border-main-border px-[6px] py-[2px] flex items-center gap-3 rounded-md">
          <input
            className="w-full border border-main-border bg-black-secondary py-1 rounded-md outline-none text-[10px] text-primary-text"
            type="text"
          />
          <img
            className="cursor-pointer"
            src="/Themes/Aurora/icons/send.svg"
            alt=""
          />
        </div>
        <div className="bg-black-primary text-primary-text p-4 rounded-lg space-y-5">
          <div
            onClick={toggleStateSection}
            className="flex items-center cursor-pointer gap-2 text-sm font-medium "
          >
            <img
              src="/Themes/Aurora/icons/chevron-up.svg"
              className={` transition-transform ${
                !isStateOpen && "rotate-180"
              }`}
              alt=""
            />
            State
            <div className="h-[1px] w-full bg-primary-text" />
          </div>
          {isStateOpen && (
            <div className="text-xs">
              <div className=" max-w-[120px] mt-4 flex justify-center items-center gap-1 bg-brand-secondary-color text-black  py-[2px] rounded-full text-xs font-medium">
                <img src="/Themes/Aurora/icons/tag.svg" alt="" />
                Re-planning
              </div>
              <p className="mt-4 text-secondary-text">
                This patient has an imbalance in the intake and consumption of
                calories and has a travel plan for the next week. He has said
                that during his 5-day trip, he is not able to implement his
                plans and requests a new plan.
              </p>
              <p className="mt-4 text-secondary-text">
                According to the reference below, I am thinking of a Fasting
                Plan that we can re-plan for him so that we can control the
                amount of calories he eats during fasting. We can also suggest
                exercises that keep the amount of calories he eats at a balanced
                level while being comfortable.
              </p>
              <a
                href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4516560/"
                className="mt-2 text-blue-500 underline block"
              >
                https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4516560/
              </a>
            </div>
          )}

          <div
            onClick={toggleRecommendationSection}
            className="text-sm cursor-pointer font-medium flex gap-2 items-center"
          >
            <img
              src="/Themes/Aurora/icons/chevron-up.svg"
              className={` transition-transform ${
                !isRecommendationOpen && "rotate-180"
              } `}
              alt=""
            />{" "}
            Recommendation
            <div className=" h-[1px] w-full bg-primary-text" />
          </div>
          {isRecommendationOpen && (
            <div>
              <ul className="mt-4 space-y-5 text-xs">
                <li className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span>•</span>
                    <span>Fasting Diet</span>
                    <span className="bg-brand-primary-color text-black px-2 py-1 rounded-full text-xs font-medium">
                      Nutrition
                    </span>
                    <span className="text-gray-400">29 July - 4 August</span>
                  </div>
                  <img
                    src="/Themes/Aurora/icons/edit.svg"
                    className={` cursor-pointer`}
                    alt=""
                  />
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span>•</span>
                    <span>Walking 30 minutes a day</span>
                    <span className="bg-orange-status text-black px-2 py-1 rounded-full text-xs font-medium">
                      Activity
                    </span>
                    <span className="text-gray-400">29 July - 4 August</span>
                  </div>
                  <img
                    src="/Themes/Aurora/icons/edit.svg"
                    className={`cursor-pointer  `}
                  />
                </li>
              </ul>
            </div>
          )}
          <div>
            <div
              onClick={toggleAlertSection}
              className="text-sm font-medium cursor-pointer  flex gap-2 items-center"
            >
              <img
                src="/Themes/Aurora/icons/chevron-up.svg"
                className={`  transition-transform ${
                  !isAlertOpen && "rotate-180"
                } `}
                alt=""
              />
              Alert
              <div className=" h-[1px] w-full bg-primary-text" />
            </div>
          </div>

          <div>
            <div
              onClick={toggleEngagementSection}
              className="text-sm font-medium cursor-pointer  flex gap-2 items-center"
            >
              <img
                src="/Themes/Aurora/icons/chevron-up.svg"
                className={`  transition-transform ${
                  !isEngagementOpen && "rotate-180"
                } `}
                alt=""
              />{" "}
              Engagement
              <div className=" h-[1px] w-full bg-primary-text" />
            </div>
          </div>

          <div className="w-full flex justify-end">
            <Button theme="Aurora">
              <img src="/Themes/Aurora/icons/tick-square.svg" alt="" /> Approve
              All
            </Button>
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-1  justify-start w-[22%]">
        <SearchBox theme="Aurora" placeholder="Search for client..." />
        <div className="flex flex-col pr-1 max-h-[531px] overflow-auto">
          {ClientInfo.map((client) => (
            <ClientCard
              key={client.name}
              name={client.name}
              city={client.city}
              picture={client.picture}
              height={client.height}
              weight={client.weight}
              blood={client.blood}
              age={client.age}
              status={client.status}
              cardActive={cardActive}
              setCardActive={setcardActive}
            ></ClientCard>
          ))}
        </div>
      </div>
    </div>
  );
};
