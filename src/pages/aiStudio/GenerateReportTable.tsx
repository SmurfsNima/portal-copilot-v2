import { Application } from "@/api"
import { useState } from "react"
import { FiExternalLink } from "react-icons/fi"
import { Button } from "symphony-ui"

/* eslint-disable @typescript-eslint/no-explicit-any */
interface GenerateReportTableProps {
    data:any
    setData:(value:any) => void
    memberId:number
    onClose:() => void
}

const GenerateReportTable:React.FC<GenerateReportTableProps> = ({data,setData,onClose,memberId}) => {
    const resolveStatusColor = (ststus:string) => {
        if(ststus == 'OK'){
            return '#03DAC5'
        }
        if(ststus == 'Not OK'){
            return "#FBAD37"
        }  
      return '#FC5474'        
    }
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
        })
        setISComplete(true)
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
                                <input className="w-4 h-4 bg-transparent" type="checkbox" />
                                <label htmlFor="">Via SMS</label>
                            </div>
                            <div className="flex justify-center gap-2 mt-2 items-center">
                                <input className="w-4 h-4 bg-transparent" type="checkbox" />
                                <label htmlFor="">Via Mail</label>
                            </div>                            
                        </div>
                        <div className="flex justify-center mt-10">
                            <Button onClick={onClose} theme="Aurora">Finish</Button>
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
                        <Button onClick={nextAction} theme="Aurora">Next</Button>
                    </div>
                </>
            }
        </>
    )
}

export default GenerateReportTable