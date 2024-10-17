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
  Picture:string
}

export const AiStudio = () => {
  const [activeMenu, setActiveMenu] = useState("Overview");
  const [isStateOpen, setIsStateOpen] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(true);
  const [isEngagementOpen, setIsEngagementOpen] = useState(true);
  const [activeStatus, setActiveStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState<Patient[]>([
    {
      Email:'',
      member_id:1,
      Name:"",
      Status:'',
      Picture:''
    }
  ]);
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
  // const filteredClients = patients.filter((client) => {
  //   const matchesSearch = client.Name.toLowerCase().includes(searchQuery.toLowerCase());
  //   const matchesStatus = activeStatus === "All" || client.Status === activeStatus;
  //   return matchesSearch && matchesStatus 
  // });
   const [showWeaklyData,setSHowWeaklyData] = useState(false)
  const [isloadingGenerate,setIsLoadingGenerate] = useState(false)
  const [generateReportGoolsData,setGenerateReportGoolsData] = useState({"Type of progress":[]})
  // useEffect(() => {
  //   if(searchQuery!= '' && activeStatus != 'All'){
  //     setFilteredClients(() =>{
  //       return patients.filter(el => el.Name.toLowerCase().includes(searchQuery.toLowerCase()) && el.Status ==activeStatus)
  //     })
  //   }else {
  //     if(activeStatus != 'All'){
  //       setFilteredClients(() =>{
  //         return patients.filter(el =>{ return el.Status ==activeStatus})
  //       })        
  //     }else  if(searchQuery != ''){
  //       // console.log(patients.filter(el =>el.Name.toUpperCase().includes(searchQuery.toUpperCase())))
  //       setFilteredClients(() =>{
  //         return patients.filter(el =>el.Name.toUpperCase().includes(searchQuery.toUpperCase()))
  //       })    
  //     }else if(searchQuery == '' && activeStatus == 'All'){
  //       setFilteredClients(patients)
  //     }
  //   }
  // },[patients,searchQuery,activeStatus])

  const resolvedFiltersData = () => {
    if(searchQuery!= '' && activeStatus != 'All'){
        return patients.filter(el => el.Name.toLowerCase().includes(searchQuery.toLowerCase()) && el.Status ==activeStatus)
    }else {
      if(activeStatus != 'All'){
          return patients.filter(el =>{ return el.Status ==activeStatus})    
      }else  if(searchQuery != ''){
        // console.log(patients.filter(el =>el.Name.toUpperCase().includes(searchQuery.toUpperCase())))
          return patients.filter(el =>el.Name.toUpperCase().includes(searchQuery.toUpperCase()))
      }else if(searchQuery == '' && activeStatus == 'All'){
        return patients
      }
    }    
    return patients
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Application.aiStudio_patients();
        setPatients(response.data);
        setActiveMemberID(response.data[0].member_id)

        
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []); 
  useEffect(() => {
    if(activeMemberID!= null){
      Application.aiStudio_overview({
        member_id: activeMemberID, 
      }).then(res => {
        setOverviewData(res.data); 
        // console.log(res);
      });
    }
  },[activeMemberID])
  const [activePatinet,setActivePatent] = useState(patients[0])
  useEffect(() => {
    if(activeMemberID!=null){
      setActivePatent(patients.filter((el) => el.member_id == activeMemberID)[0])
    }
  },[activeMemberID])
  const [reloadData,setReloadData] = useState(false)
  const [reportsData,SetReportsData] = useState([])
  useEffect(() => {
    if(activeMemberID!=null){

      Application.showReportList({
        member_id:activeMemberID
      }).then(res => {
        SetReportsData(res.data)
      })
    }
  },[activeMemberID])
  const status: Array<string> = ["All", "Need to Check", "Checked","Incomplete Data"];
  const [isCreateReportMode,setisCreateReportMode] = useState(false)
  const [isEditMode,setEditMode] = useState(false)
  const [currentReportId,setCurrentReportId] = useState("")
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
    <div className="bg-white dark:bg-black-background h-full w-full px-5 flex items-start gap-2">
      {isCreateReportMode ?
        <div className="w-full">
          <div className="w-full mb-2 flex justify-between items-center">
            <div>
              <div onClick={() => {
                if(showWeaklyData){
                  setSHowWeaklyData(false)
                }else {
                  setisCreateReportMode(false)
                  setShowGenerateButton(true)
                }
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
          <div className="w-full bg-white border-light-border-color dark:bg-[#272727] rounded-[6px] dark:border-main-border border h-[75vh]">
            <div className="p-4">
              <GenerateReportTable setSHowWeaklyData={(active:boolean) => setSHowWeaklyData(active)} showWeaklyData={showWeaklyData} onCloseChart={() => {setShowGenerateButton(true)}} onShowChart={() => {setShowGenerateButton(false)}} reportId={currentReportId} isEdit={isEditMode} onClose={()=> {
                  setisCreateReportMode(false)
                  setShowGenerateButton(true)
              }} memberId={activeMemberID as number} setData={setGenerateReportGoolsData} data={generateReportGoolsData}></GenerateReportTable>

            </div>
          </div>
        </div>
      :
      <>
        {patients[0]?.member_id == 1 ?
          <div className="w-full flex flex-col gap-3 felx justify-center items-center h-[450px]">
            <BeatLoader size={10}  color="#0CBC84" ></BeatLoader>
          </div>
        :
        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex items-center justify-between">
            <div className="w-[171px]">

            </div>
            <ActivityMenu activeMenu={activeMenu} menus={menus} onChangeMenuAction={(menu) => setActiveMenu(menu)} />
            <div className="flex justify-end items-center gap-2">
              <Button onClick={() => {
                Application.getManualData().then(res => {
                  window.open(res.data)
                })
              }} theme="Aurora-pro">
                <img className="Aurora-icons-import" alt="" />
                Manual Data Entry</Button>
              <Button onClick={() => {
                setReloadData(true)
                Application.showReportList({
                  member_id : activeMemberID
                }).then((res) => {
                  SetReportsData(res.data) 
                  setReloadData(false)                   
                })
              }} theme="Aurora-pro">
                <img className={`${reloadData?"animate-spin":''} invert dark:invert-0`} src="./Themes/Aurora/icons/reload.svg" alt="" />
              </Button>
            </div>
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
              <div className="bg-white border dark:border-none border-light-border-color dark:bg-black-primary text-light-secandary-text dark:text-primary-text p-4 rounded-lg space-y-5">
                {overviewData?.description &&
                <>
                    <div
                      onClick={toggleStateSection}
                      className="flex items-center cursor-pointer gap-2 text-xs text-nowrap font-medium"
                    >
                      <img
                        src="/Themes/Aurora/icons/chevron-up.svg"
                        className={`transition-transform invert dark:invert-0 rotate-90  ${isStateOpen && "rotate-[180deg]"}`}
                        alt=""
                      />
                      General Condition
                      <div className="h-[1px] w-full bg-light-border-color dark:bg-white dark:opacity-50" />
                    </div>
                    {isStateOpen && (
                      <div className="text-xs text-primary-text">
                        <p className="mt-4 text-light-secandary-text dark:text-primary-text">
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
                </>
                }
                <>
                {overviewData?.alerts?
                  <>
                    <div onClick={toggleAlertSection} className="text-xs font-medium cursor-pointer flex gap-2 items-center">
                      <img
                        src="/Themes/Aurora/icons/chevron-up.svg"
                        className={`transition-transform invert dark:invert-0 rotate-90 ${isAlertOpen && "rotate-[180deg]"}`}
                        alt=""
                      />
                      Alert
                      <div className="h-[1px] w-full bg-light-border-color dark:bg-white dark:opacity-50t" />
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
                  </>
                :
                <>
                </>
                }
                </>
                {overviewData?.coach_reminders?
                  <>
                    <div onClick={toggleEngagementSection} className="text-xs text-nowrap font-medium cursor-pointer flex gap-2 items-center">
                      <img
                        src="/Themes/Aurora/icons/chevron-up.svg"
                        className={`transition-transform invert dark:invert-0 rotate-90  ${isEngagementOpen && "rotate-[180deg]"}`}
                        alt=""
                      />
                      Limits & Contradiction
                      <div className="h-[1px] w-full bg-light-border-color dark:bg-white dark:opacity-50" />
                    </div>
                    {isEngagementOpen &&(
                      <div className="my-4">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-light-border-color dark:border-gray-500">
                            
                            
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
                          <tr className="border-b border-light-border-color dark:border-gray-500">
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
                  </>
                :
                undefined}
              </div>
              </div>
          ) : activeMenu === "Copilot" ? (
            <AiChat memberID={activeMemberID} />
          ) : (
            <div className="bg-white dark:bg-black-primary rounded-[6px] border-light-border-color dark:border-main-border border h-[60vh]">
              <div className="flex justify-between w-full px-5 py-3">
                <div className="px-4 flex justify-start items-center">
                  <img className="w-[32px] h-[32px] rounded-full" src={`https://ui-avatars.com/api/?name=${activePatinet?.Name}`} alt="" />
                  <div className="ml-2">
                    <div className="text-light-secandary-text dark:text-[#FFFFFFDE] text-[10px]">{activePatinet.Name}</div>
                    <div className="text-light-secandary-text dark:text-[#FFFFFF99] text-[10px]">{activePatinet.Email}</div>
                  </div>
                </div>

                <div>
                  <Button disabled={patients[0]?.member_id == 1 || patients.length ==0} onClick={() => {
                    setEditMode(false)
                    setGenerateReportGoolsData({"Type of progress":[]})
                    Application.getWeeklyReport({
                      member_id: activeMemberID, 
                    }).then((res) => {
                      setGenerateReportGoolsData(res.data)
                    })
                    setisCreateReportMode(true)
                  }} theme="Aurora">
                    <img className="invert dark:invert-0" src="./Themes/Aurora/icons/additem.svg" alt="" />
                    Generate New Report</Button>
                </div>
              </div>
              <div className=" px-5">
                <div className="border-light-border-color dark:border-black-third mb-4 border"></div>
                  <ReportTable email={activePatinet.Email} onResolved={(resolveData,reportId) => {
                    setGenerateReportGoolsData(resolveData)
                    setisCreateReportMode(true)
                    setCurrentReportId(reportId)
                    setEditMode(true)
                  }} onUpdate={()=>{}} memberId={activeMemberID as number} data={reportsData}></ReportTable>
              </div>
            </div>
          )}
        </div>
        }

        <div className="flex flex-col gap-[10px] justify-start ">
          <SearchBox changeHandler={(e) => setSearchQuery(e.target.value)} theme="Aurora" placeholder="Search for client..." />
          <StatusMenu status={status} activeStatus={activeStatus as any} onChange={(value) => setActiveStatus(value)} />

          <div className="flex flex-col pr-1 max-h-[531px] w-full overflow-auto">
            {resolvedFiltersData().map((client, i) => (
              <ClientCard
                index={i}
                key={i}
                name={client.Name}
                email={client.Email}
                picture={client.Picture}
                memberID={client.member_id}
                setCardActive={setActiveMemberID}
                // onClick={() => {
                //   setcardActive(i + 1); // Update the active card index
                //   setActiveMemberID(client.member_id); // Set active member ID
                // }}
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