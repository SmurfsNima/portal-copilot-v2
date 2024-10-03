/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivityMenu, AiChat, SearchBox, StatusMenu } from "@/components";
import { useEffect, useRef, useState } from "react";
import { ClientCard } from "./ClientCard";
import { Application } from "@/api";
import React from "react";
import { Button } from "symphony-ui";
import GenerateReportTable from "./GenerateReportTable";
import ReportTable from "./ReportsTable";
import GenerateWithAiModal from "./GenerateWithAiModal";
import useModalAutoClose from "@/hooks/UseModalAutoClose";
import { BeatLoader } from "react-spinners";
import { subscribe } from "@/utils/event";

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
  const [isloadingGenerate,setIsLoadingGenerate] = useState(false)
  const [generateReportGoolsData,setGenerateReportGoolsData] = useState({"Type of progress":[]})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Application.aiStudio_patients();
        setPatients(response.data);
        setActiveMemberID(response.data[0].member_id)
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
  const [activePatinet,setActivePatent] = useState(patients[0])
  useEffect(() => {
    if(activeMemberID!=null){
      setActivePatent(patients.filter((el) => el.member_id == activeMemberID)[0])
    }
  },[activeMemberID])
  const [reportsData,SetReportsData] = useState([])
  useEffect(() => {
    Application.showReportList({
      member_id:activeMemberID
    }).then(res => {
      SetReportsData(res.data)
    })
  },[activeMemberID])
  const status: Array<string> = ["All", "Need to Check", "Checked"];
  const [isCreateReportMode,setisCreateReportMode] = useState(false)
  const [showAiGenereteModal,setShowAiGenerateAi] = useState(false)
  const modalAiGenerateRef = useRef(null)
  useModalAutoClose({
    refrence:modalAiGenerateRef,
    close:() => {
      setShowAiGenerateAi(false)
    }
  })
  const [showGenerateButton,setShowGenerateButton] = useState(true)
  subscribe("completeChanges",() => {
    setShowGenerateButton(false)
  })

  return (
    <div className="bg-black-background h-full w-full px-5 flex items-start gap-2">
      {isCreateReportMode ?
        <div className="w-full">
          <div className="w-full mb-2 flex justify-between items-center">
            <div>
              <div onClick={() => {
                setisCreateReportMode(false)
                setShowGenerateButton(true)
              }} className={`Aurora-tab-icon-container cursor-pointer h-[35px]`}>
                <img className={`Aurora-icons-arrow-left`} />
              </div>              
            </div>
            {showGenerateButton && 
              <div className="relative">
                <div className="absolute right-[0px] top-10 z-30">
                  {showAiGenereteModal &&
                    <GenerateWithAiModal onSuccess={(value) =>{
                      setShowAiGenerateAi(false)
                      setIsLoadingGenerate(true)
                      Application.generateWithAi({
                          member_id:activeMemberID,
                          instruction:value,
                          data:generateReportGoolsData
                      }).then(res => {
                        setGenerateReportGoolsData(res.data)
                        setIsLoadingGenerate(false)
                      }).catch(() => {
                        setIsLoadingGenerate(false)
                      })
                    }} refEl={modalAiGenerateRef}></GenerateWithAiModal>
                  }

                </div>
                <Button onClick={() => {
                  setShowAiGenerateAi(true)
                }} theme="Aurora">
                  {isloadingGenerate ?
                  <div className="px-3 w-full flex justify-center items-center">
                    <BeatLoader size={8} color="#7F39FB"></BeatLoader>

                  </div>
                  :
                  <>
                  <div className={`Aurora-icons-stars w-[15px]`}></div>
                  Generate by AI
                  </>
                  }</Button>
                  
              </div>
            }
          </div>
          <div className="w-full bg-[#272727] rounded-[6px] border-main-border border h-[75vh]">
            <div className="p-4">
              <GenerateReportTable onClose={()=> {
                setisCreateReportMode(false)
                setShowGenerateButton(true)
              }} memberId={activeMemberID as number} setData={setGenerateReportGoolsData} data={generateReportGoolsData}></GenerateReportTable>

            </div>
          </div>
        </div>
      :
      <>
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
            <div className="bg-black-primary rounded-[6px] border-main-border border h-[60vh]">
              <div className="flex justify-between w-full px-5 py-3">
                <div className="px-4 flex justify-start items-center">
                  <img className="w-[32px] h-[32px] rounded-full" src={`https://ui-avatars.com/api/?name=${activePatinet?.Name}`} alt="" />
                  <div className="ml-2">
                    <div className="text-[#FFFFFFDE] text-[10px]">{activePatinet.Name}</div>
                    <div className="text-[#FFFFFF99] text-[10px]">{activePatinet.Email}</div>
                  </div>
                </div>

                <div>
                  <Button onClick={() => {
                    Application.getWeeklyReport({
                      member_id: activeMemberID, 
                    }).then((res) => {
                      setGenerateReportGoolsData(res.data)
                    })
                    setisCreateReportMode(true)
                  }} theme="Aurora">Generate New Report</Button>
                </div>
              </div>
              <div className=" px-5">
                <div className="border-black-third mb-4 border"></div>
                  <ReportTable memberId={activeMemberID as number} data={reportsData}></ReportTable>
              </div>
            </div>
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
                  // setcardActive(i + 1); // Update the active card index
                  setActiveMemberID(client.member_id); // Set active member ID
                }}
                status={client.Status}
                cardActive={activeMemberID}
              />
            ))}
          </div>
        </div>
      </>
      }
    </div>
  );
};