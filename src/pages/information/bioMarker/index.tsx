import { ChatBox, InfoCard, SearchBox, TabsWrapper } from "@/components";
import { useEffect, useState, useRef   } from "react";
import { useSelector } from "react-redux";
import { SmallChartCard } from "@/components/chartCard/smallChartCard";
import { Button } from "symphony-ui";
import { NormalChartCard } from "@/components/chartCard/normalChartCard";
import { useBiomarkers } from "@/hooks";
import { prepareChartData } from "@/utils/status";
import { getStatusBgColorClass } from "@/utils/status";
const TabsInfo = [
  {
    text: "All",
    path: "",
  },
  {
    text: "Genomics",
    path: "",
    number: 4,
  },
  {
    text: "Epigenomics",
    path: "",
    number: 0,
  },
  {
    text: "Proteomics",
    path: "",
    number: 1,
  },
  {
    text: "Metabolomics",
    path: "",
    number: 2,
  },
  {
    text: "Microbiomics",
    path: "",
    number: 1,
  },
];



const BioMarker = () => {
  const theme = useSelector((state: any) => state.theme.value.name);
  const biomarkers = useBiomarkers();
  const chartData = prepareChartData(biomarkers);
  
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
 
  console.log(active);
  const activeChartData = chartData.find((data) => data.type === active);  
  const activeStatus = activeChartData?.status || "";

  return (
    <>
      <div className="flex flex-col w-full  items-start gap-4">
        <InfoCard></InfoCard>
        <div className="flex w-full ">
          <div className=" flex w-full   items-center gap-2">
            <SearchBox
              theme="Aurora"
              placeholder="Quick alphabetical search for biomarkers"
            />
            <div className="rounded-xl bg-black-primary border border-main-border flex text-xs text-primary-text">
          <div className="border-r border-main-border px-4 py-1">
            <div
              className={` ${getStatusBgColorClass(
                activeStatus,
                "low"
              )} py-[10px] px-6 rounded-2xl`}
            >
              low
            </div>
          </div>
          <div className="border-r border-main-border px-4 py-1">
            <div
              className={` ${getStatusBgColorClass(
                activeStatus,
                "medium"
              )} py-[10px] px-6 rounded-2xl`}
            >
              Medium
            </div>
          </div>
          <div className="px-4 py-1">
            <div
              className={` ${getStatusBgColorClass(
                activeStatus,
                "high"
              )} py-[10px] px-6 rounded-2xl`}
            >
              Critical
            </div>
          </div>
        </div>
          </div>
        </div>
        <TabsWrapper TabsInfo={TabsInfo} />
        <div className="flex w-full   ">
        <div
          id="charts-container"
          data-active = {active && true }
         className={`${theme}-biomarker-charts-container max-h-[380px] overflow-auto`}
        >
          <div
           data-active={active && true}
           className={`${theme}-biomarker-leftbuttons-container`}
          >
            <div
            onClick={()=>setActive('chat')}
            data-active={active && true}
            className={`${theme}-biomarker-analyze-button`} >
              <img className={`${theme}-icons-stars`} alt="" />{" "}
              <h2
                className={`${theme}-biomarker-analyze-button-text`}
              >
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
                Add New Biomarker
              </h2>
            </div>
          </div>

          {
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
        {active && active !== "chat" ?  <div
          className={` ${
            !active && "hidden"
          }   w-full    flex flex-col gap-5  justify-between max-h-[380px]  2xl:max-h-[600px] 3xl:max-h-full   `}
        >
          {
            activeChartData && (
              <NormalChartCard
            
              type={activeChartData.type}
              isMeasured={activeChartData.isMeasured}
              
              status={activeChartData.status}
              chartData={activeChartData.chartData}
  
            />
            )
          }
         
          
          <div className={`${theme}-biomarker-Ai-card   `}>
            <div className="flex items-center gap-1">
              <img className={`${theme}-icons-logo`} width={24} alt="" />
              <h2 className={`${theme}-biomarker-Ai-card-logo-heading-text`}>
                AI-Copilot
              </h2>
            </div>
            <div className="mt-4  flex w-full justify-between items-center ">
              <h5 className={`${theme}-biomarker-Ai-card-text`}>
                5 Biomarkers need updated information. Send notification to
                patient?
              </h5>
              <div className="flex gap-3 items-center">
                <Button  theme={theme+'-secondary'}>
                  <img className={`${theme}-icons-openbook`} alt="" />
                  Learn more
                </Button>
                <Button theme={theme} onClick={()=>setActive("chat")}>
                  Get started
                  <img
                    className={`${theme}-icons-arrow-right`}
                    alt=""
                  />
                </Button>
              </div>
            </div>
          </div>
        </div> : 

      active === 'chat' &&
        <div  className={`${theme}-biomarker-Ai-chat-container`}>
          <div id="copilot-chat" className="max-h-[406px] h-full overflow-y-scroll">
          <div className={`${theme}-biomarker-Ai-card px-4` }>
            <div className="flex gap-1">
              <img className={`${theme}-icons-logo`} width={24} alt="" />
              <h2 className={`${theme}-biomarker-Ai-card-logo-heading-text`}>
                AI-Copilot
              </h2>
            </div>
            <div className="  flex w-full justify-between items-end ">
              <h5 className={`${theme}-biomarker-Ai-card-text`}>
                5 Biomarkers need updated information. Send notification to
                patient?
              </h5>
              <div className="flex gap-3 items-center">
                <Button theme={theme+'-secondary'}>
                  <img className={`${theme}-icons-openbook`} alt="" />
                  Learn more{" "}
                </Button>
                <Button theme={theme} onClick={()=>setActive("chat")}>
                  Get started{" "}
                  <img
                    className={`${theme}-icons-arrow-right`}
                    alt=""
                  />
                </Button>
              </div>
            </div>
          </div>
          
           {messages.map((message , index)=>(
             <div key={index} className={`${theme}-biomarker-Ai-chat-text`}>
               {message.content}
             </div>
           ))}
           <div ref={messagesEndRef} />
           </div>
           
           <ChatBox handleSendMessage={handleSendMessage} />
          
          
           
           
           
         </div>}
       
      </div>
    </div>
  
    </>
  );
};

export default BioMarker;
