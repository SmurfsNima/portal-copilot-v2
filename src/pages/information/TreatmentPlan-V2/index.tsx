/* eslint-disable @typescript-eslint/no-explicit-any */
import { Application } from "@/api";
import { InfoCard } from "@/components"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "symphony-ui"

const TreatMentPlan = () => {
    const theme = useSelector((state: any) => state.theme.value.name);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate()
    const [historyData,setHistory] = useState([])
    // const [isCreateNew,setIsCreateNew] = useState(false)
    const getHistory =() => {
        Application.showHistory({
          member_id: id,
        }).then(res => {
            setHistory(res.data)
        });
    }
    useEffect(() => {
        getHistory()
    })
    return (
        <>
            <div className="flex flex-col gap-3 w-full">
                <InfoCard></InfoCard>
                <div className="flex flex-col items-center justify-start bg-white border-light-border-color dark:bg-black-primary text-primary-text text-xs w-full h-[340px] overflow-y-scroll p-3 rounded-lg space-y-3 border dark:border-main-border">
                <div className="w-full flex justify-end">
                    <Button onClick={() => {
                        // setIsCreateNew(true)
                        navigate("/generateNewTreatmentPlan/"+id)
                    }} theme={theme}>
                        <img className="Aurora-icons-AddNewItem" alt="Add" />
                        Generate New Plan                    
                    </Button>
                </div>
                {
                    historyData.length ==0 ?
                        <div className="text-center">
                            <img src={"/images/EmptyState.png"} alt="Empty State" />
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
                                Create on
                                </div>
                                <div className="text-light-secandary-text dark:text-[#FFFFFFDE] py-5 w-[300px] flex items-center justify-end pr-10 text-[14px]">
                                Action
                                </div>

                            </div>
                            <div className=" border-light-border-color dark:border-black-third  border"></div>
                            {historyData.length > 0 && (
                                <div className="h-[25vh] overflow-y-scroll">
                                {historyData.map((el:any) => {
                                    return (
                                    <>
                                        <div className="flex justify-between items-center my-1">
                                        <div className="text-light-secandary-text dark:text-[#FFFFFFDE] py-2 w-[250px] text-[12px]">
                                            {el.formatted_date}
                                        </div>
                                        <div className="text-light-secandary-text dark:text-[#FFFFFFDE] py-2 w-[360px] flex justify-center items-center text-[12px]">
                                            {el.formatted_time}
                                        </div>
                                        <div className="text-[#FFFFFFDE] py-2 w-[300px] gap-2 flex justify-end px-5 items-center text-[12px]">
                                            <img
                                            onClick={() => {
                                                // Application.getReportString({
                                                //   member_id: memberId,
                                                //   report_id: el.report_id,
                                                // }).then((res) => {
                                                //   handleDownload(res.data);
                                                // });
                                                // navigate("/weaklyReport/"+memberId+"/"+el.report_id)
                                                // window.open(location.host+"/#/weaklyReport/"+memberId+"/"+el.report_id)
                                            }}
                                            className="cursor-pointer"
                                            src={"./Themes/Aurora/icons/document-download3.svg"}
                                            />
                                            <div className="relative"> <img
                                            onClick={() => {
                                            }
                                            }
                                            className="cursor-pointer"
                                            src={"./Themes/Aurora/icons/share.svg"}
                                            />
                                            </div>
                                        
                                            <img
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
                </div>
            </div>
        </>
    )
}

export default TreatMentPlan