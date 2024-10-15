/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react"
import { BeatLoader } from "react-spinners"
import BenchmarkModal from "../Treatment Plan/benchmarkModal"
import { Button } from "symphony-ui"
import TextBoxAi from "./TextBoxAi"
import { useNavigate, useParams } from "react-router-dom"
import { Application } from "@/api"
import GenerateWithAiModal from "@/pages/aiStudio/GenerateWithAiModal"

const ViewTreatmentPlan = () => {
    const navigate = useNavigate()
    const [isLoading,setIsLoading] = useState(true)
    const { report} = useParams<{ id: string,report:string }>();
    const [treatmentPlanData,setTratmentPlanData] = useState<any>(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const resolveChangeTextFields =(value:string,index:number,key:string,doOrdos:string) => {
        console.log(value)
        setTratmentPlanData((pre:any) => {
            const old = pre
            old.treatment_plans[index][key][doOrdos] =value.includes(",")?[...value.split(",")][0]:[value]
            return old
        })
    }
    const [isloadingGenerate,setIsLoadingGenerate] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        Application.showTreatmentPlan({
             tplan_id:report
        }).then(res => {
            setTratmentPlanData(res.data)
            setIsLoading(false)
        })
    },[])
    const [showGenerateWithAi,setShowGenerateWithAi] = useState(false)
    const modalAiGenerateRef = useRef(null)
    const updateTreatmentPalnData= (value:any) => {
         setTratmentPlanData((pre:any) => {
            const old = pre
            old.treatment_plans[0] =value
            return old
        })       
    }    
    return (
        <div className="w-full px-4">
            <div className="w-full py-6 px-4 bg-white rounded-[6px] dark:bg-[#1E1E1E] border border-light-border-color dark:border-[#383838] h-[610px] ">
                <div className="flex justify-start items-center gap-4">
                    <div onClick={() => {
                        navigate(-1)
                    }} className={`Aurora-tab-icon-container w-[60px] cursor-pointer h-[35px]`}>
                        <img className={`Aurora-icons-arrow-left`} />
                    </div> 
                    <div className="text-[14px] font-medium text-light-secandary-text dark:text-[#FFFFFFDE]">
                        Edit Treatment Plan
                    </div>
                </div>                
                <div className="bg-white rounded-[6px] px-6 py-6 h-[390px] mt-2  border border-light-border-color dark:bg-[#2F2F2F] dark:border-[#383838]">
                    {isLoading ?
                    <div className="w-full flex justify-center mt-3">
                        <BeatLoader color="white" size={12}></BeatLoader>
                    </div>
                    :    
                    <div className="w-full dark:bg-[#272727] border h-[350px] overflow-y-scroll border-light-border-color p-6 dark:border-[#383838] rounded-[6px]">
                        <div className="dark:text-[#FFFFFFDE] text-light-secandary-text gap-2 flex justify-start items-center text-[14px] font-medium">
                            <span className="w-1 h-1 bg-light-secandary-text rounded-full dark:bg-[#FFFFFFDE]"></span>
                            Client Condition Insights
                        </div>

                        <div className="dark:bg-[#1E1E1E] border mt-4 py-6 px-8 text-[12px] text-justify text-light-secandary-text dark:text-[#FFFFFFDE] border-light-border-color dark:border-[#383838] rounded-[6px] ">
                            <div>{treatmentPlanData?.description_section?.description}</div>
                            <div className="dark:bg-[#1E1E1E] flex items-center gap-1 mt-3 dark:text-[#FFFFFFDE] text-[12px]">Needs Focus Benchmarks:
                                <img
                                    className=" transition-transform cursor-pointer w-5 h-5"
                                    onClick={() => {setIsModalOpen(true)}}
                                    src="./Themes/Aurora/icons/export-v2.svg"
                                    alt=""
                                />
                            </div>
                            <BenchmarkModal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false)}} />
                            {treatmentPlanData?.description_section["need focus benchmarks"].map((el:any) => {
                                return (
                                    <div className="ml-4 flex justify-start items-center gap-2 mt-1">
                                        <span className="w-[3px] h-[3px] bg-light-secandary-text rounded-full dark:bg-[#FFFFFFDE]"></span>
                                    {el}</div>
                                )
                            })}
                        </div>

                        <div className="dark:text-[#FFFFFFDE] relative mt-4 text-light-secandary-text gap-2 flex justify-between items-center text-[14px] font-medium">
                            <div className="w-full flex justify-start gap-2 items-center">
                                <span className="w-1 h-1 bg-light-secandary-text rounded-full dark:bg-[#FFFFFFDE]"></span>
                                Report Details
                            </div>
                            <Button onClick={() => {
                                // setIsLoadingGenerate(true)
                                setShowGenerateWithAi(true)
                            }} theme="Aurora-pro">
                                {isloadingGenerate ?
                                <div className="px-3 w-full flex justify-center items-center">
                                    <BeatLoader size={8} color="#7F39FB"></BeatLoader>
                                </div>
                                :
                                <>
                                <div className={`Aurora-icons-stars w-[15px]`}></div>
                                <div className="w-[90px]">
                                        Generate by AI
                                </div>
                                </>
                                }
                            </Button>
                            {showGenerateWithAi &&
                                <div className="absolute right-[140px] top-[30px] z-40">
                                    <GenerateWithAiModal onSuccess={(val) => {
                                        setShowGenerateWithAi(false)
                                        setIsLoadingGenerate(true)
                                        Application.UpdateTreatmentPlanWithAi({
                                            ai_generation_mode:val,
                                            input_text:treatmentPlanData?.treatment_plans[0],
                                        }).then((res) => {
                                            // setLocalVal(res.data.map((e:any) => e))
                                            setIsLoadingGenerate(false)
                                            updateTreatmentPalnData(res.data)
                                        })                          
                                    }} refEl={modalAiGenerateRef}></GenerateWithAiModal>                                    
                                </div>
                            }
                        </div>

                        <div className="w-full border-b border-b-light-border-color dark:border-b-[#383838] pb-3 font-medium text-[14px] mt-6 text-light-secandary-text dark:text-[#FFFFFFDE] flex justify-start">
                            <div className="w-[350px]">Benchmark Areas</div>
                            <div className="w-[450px]">First 12 weeks</div>
                            <div className="w-[450px]">Second 12 weeks</div>
                        </div>
                                {treatmentPlanData?.treatment_plans?.map((el:any,index:number) => {
                                    return (
                                        <div className="text-light-secandary-text flex border-b border-b-light-border-color dark:border-b-[#383838] text-[12px] py-4 w-full dark:text-[#FFFFFFDE] ">
                                            <div className="flex w-[350px]"> <div className=" w-[90px] overflow-hidden">{el.subCategory}</div> <span className="ml-1">{el.area}</span></div>
                                            <div>

                                                <TextBoxAi label="" onChange={(val) => {
                                                    resolveChangeTextFields(val,index,"first12Weeks",'dos')
                                                }} value={el.first12Weeks.dos.map((e:string) =>e)}></TextBoxAi>

                                                {/* <TextBoxAi label="donts" onChange={(val) => {
                                                    resolveChangeTextFields(val,index,"first12Weeks",'donts')
                                                }} value={el.first12Weeks.donts.map((e:string) =>e)}></TextBoxAi> */}
                                            </div>
                                            <div className="w-[450px] pr-4">
                                                <div>
                                                <TextBoxAi label="" onChange={(val) => {
                                                    resolveChangeTextFields(val,index,"second12Weeks",'dos')
                                                }} value={el.second12Weeks.dos.map((e:string) =>e)}></TextBoxAi>

                                                {/* <TextBoxAi label="donts" onChange={(val) => {
                                                    resolveChangeTextFields(val,index,"second12Weeks",'donts')
                                                }} value={el.second12Weeks.donts.map((e:string) =>e)}></TextBoxAi>                                                     */}
                                                </div>
                                            </div>                                            
                                        </div>
                                    )
                                })}
                        <div className="mb-[200px]"></div>
                    </div>
                    }
                </div>        
                <div className="w-full mt-6 flex gap-4 justify-center">
                    <Button onClick={() => {
                        Application.saveTreatmentPaln({
                            treatment_id:report,
                            description:treatmentPlanData.description_section.description,
                            treatment_plan:treatmentPlanData.treatment_plans
                        })
                        navigate(-1)
                    }} theme="Aurora">
                        <div className="w-[100px]">
                            Save
                        </div>
                    </Button>
                </div>       
            </div>
   
        </div>
    )
}
export default ViewTreatmentPlan