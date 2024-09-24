/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivityMenu, ChatBox, InfoCard, SearchBox } from "@/components";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SmallChartCard } from "@/components/chartCard/smallChartCard";
import { Button } from "symphony-ui";
import { NormalChartCard } from "@/components/chartCard/normalChartCard";
import { useBiomarkers } from "@/hooks";
import { prepareChartData } from "@/utils/status";
import { getStatusBgColorClass } from "@/utils/status";
// import MethylationChart from "@/components/charts/MethylationChart";
import { ActivityCard } from "./activityCard";
// import PlanManagerModal from "./planModal";
import { Activity, BiomarkerCategory } from "@/types";
import { Application } from "@/api";
import BarChart from "./barChart";
const Analysis = () => {
  const { id } = useParams<{ id: string }>();
  const theme = useSelector((state: any) => state.theme.value.name);
  const biomarkers = useBiomarkers();
  console.log(biomarkers);

  const [Vitals, setVitals] = useState<BiomarkerCategory[]>([]);
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
    type: string
  ): BiomarkerCategory[] => {
    if (!biomarkers || biomarkers.length === 0) return [];
    return biomarkers.flatMap((biomarker) =>
      Object.entries(biomarker)
        .filter(([, value]) =>
          value.some(
            (entry) => entry.cart === cartNumber && entry.type === type
          )
        )
        .map(([key, value]) => ({ [key]: value }))
    );
  };
  useEffect(() => {
    setVitals(filterBiomarkersByCartAndType(1, "vital"));
    setBloodTests(filterBiomarkersByCartAndType(1, "blood test"));
  }, [biomarkers]);
  const BloodtestsChartData = prepareChartData(bloodTests);
  const VitalschartData = prepareChartData(Vitals);

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
  const [activeMode, setActiveMode] = useState("Vital");
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
  const cart2Biomarkers = filterBiomarkersByCartAndType(2, "vital");
  console.log(cart2Biomarkers);
  const type2BiomarkersData = prepareChartData(cart2Biomarkers);
  
  const activeChartData =
    VitalschartData.find((data) => data.type === active) ||
    BloodtestsChartData.find((data)=>data.type === active) ||
    type2BiomarkersData.find((data) => data.type === active);

  const [activeStatus,setActiveStatus] = useState("Excellent");
  const [search,setSearch] =useState("")
  const renderCart2Components = () => {
    if(search != ''){
    return type2BiomarkersData.filter(e => e.type.toLowerCase().includes(search.toLowerCase())).filter((e) => e.status == activeStatus).map((biomarker, index) => {
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
    return type2BiomarkersData.filter((e) => e.status == activeStatus).map((biomarker, index) => {
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
  return (
    <>
      <div className="flex flex-col w-full  items-start gap-2">
        <InfoCard></InfoCard>
        <div className="flex w-full justify-between ">
          <ActivityMenu activeMenu={activeMode as any} onChangeMenuAction={(menu) => {
            setActiveMode(menu)
            setActive(null)
          }}></ActivityMenu>
          {/* <div className="flex  gap-1 text-primary-text text-xs ">
            <div
              onClick={() => {
                setActive(null);
                setActiveMode("Vital");
              }}
              className={` ${
                activeMode === "Vital" && "bg-black-third"
              } rounded-md w-[105px] h-[32px] flex items-center justify-center cursor-pointer   `}
            >
              Vital
            </div>
            <div
              onClick={() => {
                setActive(null);
                setActiveMode("Blood Test");
              }}
              className={` ${
                activeMode === "Blood Test" && "bg-black-third"
              } rounded-md w-[105px] h-[32px] flex items-center justify-center cursor-pointer  `}
            >
              Blood Test
            </div>
            <div
              onClick={() => {
                setActive("");
                setActiveMode("Activity");
              }}
              className={` ${
                activeMode === "Activity" && "bg-black-third"
              } rounded-md w-[105px] h-[32px] flex items-center justify-center cursor-pointer `}
            >
              Activity
            </div>
            <div
              onClick={() => {
                setActive("");
                setActiveMode("Client Profile");
              }}
              className={` ${
                activeMode === "Client Profile" && "bg-black-third"
              } rounded-md w-[105px] h-[32px] flex items-center justify-center cursor-pointer `}
            >
              Client Profile
            </div>            
          </div> */}
          <div className=" flex    items-center gap-2 ">
            <SearchBox
            changeHandler={(e) =>{
              setSearch(e.target.value)
            }}
              theme="Aurora"
              placeholder="Quick alphabetical search for biomarkers"
            />
            <div className="rounded-md bg-black-primary border border-main-border flex items-center justify-center text-xs text-primary-text">
              <div className="border-r border-main-border px-4  ">
                <div
                  onClick={() => {
                    setActiveStatus("Needs Focus")
                  }}
                  className={` ${getStatusBgColorClass(
                    activeStatus,
                    "Needs Focus"
                  )} rounded-2xl w-[95px] h-[24px] flex items-center justify-center`}
                >
                  Needs Focus
                </div>
              </div>
              <div className="border-r border-main-border px-4 py-1">
                <div
                  onClick={() => {
                    setActiveStatus("Ok")
                  }}                
                  className={` ${getStatusBgColorClass(
                    activeStatus,
                    "Ok"
                  )} w-[68px] h-[24px] flex items-center justify-center rounded-2xl`}
                >
                  Ok
                </div>
              </div>
              <div className="px-4 py-1">
                <div
                  onClick={() => {
                    setActiveStatus("Good")
                  }}                       
                  className={` ${getStatusBgColorClass(
                    activeStatus,
                    "Good"
                  )} w-[68px] h-[24px] flex items-center justify-center  rounded-2xl`}
                >
                  Good
                </div>
              </div>
              <div className="px-4 py-1">
                <div
                  onClick={() => {
                    setActiveStatus("Excellent")
                    // alert("dd")
                  }}                   
                  className={` ${getStatusBgColorClass(
                    activeStatus,
                    "Excellent"
                  )} w-[68px] h-[24px] flex items-center justify-center  rounded-2xl`}
                >
                  Excellent
                </div>
              </div>              
            </div>
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
            <div
              data-active={active && true}
              className={` ${
                activeMode === "Activity" && "hidden"
              }  ${theme}-biomarker-leftbuttons-container w-[316px]`}
            >
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

              <div
                id="custom-border"
                data-active={active && true}
                className={`${theme}-biomarker-Addbiomarker-button custom-border h-[145px]`}
              >
                <img className={`${theme}-icons-Add`} alt="" />
                <h2 className={`${theme}-biomarker-Addbiomarker-button-text`}>
                  Add New
                </h2>
              </div>
            </div>
            {activeMode === "Blood Test" &&
              renderChartCards(BloodtestsChartData)}
            {activeMode === "Vital" && renderChartCards(VitalschartData)}
            {activeMode === "Vital" && renderCart2Components()}
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
