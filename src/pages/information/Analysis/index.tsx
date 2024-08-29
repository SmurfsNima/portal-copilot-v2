import { ChatBox, InfoCard, SearchBox } from "@/components";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { SmallChartCard } from "@/components/chartCard/smallChartCard";
import { Button } from "symphony-ui";
import { NormalChartCard } from "@/components/chartCard/normalChartCard";
import { useBiomarkers, useBloodtest } from "@/hooks";
import { prepareChartData } from "@/utils/status";
import { getStatusBgColorClass } from "@/utils/status";
import MethylationChart from "@/components/charts/MethylationChart";

const Analysis = () => {
  const theme = useSelector((state: any) => state.theme.value.name);
  const biomarkers = useBiomarkers();
  const Bloodtests = useBloodtest();
  const BloodtestsChartData = prepareChartData(Bloodtests);
  const chartData = prepareChartData(biomarkers);
  useEffect(() => console.log(Bloodtests), [Bloodtests]);
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

  const activeChartData = chartData.find((data) => data.type === active);
  const activeStatus = activeChartData?.status || "";
  useEffect(() =>{ console.log(active)
   console.log(activeMode)}, [activeMode , active]);
  return (
    <>
      <div className="flex flex-col w-full  items-start gap-2">
        <InfoCard></InfoCard>
        <div className="flex w-full justify-between ">
          <div className="flex  gap-1 text-primary-text text-xs ">
            <div
              onClick={() => { setActive(null); setActiveMode("Vital")}}
              className={` ${
                activeMode === "Vital" && "bg-black-third"
              } rounded-md w-[105px] h-[32px] flex items-center justify-center cursor-pointer   `}
            >
              Vital
            </div>
            <div
              onClick={() => { setActive(null); setActiveMode("Blood Test")}}
              className={` ${
                activeMode === "Blood Test" && "bg-black-third"
              } rounded-md w-[105px] h-[32px] flex items-center justify-center cursor-pointer  `}
            >
              Blood Test
            </div>
            <div
              onClick={() => { setActive(null); setActiveMode("Activity")}}
              className={` ${
                activeMode === "Activity" && "bg-black-third"
              } rounded-md w-[105px] h-[32px] flex items-center justify-center cursor-pointer `}
            >
              Activity
            </div>
          </div>
          <div className=" flex    items-center gap-2 ">
            <SearchBox
              theme="Aurora"
              placeholder="Quick alphabetical search for biomarkers"
            />
            <div className="rounded-md bg-black-primary border border-main-border flex items-center justify-center text-xs text-primary-text">
              <div className="border-r border-main-border px-4  ">
                <div
                  className={` ${getStatusBgColorClass(
                    activeStatus,
                    "low"
                  )} rounded-2xl w-[68px] h-[24px] flex items-center justify-center`}
                >
                  low
                </div>
              </div>
              <div className="border-r border-main-border px-4 py-1">
                <div
                  className={` ${getStatusBgColorClass(
                    activeStatus,
                    "medium"
                  )} w-[68px] h-[24px] flex items-center justify-center rounded-2xl`}
                >
                  Medium
                </div>
              </div>
              <div className="px-4 py-1">
                <div
                  className={` ${getStatusBgColorClass(
                    activeStatus,
                    "high"
                  )} w-[68px] h-[24px] flex items-center justify-center  rounded-2xl`}
                >
                  Critical
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full   ">
          <div
            id="charts-container"
            data-active={active && true}
            className={`${theme}-biomarker-charts-container h-full max-h-[400px] overflow-auto  `}
          >
            <div
              data-active={active && true}
              className={`${theme}-biomarker-leftbuttons-container`}
            >
              <div
                onClick={() => setActive("chat")}
                data-active={active && true}
                className={`${theme}-biomarker-analyze-button h-[40px]`}
              >
                <img className={`${theme}-icons-stars`} alt="" />{" "}
                <h2 className={`${theme}-biomarker-analyze-button-text`}>
                  Analyze by AI-Copilot
                </h2>
              </div>

              <div
                onClick={() => setActive(null)}
                data-active={active && true}
                className={`${theme}-biomarker-back-button`}
              >
                <img className={`${theme}-icons-arrow-left`} />
              </div>

              <div
                id="custom-border"
                data-active={active && true}
                className={`${theme}-biomarker-Addbiomarker-button custom-border`}
              >
                <img className={`${theme}-icons-Add`} alt="" />
                <h2 className={`${theme}-biomarker-Addbiomarker-button-text`}>
                  Add New
                </h2>
              </div>
            </div>

            {activeMode === "Blood Test"
              ? BloodtestsChartData &&
                BloodtestsChartData.map((item, i) => (
                  <SmallChartCard
                    active={active}
                    setActive={setActive}
                    isMeasured={item.isMeasured}
                    key={i}
                    chartData={item.chartData}
                    type={item.type}
                  />
                ))
              : activeMode === "Vital" &&
                chartData &&
                chartData.map((item, i) => (
                  <SmallChartCard
                    active={active}
                    setActive={setActive}
                    isMeasured={item.isMeasured}
                    key={i}
                    chartData={item.chartData}
                    type={item.type}
                  />
                ))}
          </div>
          <div className={`flex flex-col  w-full gap-2 ${active === null && 'hidden'} `}>
            {active === "chat" &&   (
              <div className={`${theme}-biomarker-Ai-chat-container h-full `}>
                <div
                  id="copilot-chat"
                  className="max-h-[406px] h-full overflow-y-scroll"
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
            { activeMode === "Blood Test" && active !== "chat" && (
              <div className="w-full  bg-black-primary border border-main-border px-12 py-5  flex flex-col gap-3 text-primary-text rounded-lg">
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
                        Avarage value{" "}
                        <span className="text-primary-text text-lg">50%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <MethylationChart />
              </div>
            )}
            {activeMode === "Vital" && (
              <div
                className={` ${
                  !active && "hidden"
                }   w-full h-full    flex flex-col gap-5  justify-start max-h-[400px]  2xl:max-h-[600px] 3xl:max-h-full   `}
              >
                {activeChartData && (
                  <NormalChartCard
                    type={activeChartData.type}
                    isMeasured={activeChartData.isMeasured}
                    status={activeChartData.status}
                    chartData={activeChartData.chartData}
                  />
                )}
              </div>
            )}
            <div className={`${theme}-biomarker-Ai-card  ${active === "chat" && 'hidden'}  `}>
              <div className="flex items-center gap-2">
                <img className={`${theme}-icons-logo`} width={24} alt="" />
                <h2 className={`${theme}-biomarker-Ai-card-logo-heading-text`}>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Analysis;
