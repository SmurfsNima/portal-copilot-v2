/* eslint-disable @typescript-eslint/no-explicit-any */
import { Application } from "@/api";
import { InfoCard } from "@/components"
import ConfirmShareModal from "@/components/confirmShare";
import useModalAutoClose from "@/hooks/UseModalAutoClose";
import { Pationt } from "@/model";
import { AppContext } from "@/store/app";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { Button } from "symphony-ui"

const TreatMentPlan = () => {
    const theme = useSelector((state: any) => state.theme.value.name);
    const { id } = useParams<{ id: string }>();
    const [, setPatient] = useState<Pationt>();
    const { getPatientById } = useContext(AppContext);
    const navigate = useNavigate()
    useEffect(() => {
        setPatient(getPatientById(Number(id)));
    }, [id]);    
    const [historyData,setHistory] = useState([])
    // const [isCreateNew,setIsCreateNew] = useState(false)
    const [showReportModal,setSHowReportModal] = useState(-1)
    const showReportModalRefrence = useRef(null)
    const showReportModalButtonRefrence = useRef(null)
    useModalAutoClose({
        refrence:showReportModalRefrence,
        buttonRefrence:showReportModalButtonRefrence,
        close:() => {
            setSHowReportModal(-1)
        }
    })
    const [isLoading,setIsLoading] = useState(false)
    const getHistory =() => {
        setIsLoading(true)
        Application.showHistory({
          member_id: id,
        }).then(res => {
            setHistory(res.data)
            setIsLoading(false)
        });
    }
    const [shareReportId, setShareReportId] = useState<number | null>(null);
    const [isOpenShare,setISOpenShare] = useState(false)
    useEffect(() => {
        getHistory()
    },[])
    return (
        <>
            <div className="flex flex-col gap-3 w-full">
                <InfoCard></InfoCard>
                <div className="flex flex-col items-center justify-start bg-white border-light-border-color dark:bg-black-primary text-primary-text text-xs w-full h-[340px] overflow-y-scroll p-3 rounded-lg space-y-3 border dark:border-main-border">
                {isLoading ?
                <div className="w-full h-[300px] flex justify-center items-center">
                    <BeatLoader color="#0CBC84" size={10}></BeatLoader>
                </div>
                :
                <>
                    <div className="w-full flex justify-end">
                        <Button onClick={() => {
                            // setIsCreateNew(true)
                            navigate("/generateNewTreatmentPlan/"+id)
                        }} theme={theme}>
                            <img src="./Themes/Aurora/icons/additem.svg" className="Aurora-icons-AddNewItem" alt="Add" />
                            Generate New Plan                    
                        </Button>
                    </div>
                    {
                        historyData.length ==0 ?
                            <div className="text-center space-y-2 ">
                                <img src="./Themes/Aurora/icons/EmptyState.svg" alt="Empty State" />
                                <h1>No Result to Show</h1>
                            </div>
                        :
                            <div className="w-full">
                                <div className=" bg-white border dark:border-none border-light-border-color dark:bg-[#272727] px-4 rounded-[6px]">
                                <div className="flex justify-between items-center">
                                    <div className=" text-light-secandary-text dark:text-[#FFFFFFDE] py-5 w-[250px] text-[14px]">
                                    Report Title
                                    </div>
                                    <div className="text-light-secandary-text dark:text-[#FFFFFFDE] py-5 w-[360px] flex items-center justify-center text-[14px]">
                                    Created on
                                    </div>
                                    <div className="text-light-secandary-text dark:text-[#FFFFFFDE] py-5 w-[300px] flex items-center justify-end pr-10 text-[14px]">
                                    Action
                                    </div>

                                </div>
                                <div className=" border-light-border-color dark:border-black-third  border"></div>
                                {historyData.length > 0 && (
                                    <div className="h-[25vh] overflow-y-scroll">
                                    {historyData.map((el:any,index) => {
                                        return (
                                        <>
                                            <div className="flex justify-between items-center my-1">
                                            <div className="text-light-secandary-text dark:text-[#FFFFFFDE] py-2 w-[250px] text-[12px]">
                                                {el.t_title}
                                            </div>
                                            <div className="text-light-secandary-text dark:text-[#FFFFFFDE] py-2 w-[360px] flex justify-center items-center text-[12px]">
                                                {el.formatted_date+" "+el.formatted_time}
                                            </div>
                                            <div className="text-[#FFFFFFDE] overflow-visible relative py-2 w-[300px] gap-5 flex justify-end px-5 items-center text-[12px]">
                                                <img
                                                ref={showReportModalButtonRefrence}
                                                onClick={() => {
                                                    if(showReportModal == index){
                                                        setSHowReportModal(-1)
                                                    }else {
                                                        setSHowReportModal(index)
                                                    }
                                                }}
                                                className="cursor-pointer"
                                                src={"./Themes/Aurora/icons/document-download3.svg"}
                                                />
                                                {showReportModal == index &&
                                                    <div ref={showReportModalRefrence} className=" absolute top-8 right-10 z-20 w-[95px] rounded-[6px] p-2 bg-[#2F2F2F] border border-[#383838]">
                                                        <div onClick={() => {
                                                            window.open(
                                                            "/#/ClientReportPage/"+id+"/" +
                                                                el.t_plan_id,
                                                            "_blank"
                                                            )                                                        
                                                        }} className="text-[#FFFFFFDE] text-[12px] cursor-pointer border-b border-b-[#383838] pb-2">Client Report</div>
                                                        <div onClick={() => {
                                                            window.open(
                                                            "/#/ClinicReportPage/" +
                                                                el.t_plan_id,
                                                            "_blank"
                                                            )                                                        
                                                        }} className="text-[#FFFFFFDE] text-[12px] cursor-pointer pt-2 ">Coach Report</div>
                                                    </div>
                                                }
                                                <div className="relative"> <img
                                                onClick={() => {
                                                    setShareReportId(el.t_plan_id)
                                                    setISOpenShare(true)
                                                }
                                                }
                                                className="cursor-pointer"
                                                src={"./Themes/Aurora/icons/share.svg"}
                                                />
                                                </div>
                                            
                                                <img
                                                onClick={() => {
                                                    navigate('/showTreatmentPlan/'+id+'/'+el.t_plan_id)
                                                }}
                                                className="cursor-pointer"
                                                src={"./Themes/Aurora/icons/edit4.svg"}
                                                />
                                            </div>
                                            </div>
                                            <div className=" border-light-border-color dark:border-black-third  border"></div>
                                        </>
                                        );
                                    })}
                                    </div>
                                )}
                                </div>
                            </div>
                    }
                </>
                }
                </div>
            </div>
            <ConfirmShareModal title="Share File" content={`Are you sure you want to share this report with ‘${''}’?`} isOpen={isOpenShare} onClose={() => {setISOpenShare(false)}} onConfirm={()=>{
                Application.ShareTreatMentPlanReport({
                    type: 'email',   
                    member_id:id,
                    report_id:shareReportId
                })
                setISOpenShare(false)
            }} ></ConfirmShareModal>            
        </>
    )
}

export default TreatMentPlan