/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivityMenu, ChatBox, InfoCard, SearchBox, StatusMenu } from "@/components";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SmallChartCard } from "@/components/chartCard/smallChartCard";
import { Button } from "symphony-ui";
import { NormalChartCard } from "@/components/chartCard/normalChartCard";
import { useBiomarkers } from "@/hooks";
import { prepareChartData } from "@/utils/status";
// import MethylationChart from "@/components/charts/MethylationChart";
import { ActivityCard } from "./activityCard";
// import PlanManagerModal from "./planModal";
import { Activity, BiomarkerCategory } from "@/types";
import { Application } from "@/api";
import BarChart from "./barChart";
type MenuNames = 'All' | 'Blood Test' | 'Activity' | 'Client Profile' | "Weekly report"|"Fitness"|"Physiological" |"Emotional"
type menuItem  = {
    name:MenuNames
}
const Analysis = () => {
  const { id } = useParams<{ id: string }>();
  const theme = useSelector((state: any) => state.theme.value.name);
  const biomarkers = useBiomarkers();
  console.log(biomarkers);
  const [Alls, SetAlls] = useState<BiomarkerCategory[]>([]);
  const [Fitness, setFitness] = useState<BiomarkerCategory[]>([]);
  const [bloodTests, setBloodTests] = useState<BiomarkerCategory[]>([]);
  const [activitis, setActivitis] = useState<Activity[]>([]);
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await Application.getActivityByPatientId(Number(id));
        console.log(response);
        setActivitis(response.data.activities);

        
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      }
    };

    fetchActivities();
  }, [id]);

  const filterBiomarkersByCartAndType = (
    cartNumber: number,
  ): BiomarkerCategory[] => {
    console.dir(biomarkers)
    if (!biomarkers || biomarkers.length === 0) return [];
    return biomarkers.flatMap((biomarker) =>
      Object.entries(biomarker)
        .filter(([, value]) =>
          value.some(
            (entry) =>{
              console.log(entry)
             return entry.cart === cartNumber 
            }
          )
        )
        .map(([key, value]) => ({ [key]: value }))
    );
  };
  const filterBiomarkersByCart =(cartNumber: number,) => {
    if (!biomarkers || biomarkers.length === 0) return [];
      return biomarkers.flatMap((biomarker) =>
        Object.entries(biomarker)
          .filter(([, value]) =>
            value.some(
              (entry) => entry.cart === cartNumber
            )
          )
          .map(([key, value]) => ({ [key]: value }))
      );    
  }
  useEffect(() => {
    setFitness(filterBiomarkersByCartAndType(1));
    SetAlls(filterBiomarkersByCart(1));
    setBloodTests(filterBiomarkersByCartAndType(1));
  }, [biomarkers]);
  const BloodtestsChartData = prepareChartData(bloodTests);
  const FitnesschartData = prepareChartData(Fitness);
  const AllchartData = prepareChartData(Alls);

  useEffect(() => console.log(bloodTests), [bloodTests]);
  const [messages, setMessages] = useState([
    {
      type: "text",
      content:
        "Weight Management: Maintaining a healthy weight is crucial for controlling blood pressure.",
    },
    {
      type: "text",
      content:
        "Alcohol and Tobacco: Limiting alcohol intake and avoiding tobacco use can significantly reduce blood pressure.",
    },
  ]);
  const [active, setActive] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState("All");
  const [buttonState,] = useState("initial");

  const handleSendMessage = (message: string) => {
    if (message.trim()) {
      setMessages([...messages, { type: "text", content: message }]);
    }
  };
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderChartCards = (data: any) =>
    data.map((item: any, i: number) => {
      return (
        <SmallChartCard
          key={i}
          active={active}
          setActive={setActive}
          isMeasured={item.isMeasured}
          chartData={item.chartData}
          type={item.type}
          chartType={item.chart}
        />
      );
    });
  const cart2Biomarkers = filterBiomarkersByCartAndType(2);
  console.log(cart2Biomarkers);
  const type2BiomarkersData = prepareChartData(cart2Biomarkers);
  
  const activeChartData =
    FitnesschartData.find((data) => data.type === active) ||
    BloodtestsChartData.find((data)=>data.type === active) ||
    type2BiomarkersData.find((data) => data.type === active);

  const [activeStatus,setActiveStatus] = useState("All");
  const [search,setSearch] =useState("")
  const renderCart2Components = () => {
    if(search != ''){
    return type2BiomarkersData.filter(e => e.type.toLowerCase().includes(search.toLowerCase())).filter((e) => activeStatus!='All'? e.status == activeStatus: e).map((biomarker, index) => {
      return (
        <BarChart
          key={index}
          active={active}
          setActive={setActive}
          type={biomarker.type || "Unknown Type"}
          average={biomarker.average || "N/A"}
          current={biomarker.current || "N/A"}
          status={biomarker.status || "Unknown Status"}
        />
      );
    });      
    }
    return type2BiomarkersData.filter((e) => activeStatus!='All'? e.status == activeStatus: e).map((biomarker, index) => {
      return (
        <BarChart
          key={index}
          active={active}
          setActive={setActive}
          type={biomarker.type || "Unknown Type"}
          average={biomarker.average || "N/A"}
          current={biomarker.current || "N/A"}
          status={biomarker.status || "Unknown Status"}
        />
      );
    });
  };
  // const handleClick = () => {
  //   setButtonState("loading");

  //   setTimeout(() => {
  //     setButtonState("completed");
  //   }, 3000);
  // };
  useEffect(() => console.log(buttonState), [buttonState]);
  // const [setIsModalOpen] = useState(false);

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };
  
  useEffect(() => console.log(activeChartData), [activeChartData]);
  console.log(activeChartData)
  const menus:Array<menuItem> = [
    {name :'All' },
    {name :'Fitness' },
    {name :'Physiological' },
    {name :'Emotional' },
    // {name :'Blood Test' },
    // {name :'Activity' },
    // {name :'Client Profile' },
]
  return (
    <>
      <div className="flex flex-col w-full  items-start gap-2">
        <InfoCard></InfoCard>
        <div className="flex w-full justify-between ">
          <ActivityMenu menus={menus} activeMenu={activeMode as any} onChangeMenuAction={(menu) => {
            setActiveMode(menu)
            setActive(null)
          }}></ActivityMenu>

          <div className=" flex    items-center gap-2 ">
            <SearchBox
            changeHandler={(e) =>{
              setSearch(e.target.value)
            }}
              theme="Aurora"
              placeholder="search..."
            />
            <StatusMenu activeStatus={activeStatus as any} onChange={((value) =>setActiveStatus(value))}></StatusMenu>
            {/* <div>
              <div
                className="bg-black-primary border border-main-border w-8 h-8 flex items-center justify-center cursor-pointer"
                onClick={handleOpenModal}
              >
                <img src="/Themes/Aurora/icons/setting-2.svg" alt="Settings" />
              </div>
              <PlanManagerModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                priorities={priorities}
              />
            </div> */}
          </div>
        </div>

        <div className="flex w-full   ">
          <div
            id="charts-container"
            data-active={active && true}
            className={` 
            
            } ${theme}-biomarker-charts-container  ${
              activeMode === "Activity" && "hidden"
            } w-full h-full max-h-[360px] overflow-auto flex flex-wrap justify-start gap-x-[50px]  hidden-scrollBar  `}
          >
            {/* <div
              data-active={active && true}
              className={` ${
                activeMode === "Activity" && "hidden"
              }  ${theme}-biomarker-leftbuttons-container w-[316px]`}
            > */}
              {/* <div
                onClick={handleClick}
                className={`${theme}-biomarker-analyze-button  ${
                  active && "hidden"
                } h-[40px] flex items-center justify-center`}
              >
                {buttonState === "initial" && (
                  <>
                    <div className={`${theme}-icons-stars`} />
                    <h2 className={`${theme}-biomarker-analyze-button-text`}>
                      Analyze by AI-Copilot
                    </h2>
                  </>
                )}
                {buttonState === "loading" && (
                  <div className="flex space-x-2">
                    <span className="animate-ping">•</span>
                    <span className="animate-ping">•</span>
                    <span className="animate-ping">•</span>
                  </div>
                )}
                {buttonState === "completed" && (
                  <>
                    <div className={`${theme}-icons-check`} />
                    <h2 className={`${theme}-biomarker-analyze-button-text`}>
                      Analyze by AI-Copilot completed
                    </h2>
                  </>
                )}
              </div> */}

              <div
                onClick={() => setActive(null)}
                data-active={active && true}
                className={`${theme}-biomarker-back-button `}
              >
                <img className={`${theme}-icons-arrow-left`} />
              </div>

              {/* <div
                id="custom-border"
                data-active={active && true}
                className={`${theme}-biomarker-Addbiomarker-button custom-border h-[145px]`}
              >
                <img className={`${theme}-icons-Add`} alt="" />
                <h2 className={`${theme}-biomarker-Addbiomarker-button-text`}>
                  Add New
                </h2>
              </div> */}
            {/* </div> */}
            {activeMode === "Blood Test" &&
              renderChartCards(BloodtestsChartData)}
            {activeMode === "All" && renderChartCards(AllchartData)}
            {activeMode === "Fitness" && renderChartCards(FitnesschartData)}
            {activeMode === "All" && renderCart2Components()}
          </div>

          <div
            className={`flex flex-col  w-full gap-2 ${
              active === null && "hidden"
            } `}
          >
            {active === "chat" && (
              <div
                className={`${theme}-biomarker-Ai-chat-container min-h-full max-h-[360px]`}
              >
                <div
                  id="copilot-chat"
                  className="max-h-[506px] h-full overflow-y-scroll"
                >
                  <div className={`${theme}-biomarker-Ai-card px-4`}>
                    <div className="flex gap-1">
                      <img
                        className={`${theme}-icons-logo`}
                        width={24}
                        alt=""
                      />
                      <h2
                        className={`${theme}-biomarker-Ai-card-logo-heading-text`}
                      >
                        AI-Copilot
                      </h2>
                    </div>
                    <div className="  flex w-full justify-between items-end ">
                      <h5 className={`${theme}-biomarker-Ai-card-text`}>
                        5 Biomarkers need updated information. Send notification
                        to patient?
                      </h5>
                      <div className="flex gap-3 items-center">
                        <Button theme={theme + "-secondary"}>
                          <img className={`${theme}-icons-openbook`} alt="" />
                          Learn more{" "}
                        </Button>
                        <Button theme={theme} onClick={() => setActive("chat")}>
                          Get started{" "}
                          <img
                            className={`${theme}-icons-arrow-right`}
                            alt=""
                          />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`${theme}-biomarker-Ai-chat-text`}
                    >
                      {message.content}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <ChatBox handleSendMessage={handleSendMessage} />
              </div>
            )}
            {/* {activeMode === "Blood Test" && active !== "chat" && (
              <div className="w-full max-h-[400px]  2xl:max-h-[600px]   bg-black-primary border border-main-border px-12 py-3  flex flex-col gap-3 text-primary-text rounded-lg">
                <div className="flex  items-start gap-4">
                  <div className="bg-black-background  rounded-lg flex items-center justify-center p-1">
                    {" "}
                    <img className={`${theme}-icons-Temperature`} alt="" />
                  </div>

                  <div className="flex flex-col ">
                    <div className="font-medium flex gap-3">
                      Percentage of Methylated Cytosines:
                      <div className="flex gap-2 text-black ">
                        <div className="bg-brand-secondary-color  rounded-2xl px-2 py-1 text-xs">
                          Current
                        </div>
                        <div className="bg-brand-primary-color rounded-2xl px-2 py-1 text-xs">
                          Avarage
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="text-secondary-text text-xs">
                        Avarage value{" "}
                        <span className="text-primary-text text-lg">50%</span>
                      </div>
                      <div className="text-secondary-text text-xs">
                        Current value{" "}
                        <span className="text-primary-text text-lg">60%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <MethylationChart />
              </div>
            )} */}
            {activeChartData && (
              <div
                className={` ${
                  !active && "hidden"
                }   w-full h-full    flex flex-col   justify-start max-h-[400px]  2xl:max-h-[600px] 3xl:max-h-full   `}
              >
                {activeChartData && (
                  <NormalChartCard
                    type={activeChartData.type}
                    isMeasured={activeChartData.isMeasured}
                    status={activeChartData.status}
                    chartData={activeChartData.chartData}
                    chartType = {activeChartData.chart}
                  />
                )}
              </div>
            )}
            {activeMode === "Activity" && (
              <div className=" w-full  grid grid-cols-3  xl:grid-cols-4  gap-x-5 gap-y-3">
                { activitis &&  activitis.map((activity, i) => (
                  <ActivityCard
                    key={i}
                    name={activity.category}
                    score={activity.score}
                    percentage={activity.value}
                  />
                ))}
              </div>
            )}
            {activeMode !== "Activity" && (
              <div
                className={`${theme}-biomarker-Ai-card  ${
                  active === "chat" && "hidden"
                }  `}
              >
                <div className="flex items-center gap-2">
                  <img className={`${theme}-icons-logo`} width={24} alt="" />
                  <h2
                    className={`${theme}-biomarker-Ai-card-logo-heading-text`}
                  >
                    AI-Copilot
                  </h2>
                </div>
                <div className=" flex w-full justify-between items-center ">
                  <h5 className={`${theme}-biomarker-Ai-card-text`}>
                    5 Biomarkers need updated information. Send notification to
                    patient?
                  </h5>
                  <div className="flex gap-2 items-center">
                    <Button theme={theme + "-secondary"}>
                      <img className={`${theme}-icons-openbook`} alt="" />
                      Learn more
                    </Button>
                    <Button theme={theme} onClick={() => setActive("chat")}>
                      Get started
                      <img className={`${theme}-icons-arrow-right`} alt="" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Analysis;
