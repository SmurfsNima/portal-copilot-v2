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
  const [cardActive, setcardActive] = useState('Davide Kemp')
  const toggleStateSection = () => setIsStateOpen(!isStateOpen);
  const toggleRecommendationSection = () =>
    setIsRecommendationOpen(!isRecommendationOpen);
  const toggleAlertSection = () => setIsAlertOpen(!isAlertOpen);
  const toggleEngagementSection = () => setIsEngagementOpen(!isEngagementOpen);

  return (
    <div className="bg-black-background w-full h-screen overflow-hidden px-5 pt-5 flex items-start  gap-3 ">
      <div className="w-full flex flex-col gap-3">
        <div className=" w-full flex gap-2 justify-center items-center">
          <div
            onClick={() => setNavActive("Copilot")}
            className={` cursor-pointer px-4 py-3 rounded-md ${
              navActive === "Copilot"
                ? "bg-black-third text-primary-text"
                : "text-secondary-text"
            }`}
          >
            Copilot
          </div>
          <div
            onClick={() => setNavActive("Overview")}
            className={` cursor-pointer px-4 py-3 rounded-md  ${
              navActive === "Overview"
                ? "bg-black-third text-primary-text"
                : "text-secondary-text"
            }`}
          >
            Overview
          </div>
        </div>

        <div className="w-full bg-black-primary border border-main-border px-[6px] py-1 flex items-center gap-3 rounded-md">
          <input
            className="w-full border border-main-border bg-black-secondary rounded-md outline-none text-primary-text"
            type="text"
          />
          <img src="/public/Themes/Aurora/icons/send.svg" alt="" />
        </div>
        <div className="bg-black-primary text-white p-4 rounded-lg space-y-5">
          <div className="flex items-center gap-2 text-lg font-semibold ">
            <img
              onClick={toggleStateSection}
              className={` transition-transform ${
                !isStateOpen && "rotate-180"
              } ${theme}-icons-arrow-up`}
              alt=""
            />
            State
            <div className="h-[1px] w-full bg-primary-text" />
          </div>
          {isStateOpen && (
            <div>
              <div className=" max-w-[130px] mt-4 flex items-center gap-1 bg-brand-secondary-color text-black px-3 py-1 rounded-full text-sm font-medium">
                <img src="/public/Themes/Aurora/icons/tag.svg" alt="" />
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

          <div className="text-lg font-semibold flex gap-2 items-center">
            <img
              onClick={toggleRecommendationSection}
              className={` transition-transform ${
                !isRecommendationOpen && "rotate-180"
              } w-[24px] ${theme}-icons-arrow-up`}
              alt=""
            />{" "}
            Recommendation
            <div className=" h-[1px] w-full bg-primary-text" />
          </div>
          {isRecommendationOpen && (
            <div>
              <ul className="mt-4 space-y-5">
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
                    className="cursor-pointer"
                    src="/public/Themes/Aurora/icons/edit.svg"
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
                    className={`cursor-pointer ${theme}-icons-edit `}
                    
                  />
                </li>
              </ul>
            </div>
          )}
          <div>
            <div className="text-lg font-semibold flex gap-2 items-center">
              <img
                onClick={toggleAlertSection}
                className={` ${theme}-icons-arrow-up transition-transform ${
                  !isAlertOpen && "rotate-180"
                } `}
                alt=""
              />
              Alert
              <div className=" h-[1px] w-full bg-primary-text" />
            </div>
          </div>

          <div>
            <div className="text-lg font-semibold flex gap-2 items-center">
              <img
                onClick={toggleEngagementSection}
                className={` ${theme}-icons-arrow-up  transition-transform ${
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
              {" "}
              <img src="" alt="" />{" "}
              <img className={`${theme}-icons-tick-square`} alt="" /> Approve
              All
            </Button>
          </div>
        </div>
      </div>
      <div className=" flex flex-col  justify-start w-[35%]">
        <SearchBox theme="Aurora" placeholder="Search for client..." />
        <div className="flex flex-col pr-[6px] max-h-[670px] overflow-auto">
          {
            ClientInfo.map((client)=>(
              <ClientCard key={client.name} name={client.name} city={client.city} picture={client.picture} height={client.height} weight={client.weight} blood={client.blood} age={client.age} status={client.status} cardActive={cardActive} setCardActive={setcardActive}></ClientCard>
            ))
          }
        </div>
       
      </div>
    </div>
  );
};
