/* eslint-disable @typescript-eslint/no-explicit-any */
import { Application } from "@/api"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BeatLoader } from "react-spinners"
import { TextField } from "symphony-ui"

const FormDataEntry = () => {
    const {id,name} = useParams()
    const [data,setData] = useState<any>({

    })
    const [isLoading,setIsLoading] = useState(true)
    useEffect(() => {
        Application.getDataTracking({
            member_id:id,
            form_name:name
        }).then(res => {
            setData(res.data)
            setIsLoading(false)
        })        
    })
    const navigate = useNavigate()
    return (
        <>
        <div className="w-full flex justify-center items-start px-6">
            <div className="dark:bg-[#1E1E1E] bg-gray-100 dark:border-none min-h-[476px] overflow-hidden relative dark:text-primary-text text-light-secandary-text p-6 rounded-lg w-full shadow-lg border-light-border-color ">
                <div className="flex justify-start items-center gap-2">
                    <div className="w-[50px] ">
                        <div onClick={() => {
                            navigate(-1)
                        }} className={`Aurora-tab-icon-container cursor-pointer h-[35px]`}>
                            <img className={`Aurora-icons-arrow-left`} />
                        </div>       
                    </div>   
                    <div className="text-[14px] text-light-secandary-text dark:text-[#FFFFFFDE]">View Form</div>       
                </div>
                {isLoading ?
                    <div className="w-full flex h-[200px] justify-center items-center">
                        <BeatLoader size={10} ></BeatLoader>
                    </div>
                    :
                    <>
                        <div className="dark:bg-[#2F2F2F] bg-gray-50 border-light-border-color rounded-[6px] flex justify-between mt-4">
                            <div className="text-[14px] font-medium dark:text-[#FFFFFFDE] px-6 py-3">{name}</div>
                            {/* <div className="text-[12px] flex items-center font-medium text-[#FFFFFFDE] gap-2 px-6 py-3">
                                <span className="text-[12px] text-light-primary-text dark:text-[#FFFFFF61] opacity-[38%]"> <span className="text-[12px] text-light-secandary-text dark:text-[#FFFFFFDE]">Client Email:</span></span>
                                ''</div>
                            <div className="text-[12px] flex items-center font-medium text-[#FFFFFFDE] gap-2 px-6 py-3">
                                <span className="text-[12px] text-light-primary-text dark:text-[#FFFFFF61] opacity-[38%]"> <span className="text-[12px] text-light-secandary-text dark:text-[#FFFFFFDE]">Date:</span></span>
                                ''</div>                         */}
                        </div>
                        
                        <div className="dark:bg-[#2F2F2F] bg-gray-50 p-6  rounded-[6px] h-[400px] overflow-y-scroll mt-2">
                            {Object.keys(data).map(el => {
                                return (
                                    <div className="dark:bg-[#272727] bg-gray-100 border-light-border-color w-full mt-2 rounded-[6px] p-6 border dark:border-[#383838]">
                                        <div className="w-[467px]">
                                            <TextField disabled label={el} inValid={false} name="" onBlur={()=>{}} onChange={() => {}} type="text" value={data[el]} theme="Aurora" />

                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                }
            </div>
        </div>
        </>
    )
}

export default FormDataEntry