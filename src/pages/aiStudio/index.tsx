import { ActivityMenu, AiChat, SearchBox, StatusMenu } from "@/components";
import { useEffect, useState } from "react";
import { ClientCard } from "./ClientCard";
import { Application } from "@/api";
import React from "react";
type menuItem = {
  name: string;
};

interface Patient {
  Email: string;
  Name: string;
  Status: string;
  member_id: number;
}

export const AiStudio = () => {
  const [activeMenu, setActiveMenu] = useState("Overview");
  const [isStateOpen, setIsStateOpen] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(true);
  const [isEngagementOpen, setIsEngagementOpen] = useState(true);
  const [cardActive, setcardActive] = useState(0);
  const [activeStatus, setActiveStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [activeMemberID, setActiveMemberID] = useState<number | null>(null);
  const [overviewData, setOverviewData] = useState<any>(null);

  const toggleStateSection = () => setIsStateOpen(!isStateOpen);
  const toggleAlertSection = () => setIsAlertOpen(!isAlertOpen);
  const toggleEngagementSection = () => setIsEngagementOpen(!isEngagementOpen);

  const menus: Array<menuItem> = [
    { name: "Overview" },
    { name: "Copilot" },
    { name: "Weekly report" },
  ];

  const filteredClients = patients.filter((client) => {
    const matchesSearch = client.Name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = activeStatus === "All" || client.Status === activeStatus;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Application.aiStudio_patients();
        setPatients(response.data);

        const res = await Application.aiStudio_overview({
          member_id: activeMemberID, 
        });
        setOverviewData(res.data); 
        console.log(res);
        
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [activeMemberID]); 

  const status: Array<string> = ["All", "Need to Check", "Checked"];

  return (
    <div className="bg-black-background h-full w-full px-5 flex items-start gap-2">
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex items-center justify-center">
          <ActivityMenu activeMenu={activeMenu} menus={menus} onChangeMenuAction={(menu) => setActiveMenu(menu)} />
        </div>
        {activeMenu === "Overview" ? (
          <div className="overflow-y-auto max-h-[531px] ">
            {/* <div className="w-full bg-black-primary border border-main-border px-[6px] py-[2px] flex items-center gap-3 rounded-md">
              <input
                className="w-full border border-main-border bg-black-secondary py-1 rounded-md outline-none text-[10px] text-primary-text"
                type="text"
              />
              <img className="cursor-pointer" src="/Themes/Aurora/icons/send.svg" alt="" />
            </div> */}
            <div className="bg-black-primary text-primary-text p-4 rounded-lg space-y-5">
              <div
                onClick={toggleStateSection}
                className="flex items-center cursor-pointer gap-2 text-xs text-nowrap font-medium"
              >
                <img
                  src="/Themes/Aurora/icons/chevron-up.svg"
                  className={`transition-transform rotate-90  ${isStateOpen && "rotate-[180deg]"}`}
                  alt=""
                />
                General Condition
                <div className="h-[1px] w-full bg-third-text" />
              </div>
              {isStateOpen && (
                <div className="text-xs text-primary-text">
                  <p className="mt-4 text-primary-text">
                    {overviewData ? overviewData.description : ""}
                  </p>
                  {/* <div className="my-4">
                  Need Focus Benchmarks:
                  <ul className="list-disc mt-2 space-y-3 px-4 text-primary-text">
                <li>Recovery</li>
                <li>Recovery</li>
                <li>Recovery</li>
                  </ul>
                  </div> */}
                 
                </div>
              )}
              <div onClick={toggleAlertSection} className="text-sm font-medium cursor-pointer flex gap-2 items-center">
                <img
                  src="/Themes/Aurora/icons/chevron-up.svg"
                  className={`transition-transform rotate-90 ${isAlertOpen && "rotate-[180deg]"}`}
                  alt=""
                />
                Alert
                <div className="h-[1px] w-full bg-third-text" />
              </div>
              {isAlertOpen && (
  <div className="my-4">
    <ul className="list-disc space-y-2 px-4">
      {overviewData?.alerts &&
        Object.values(overviewData.alerts).map((value, index) => (
          <li key={index} className="text-xs">{value as string}</li>
        ))}
    </ul>
  </div>
)}
              <div onClick={toggleEngagementSection} className="text-xs text-nowrap font-medium cursor-pointer flex gap-2 items-center">
                <img
                  src="/Themes/Aurora/icons/chevron-up.svg"
                  className={`transition-transform rotate-90  ${isEngagementOpen && "rotate-[180deg]"}`}
                  alt=""
                />
                Limits & Contradiction
                <div className="h-[1px] w-full bg-third-text" />
              </div>
              {isEngagementOpen &&(
                 <div className="my-4">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="border-b border-main-border">
                      
                      
                       <th className="px-4 py-2 text-sm font-medium text-center">Limits</th>
                       <th className="px-4 py-2 text-sm font-medium text-center">Contradictions</th>
                     </tr>
                   </thead>
                   <tbody>
                   {overviewData?.coach_reminders?.map((reminder: any, index: number) => (
  <React.Fragment key={index}>
    <tr className="">
      <td className="  px-4 " >
        <span className="text-xs font-medium">{reminder.condition}</span>
      </td>
    </tr>
    <tr className="border-b border-main-border ">
      <td className=" px-4    pl-[200px] ">
        <ul className="space-y-5 -mt-16 ">
          {reminder?.contraindications?.map((contradiction: string, cIndex: number) => (
            <li className="text-xs font-normal max-w-[453px]    " key={`c-${index}-${cIndex}`}>{contradiction}</li>

          ))}
        </ul>
        
      </td>
      <td className=" px-4  pl-[200px]  ">
        <ul className="space-y-5">
          {reminder?.recommendations?.map((recommendation: string, rIndex: number) => (
            <li className="text-xs font-normal max-w-[453px] " key={`r-${index}-${rIndex}`}>{recommendation}</li>
          ))}
        </ul>
      </td>
      
    </tr>
  </React.Fragment>
))}
                   </tbody>
                 </table>
               </div>
              )}
            </div>
            </div>
        ) : activeMenu === "Copilot" ? (
          <AiChat memberID={activeMemberID} />
        ) : (
          <div>vvvv</div>
        )}
      </div>

      <div className="flex flex-col gap-[10px] justify-start ">
        <SearchBox changeHandler={(e) => setSearchQuery(e.target.value)} theme="Aurora" placeholder="Search for client..." />
        <StatusMenu status={status} activeStatus={activeStatus as any} onChange={(value) => setActiveStatus(value)} />

        <div className="flex flex-col pr-1 max-h-[531px] w-full overflow-auto">
          {filteredClients.map((client, i) => (
            <ClientCard
              index={i}
              key={client.Name}
              name={client.Name}
              email={client.Email}
              memberID={client.member_id}
              onClick={() => {
                setcardActive(i + 1); // Update the active card index
                setActiveMemberID(client.member_id); // Set active member ID
              }}
              status={client.Status}
              cardActive={cardActive}
            />
          ))}
        </div>
      </div>
    </div>
  );
};