import { InfoCard, SearchBox } from "@/components";
import { useState } from "react";
import { useSelector } from "react-redux";

export const Messages = () => {
  const theme = useSelector((state: any) => state.theme.value.name);
const [active, setActive] = useState("Notification History")
  return (
    <div className="flex flex-col gap-5">
        <InfoCard></InfoCard>
    <div className="w-full flex gap-5 bg-black-background ">
      <div className=" bg-black-background ">
        <div className=" w-full flex flex-col gap-2 max-h-[330px] overflow-auto">
          <div className="border border-main-border rounded-lg py-1  text-xs flex  justify-around  bg-black-primary ">
            <button onClick={()=>setActive("Chat History")} className={`${active === "Chat History" ? "bg-brand-primary-color text-black" : 'text-primary-text'}  rounded-lg px-5 py-1 `}>Chat History</button>
            <button onClick={()=>setActive("Notification History")} className={`${active === "Notification History" ? "bg-brand-primary-color text-black" : 'text-primary-text'} rounded-lg px-5 py-1`}>Notification History</button>
          </div>
          <div className="bg-black-primary border border-main-border rounded-md px-2 py-1">
          <SearchBox
            theme={theme}
            placeholder="search for biomarkers"
          ></SearchBox>
          </div>
        
        <div>
          <h3 className=" mb-2 text-secondary-text text-xs">Yesterday</h3>
          <div className="mb-4 p-2 bg-black-primary rounded-md border border-main-border text-primary-text text-xs">
            <p>Notification_ID_672384590216</p>
            <p>03:45AM</p>
            <p>There are many variations of messages...</p>
          </div>
          <div className="mb-4 p-2 bg-black-primary rounded-md border border-main-border text-primary-text text-xs">
            <p>Notification_ID_450927183650</p>
            <p>08:15AM</p>
            <p>There are many variations of messages...</p>
          </div>
          <h3 className="mb-2 text-secondary-text text-xs">Previous 7 days</h3>
          <div className="mb-4 p-2 bg-black-primary rounded-md border border-main-border text-primary-text text-xs">
            <p>Notification_ID_293847561072</p>
            <p>07:12AM</p>
            <p>There are many variations of messages...</p>
          </div>
          <div className="mb-4 p-2 bg-black-primary rounded-md border border-main-border text-primary-text text-xs">
            <p>Notification_ID_816473029584</p>
            <p>09:11AM</p>
            <p>There are many variations of messages...</p>
          </div>
        </div>
      </div>
      </div>
      
       <div className="">  <img className="" src="/src/assets/images/Chat Content.svg" alt="" /></div>
      
     
    </div>
    </div>
  );
};
