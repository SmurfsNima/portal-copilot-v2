/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TextField } from "symphony-ui"

const FormDataEntry = () => {
    const [data] = useState<any>({
        "Pain Intensity:":"I have no pain at the moment",
        "Pain Intensity2:":"I have no pain at the moment",
        "Pain Intensity3:":"-",
        "Pain Intensity4:":"-",

    })
    const navigate = useNavigate()
    return (
        <>
        <div className="w-full flex justify-center items-start px-6">
            <div className="bg-[#1E1E1E] min-h-[476px] overflow-hidden relative text-primary-text p-6 rounded-lg w-full shadow-lg ">
                <div className="flex justify-start items-center gap-2">
                    <div className="w-[50px] ">
                        <div onClick={() => {
                            navigate(-1)
                        }} className={`Aurora-tab-icon-container cursor-pointer h-[35px]`}>
                            <img className={`Aurora-icons-arrow-left`} />
                        </div>       
                    </div>   
                    <div className="text-[14px] text-[#FFFFFFDE]">View Form</div>       
                </div>

                <div className="bg-[#2F2F2F] rounded-[6px] flex justify-between mt-4">
                    <div className="text-[14px] font-medium text-[#FFFFFFDE] px-6 py-3">Back Pain Survey</div>
                    <div className="text-[12px] flex items-center font-medium text-[#FFFFFFDE] gap-2 px-6 py-3">
                        <span className="text-[12px] text-[#FFFFFF61] opacity-[38%]"> <span className="text-[12px] text-[#FFFFFFDE]">Client Email:</span></span>
                        SampleEmail@gmail.com</div>
                    <div className="text-[12px] flex items-center font-medium text-[#FFFFFFDE] gap-2 px-6 py-3">
                        <span className="text-[12px] text-[#FFFFFF61] opacity-[38%]"> <span className="text-[12px] text-[#FFFFFFDE]">Date:</span></span>
                        2024/11/10</div>                        
                </div>
                
                <div className="bg-[#2F2F2F] p-6  rounded-[6px] h-[400px] overflow-y-scroll mt-2">
                    {Object.keys(data).map(el => {
                        return (
                            <div className="bg-[#272727] w-full mt-2 rounded-[6px] p-6 border border-[#383838]">
                                <div className="w-[467px]">
                                    <TextField label={el} inValid={false} name="" onBlur={()=>{}} onChange={() => {}} type="text" value={data[el]} theme="Aurora" />

                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
    )
}

export default FormDataEntry