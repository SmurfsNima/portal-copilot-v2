import { Application } from "@/api"
// import WeaklyReport from "@/components/Pdf/WeaklyReport"
// import { AppContext } from "@/store/app"
import { publish } from "@/utils/event"
import { useState } from "react"
import { FiExternalLink } from "react-icons/fi"
import { Button } from "symphony-ui"
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
                    <div className="w-full bg-[#383838] rounded-[6px]">
                        <div className="flex justify-start items-center">
                            <div className="w-[323px] text-[#FFFFFFDE] py-5 pl-4 text-[14px] font-medium">Type of Progress</div>
                            <div className="w-[140px] text-[#FFFFFFDE] py-5 flex justify-center text-[14px] font-medium">Goal</div>
                            <div className="w-[140px] text-[#FFFFFFDE] py-5 flex justify-center  text-[14px] font-medium">Current Value</div>
                            <div className="w-[140px] text-[#FFFFFFDE] py-5 flex justify-center  text-[14px] font-medium">Target Goal</div>
                            <div className="w-[140px] text-[#FFFFFFDE] py-5 flex justify-center  text-[14px] font-medium">Status</div>
                            <div className="w-[140px] text-[#FFFFFFDE] py-5 flex justify-center  text-[14px] font-medium">Historical Data</div>
                            <div className="w-[300px] text-[#FFFFFFDE] py-5 flex justify-center  text-[14px] font-medium">Recommendation</div>
                        </div>
                        <div className="w-full h-[1px] border-b border-white opacity-25"></div>
                        <div className="h-[55vh] overflow-y-scroll">
                            {data["Type of progress"]?.map((el:string,index:number) => {
                                return (
                                    <div className="flex justify-start items-center">
                                        <div className="w-[323px] text-[#FFFFFFDE] py-5 pl-4 pr-3 text-[12px] font-medium">{el}</div>
                                        <div className="w-[140px] text-[#FFFFFFDE] py-5 flex justify-center text-[12px] font-medium">{data["Goal"][index]}</div>
                                        <div className="w-[140px] text-[#FFFFFFDE] py-5 flex justify-center  text-[12px] font-medium">{data["Current value"][index]}</div>
                                        <div className="w-[140px] text-[#FFFFFFDE] py-5 flex justify-center  text-[12px] font-medium">{data["Target goal"][index]}</div>
                                        <div className="w-[140px] text-[#1E1E1E] py-5 flex justify-center  text-[8px] font-medium"><span className="w-[53px] h-[16px] rounded-[16px] flex justify-center items-center" style={{backgroundColor:resolveStatusColor(data["Status"][index])}}>{data["Status"][index]}</span></div>
                                        <div className="w-[140px] text-[#FFFFFFDE] py-5 flex justify-center  text-[14px] font-medium"><FiExternalLink className="cursor-pointer"></FiExternalLink></div>
                                        <div className="w-[300px] text-[#FFFFFFDE] py-5 flex justify-center  text-[12px] font-medium">
                                            <input type="text" onChange={(e) => {
                                                handleRecomendChange(index,e.target.value)
                                            }} className="w-full text-center bg-[#383838]" placeholder="-" value={data["Recommendation"][index]} />
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
    )
}

export default GenerateReportTable