import { InfoCard, Input, SearchBox, TabsWrapper } from "@/components"
import { ButtonPrimary , ButtonSecondary } from "@/components/button";
import { useEffect , useState , useRef } from "react";
import { useSelector } from "react-redux";
import { ChartCard } from "./chartCard";
import { LargeChartCard } from "./LargeChart";

const TabsInfo = [
    {
        text: 'All',
        path : '',
    },
    {
        text: 'Genomics',
        path : '',
        number: 4,
    },
    {
        text: 'Epigenomics',
        path : '',
        number: 0
    },
    {
        text : 'Proteomics',
        path : '',
        number : 1
    },
    {
        text: 'Metabolomics',
        path : '',
        number: 2,
    },
    {
        text: 'Microbiomics' ,
        path : '',
        number: 1
    }
 ]
 const ChartInfo = [
    {
        
        title: 'Temperature',
        type : 'area',
        Avarage: 99.5 ,
        current:  96,
    },
    {
       
        title: 'Heart Rate',
        type : 'line',
        Avarage: 99.5 ,
        current:  96,
    },
    {
        
        title: 'CBC',
        type : 'linear',
        Avarage: 99.5 ,
        current:  96,
    },
    {
        
        title: 'Blood Pressure',
       
        Avarage: 99.5 ,
        current:  96,
    },
 ]
const BioMarker = () => {
    const theme = useSelector((state: any) => state.theme.value.name);
    const [messages, setMessages] = useState([
    
        { type: 'text', content: 'Weight Management: Maintaining a healthy weight is crucial for controlling blood pressure.' },
        { type: 'text', content: 'Alcohol and Tobacco: Limiting alcohol intake and avoiding tobacco use can significantly reduce blood pressure.' },
       
      ]);
    const [active, setActive] = useState <string | null>(null);
    const handleSendMessage = (message: string) => {
        if (message.trim()) {
          setMessages([...messages, { type: 'text', content: message }]);
        }
       
      };
      const messagesEndRef = useRef<HTMLDivElement>(null);
    
      const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      };
    
      useEffect(() => {
        scrollToBottom();
      }, [messages]);
    return (
        <>
       <div className={`${theme}-biomarker-container`}>
      <InfoCard></InfoCard>
      <div className=" flex justify-start   items-center gap-2">
        <SearchBox
          theme="Aurora"
          placeholder="Quick alphabetical search for biomarkers"
        />
        <div className={`${theme}-filterbox-container`}>
          <div className={`${theme}-filterbox-item-container`}>
            <div className={`${theme}-filterbox-item`}>
              Critical
            </div>
          </div>
          <div className={`${theme}-filterbox-item-container`}>
            <div className={`${theme}-filterbox-item`}>
              Low
            </div>
          </div>
          <div className={`${theme}-filterbox-item-container border-none`}>
          <div className={`${theme}-filterbox-item`}>
              Medium
            </div>
          </div>
        </div>
      </div>
      <TabsWrapper TabsInfo={TabsInfo} />
      <div className="flex w-full h-full">
        <div
          id="charts-container"
          data-active = {active && true }
         className={`${theme}-biomarker-charts-container`}
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

          {ChartInfo.map((item, i) => (
            <ChartCard
              active={active}
              setActive={setActive}
              key={i}
              
              title={item.title}
              type={item.type}
              Avarage={item.Avarage}
              current={item.current}
            />
          ))}
        </div>
        {active && active !== "chat" ?  <div
          className={` ${
            !active && "hidden"
          } w-full lg:h-[350px] xl:h-[410px] 2xl:h-[456px]  flex flex-col justify-between   gap-3`}
        >
          <LargeChartCard
            
            type={active}
            isMeasured={false}
            value={55}
            status="active"
          />
          
          <div className={`${theme}-biomarker-Ai-card`}>
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
                <ButtonSecondary>
                  <img className={`${theme}-icons-openbook`} alt="" />
                  Learn more
                </ButtonSecondary>
                <ButtonPrimary onClickHandler={()=>setActive("chat")}>
                  Get started
                  <img
                    className={`${theme}-icons-arrow-right`}
                    alt=""
                  />
                </ButtonPrimary>
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
                <ButtonSecondary>
                  <img className={`${theme}-icons-openbook`} alt="" />
                  Learn more{" "}
                </ButtonSecondary>
                <ButtonPrimary onClickHandler={()=>setActive("chat")}>
                  Get started{" "}
                  <img
                    className={`${theme}-icons-arrow-right`}
                    alt=""
                  />
                </ButtonPrimary>
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
           <div className=""><Input handleSendMessage={handleSendMessage} /></div>
           
         </div>}
       
      </div>
    </div>
  
        </>
    )
}

export default BioMarker