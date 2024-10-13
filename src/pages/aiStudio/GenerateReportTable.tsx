import { Application } from "@/api"
import MethylationChart from "@/components/charts/MethylationChart"
// import WeaklyReport from "@/components/Pdf/WeaklyReport"
// import { AppContext } from "@/store/app"
import { publish } from "@/utils/event"
import { useEffect, useState } from "react"
import { FiExternalLink } from "react-icons/fi"
// import { useNavigate } from "react-router-dom"
import { Button, TextField,TextArea } from "symphony-ui"
// import { pdf } from "@react-pdf/renderer";
// import { blobToBase64 } from "@/help"
/* eslint-disable @typescript-eslint/no-explicit-any */
interface GenerateReportTableProps {
    data:any
    setData:(value:any) => void
    memberId:number
    onClose:() => void
    isEdit?:boolean
    reportId?:string
}

const GenerateReportTable:React.FC<GenerateReportTableProps> = ({data,isEdit,setData,onClose,memberId}) => {
    const resolveStatusColor = (ststus:string) => {
        if(ststus == 'OK'){
            return '#03DAC5'
        }
        if(ststus == 'Not OK'){
            return "#FBAD37"
        }  
      return '#FC5474'        
    }
    // const navigate = useNavigate()
    // const {reportManager} = useContext(AppContext);
    const handleRecomendChange = (index:number, value:string) => {
        const updatedRecommendation = [...data.Recommendation];
        updatedRecommendation[index] = value;

        // Update state with the new "Recommendation" array
        setData({
            ...data,
            Recommendation: updatedRecommendation
        });
    };    

    const handleTargetGoalChange = (index:number, value:string) => {
        const updatedRecommendation = [...data["Target goal"]];
        updatedRecommendation[index] = value;

        // Update state with the new "Recommendation" array
        setData({
            ...data,
            "Target goal": updatedRecommendation
        });
    };       

    const handleStatusChange = (index:number, value:string) => {
        const updatedRecommendation = [...data["Status"]];
        updatedRecommendation[index] = value;

        // Update state with the new "Recommendation" array
        setData({
            ...data,
            "Status": updatedRecommendation
        });
    };    
    const [isComplete,setISComplete] = useState(false)
    const nextAction = () => {
        Application.ai_studio_update_weekly_data({
            member_id:memberId,
            data:data
        }).then(() => {
            // Application.downloadReportForGenerate({
            //      member_id:memberId,
            //     report_id:res.data.report_id
            // }).then(resovle => {
            // //    const pdf =  reportManager.generatePDFReport(resovle.data)
            //     pdf(<WeaklyReport values={resovle.data} />).toBlob().then(pdfBlob => {
            //         blobToBase64(pdfBlob).then(base64Pdf => {
            //             console.log(base64Pdf)
            //             Application.saveAiStadioReport({
            //                 member_id : memberId,
            //                 weekly_report_string:base64Pdf,
            //                 report_id:res.data.report_id                         
            //             })
            //         });
            //     });
            // })
        })
        publish("completeChanges",{})
        setISComplete(true)
    }
    const saveChanges =() => {
        Application.AiStudioEditSavedReport({
            member_id:memberId,
            report_id:'',
            data:data
        })
        publish("completeChanges",{})
        onClose()
    }
    const getChartData =() => {
        Application.WeaklyReportGraph({
            member_id:memberId
        }).then(res => {
            console.log(res)
        })
    }
    const [showWeaklyData,setSHowWeaklyData] = useState(false)
    useEffect(() => {
        if(showWeaklyData){
            getChartData()
        }
    },[showWeaklyData])

    return (
        <>
            {isComplete ?
                <>
                    <div className="text-[#FFFFFFDE]">
                        <div className="text-center text-[14px]">Do you want send this report to client?</div>
                        <div className="text-[12px] text-center mt-6 text-[#FFFFFF99]">By confirming this option, the report will be sent directly through your chosen channel</div>
                        <div className="text-center mt-4">
                            <div className="flex justify-center gap-2 items-center">
                                <input id="viasms" className="w-4 h-4 rounded-[4px] bg-transparent" type="checkbox" />
                                <label className="text-[12px]" htmlFor="viasms">Via SMS</label>
                            </div>
                            <div className="flex justify-center gap-2 mt-2 items-center">
                                <input id="viaEmail" className="w-4 rounded-[4px] h-4 bg-transparent" type="checkbox" />
                                <label className="text-[12px]" htmlFor="viaEmail">Via Mail</label>
                            </div>                            
                        </div>
                        <div className="flex justify-center mt-10">
                            <Button onClick={onClose} theme="Aurora-pro">
                                <img src={"./Themes/Aurora/icons/tick-square3.svg"} />
                                Finish</Button>
                        </div>
                    </div>
                </>
            :
                <>
                {showWeaklyData ?
                <>
                {/* <Outlet></Outlet> */}
                <div className="w-full h-full bg-[#1E1E1E] p-8 border-[#383838] border rounded-[6px]">
                    <div className="text-[14px] text-[#FFFFFFDE] mb-8">‘Days Met Calories Target’ Historical Data</div>
                    <div className="w-full  bg-[#1E1E1E] p-8 border-[#383838] border rounded-[6px]">
                        <div className="mb-4 flex justify-start items-center gap-8">
                            <div className="text-[#FFFFFF99] text-[12px]">Average Value: <span className="font-semibold text-[14px] text-[#FFFFFFDE] ml-2">50</span></div>
                             <div className="text-[#FFFFFF99] text-[12px]">Current Value: <span className="font-semibold text-[14px] text-[#FFFFFFDE] ml-2">60</span></div>
                        </div>
                        <MethylationChart></MethylationChart>   

                    </div>

                </div>
                </>
                :
                <>
                        <div className="w-full bg-[#383838] rounded-[6px]">
                            <div className="flex justify-start items-center">
                                <div className="w-[200px] text-[#FFFFFFDE] py-5 pl-4 text-[14px] font-medium">Type of Progress</div>
                                <div className="w-[140px] text-[#FFFFFFDE] py-5 flex justify-center text-[14px] font-medium">Goal</div>
                                <div className="w-[140px] text-[#FFFFFFDE] py-5 flex justify-center  text-[14px] font-medium">Current Value</div>
                                <div className="w-[100px] text-[#FFFFFFDE] py-5 flex justify-center  text-[14px] font-medium">Target Goal</div>
                                <div className="w-[200px] text-[#FFFFFFDE] py-5 flex justify-center  text-[14px] font-medium">Status</div>
                                <div className="w-[140px] text-[#FFFFFFDE] py-5 flex justify-center  text-[14px] font-medium">Historical Data</div>
                                <div className="w-[400px] text-[#FFFFFFDE] py-5 flex justify-center  text-[14px] font-medium">Recommendation</div>
                            </div>
                            <div className="w-full h-[1px] border-b border-white opacity-25"></div>
                            <div className="h-[55vh] overflow-y-scroll">
                                {data["Type of progress"]?.map((el:string,index:number) => {
                                    return (
                                        <div className="flex justify-start items-center">
                                            <div className="w-[200px] text-justify text-[#FFFFFFDE] py-5 pl-4 pr-3 text-[12px] font-medium">{el}</div>
                                            <div className="w-[140px] text-[#FFFFFFDE] py-5 flex justify-center text-[12px] font-medium">{data["Goal"][index]}</div>
                                            <div className="w-[140px] text-[#FFFFFFDE] py-5 flex justify-center  text-[12px] font-medium">{data["Current value"][index]}</div>
                                            <div className="w-[100px] text-[#FFFFFFDE] py-5 flex justify-center  text-[12px] font-medium">
                                               <TextField data-width="full" theme="Aurora" name="" onBlur={()=>{}} onChange={(e)=>{handleTargetGoalChange(index,e.target.value)}} type="text" value={data["Target goal"][index]} inValid={false}></TextField>
                                                {/* <input type="text" onChange={(e) => {
                                                    handleTargetGoalChange(index,e.target.value)
                                                }} className="w-full text-center bg-[#383838]" placeholder="-" value={data["Target goal"][index]} /> */}
                                                {}
                                            </div>
                                            <div className="w-[200px] text-[#1E1E1E] py-5 px-4 flex justify-center  text-[8px] font-medium">
                                                <div className="w-full  bg-[#1E1E1E] min-h-[58px] p-2 flex justify-center rounded-[6px] border border-[#383838]">
                                                 <div>
                                                    <div onClick={() => {
                                                        handleStatusChange(index,'Not OK')
                                                    }} className="flex justify-center gap-2 items-center">
                                                        <div className={`w-4 h-4 ${data["Status"][index] == 'Not OK'?' bg-primary-color':'bg-[#2F2F2F]'} rounded-full flex justify-center items-center`}>
                                                            <div className="w-2 h-2 rounded-full bg-[#2F2F2F]"></div>
                                                        </div>
                                                        <span className={`w-[53px] h-[16px] rounded-[16px] flex justify-center items-center ${data["Status"][index] == 'Not OK'?'text-[#1E1E1E]':'border border-[#383838] text-[#FFFFFFDE]'}`} style={{backgroundColor:data["Status"][index] == 'Not OK' ?resolveStatusColor('Not OK'):'unset'}}>Not OK</span>
                                                    </div>

                                                    <div onClick={() => {
                                                        handleStatusChange(index,'OK')
                                                    }} className="flex mt-3 justify-center gap-2 items-center">
                                                        <div className={`w-4 h-4 ${data["Status"][index] == 'OK'?' bg-primary-color':'bg-[#2F2F2F]'} rounded-full flex justify-center items-center`}>
                                                            <div className="w-2 h-2 rounded-full bg-[#2F2F2F]"></div>
                                                        </div>
                                                        <span className={`w-[53px] h-[16px] rounded-[16px] flex justify-center items-center ${data["Status"][index] == 'OK'?'text-[#1E1E1E]':'border border-[#383838] text-[#FFFFFFDE]'}`} style={{backgroundColor:data["Status"][index] == 'OK' ?resolveStatusColor('OK'):'unset'}}>OK</span>
                                                    </div>
                                                </div>
                                                 </div>

                                                </div>
                                            <div className="w-[140px] text-[#FFFFFFDE] py-5 flex justify-center  text-[14px] font-medium"><FiExternalLink onClick={() => setSHowWeaklyData(true)} className="cursor-pointer"></FiExternalLink></div>
                                            <div className="w-[400px] text-[#FFFFFFDE] py-5 flex justify-center  text-[12px] font-medium">
                                                  <TextArea   theme="Aurora" name="" onBlur={()=>{}} onChange={(e)=>{handleRecomendChange(index,e.target.value)}} value={data["Recommendation"][index]} inValid={false}></TextArea>
                                                {/* <input type="text" onChange={(e) => {
                                                    handleRecomendChange(index,e.target.value)
                                                }} className="w-full text-center bg-[#383838]" placeholder="-" value={data["Recommendation"][index]} /> */}
                                            </div>                            
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                        <div className="w-full flex mt-2 justify-center">
                            {isEdit ?
                            <Button onClick={() => {
                                saveChanges()
                            }} theme="Aurora-pro">
                                <img src={"./Themes/Aurora/icons/tick-square3.svg"} />
                                Save Changes</Button>                        
                            :
                            <Button onClick={nextAction} theme="Aurora-pro">
                                <img src={"./Themes/Aurora/icons/tick-square3.svg"} />
                                Next</Button>
                            }
                        </div>
                </>
                }
                </>
            }
        </>
    )
}

export default GenerateReportTable