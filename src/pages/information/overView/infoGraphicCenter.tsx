/* eslint-disable @typescript-eslint/no-explicit-any */
import Img from "../../../assets/images/Group.svg";
import { patientMainInfo } from "./Data.ts";
import { PatientInfo } from "./patientInfo.tsx";
import { useSelector } from "react-redux";
import { useState ,} from "react";
import ArrowRight from "/public/Themes/Aurora/icons/arrowRight.svg";
import { ChatBox } from "@/components/index.ts";
export const InfoGraphicCenter = () => {
  const theme = useSelector((state: any) => state.theme.value.name);
  const [isNext, setIsNext] = useState(false);
  const [messages, setMessages] = useState([
    // Sample messages
    { type: 'text', content: 'Weight Management: Maintaining a healthy weight is crucial for controlling blood pressure.' },
    { type: 'text', content: 'Alcohol and Tobacco: Limiting alcohol intake and avoiding tobacco use can significantly reduce blood pressure.' },
    // Add more messages as needed
  ]);

  
  const handleSendMessage = (message: string) => {
    if (message.trim()) {
      setMessages([...messages, { type: 'text', content: message }]);
    }
  };
  return (
    <div className=" flex w-full flex-col items-center  gap-4 ">
      <div className={`${theme}-graphicinfo-center-section fixed `}>
        {!isNext ? (
          <div className=" w-full relative  h-[40vh] xl:h-[45vh] 2xl:h-[50vh]  pb-3">
            <div className="w-full flex justify-center h-[40vh] xl:h-[45vh] 2xl:h-[50vh]">
            <img src={Img}  />
            </div>
             
           
            {patientMainInfo.map((item , i) => (
              <div key={i}
                className={` ${theme}-graphicinfo-patientinfo ${theme}-graphicinfo-patientinfo-${item.name}-position`}
              >
                <PatientInfo
                  name={item.name}
                  value={item.value}
                  icon={item.icon}
                  border={item.border}
                />
              </div>
            ))}
          </div>
        ) : (
          <div id="copilot-chat" className="overflow-y-scroll  h-[40vh] xl:h-[45vh] 2xl:h-[50vh]py-2">
           
            <div className="border border-main-border rounded-xl rounded-t-none bg-black-secondary text-secondary-text py-1 px-5  ">
              <ul className="list-disc leading-6">
                <p>
                  Weight Management: Maintaining a healthy weight is crucial for
                  controlling blood pressure.
                </p>

                <li className="text-[12px] font-normal ml-5">
                  Alcohol and Tobacco: Limiting alcohol intake and avoiding
                  tobacco use can significantly reduce blood pressure.
                </li>
                
                <li className="text-[12px] font-normal ml-5">
                <p className="block">Medication:</p>
                  When lifestyle changes are not enough, medications such as
                  diuretics, ACE inhibitors, calcium channel blockers, and
                  beta-blockers can be prescribed to help control blood
                  pressure.
                </li>
              
                <li className="text-[12px] font-normal ml-5">
                <p className="block">Regular Monitoring : </p>
                   Regular check-ups with a healthcare provider are important for
                  monitoring blood pressure and making necessary adjustments to
                  treatment plans.
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-main-border px-2 py-1 bg-black-secondary my-3 text-secondary-text text-[12px] font-normal leading-6">
              High blood pressure is a manageable condition, but it requires
              proactive and consistent efforts to prevent the severe
              complications associated with it. Early detection, lifestyle
              changes, and appropriate medical interventions are key to reducing
              the risks and maintaining overall health.
            </div>
            {/* <div className=" my-3  rounded-xl bg-black-secondary border border-main-border px-3 py-2 w-full max-h-[300px]">
              <MixedLinesChart active={false} />
            </div> */}
            {messages.map((message , index)=>(
              <div key={index} className="bg-black-secondary text-secondary-text p-2 mb-2 rounded-xl">
                {message.content}
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center mt-2 gap-3">
          <img
            onClick={() => setIsNext(false)}
            className={`cursor-pointer rotate-180 ${!isNext ? "opacity-50" : ""}`}
            src={ArrowRight}
            alt=""
          />
          <img
            onClick={() => setIsNext(true)}
            className={ `cursor-pointer ${isNext ? "opacity-50" : "opacity-100"}`}
            src={ArrowRight}
            alt=""
          />
        </div>
        
      </div>
      <div className="fixed bottom-4">
      <ChatBox handleSendMessage={handleSendMessage}/>
      </div>
      
    </div>
  );
};
