/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react"
import { BeatLoader } from "react-spinners"
import BenchmarkModal from "../Treatment Plan/benchmarkModal"
import { Button } from "symphony-ui"
import TextBoxAi from "./TextBoxAi"
import { useNavigate, useParams } from "react-router-dom"
import { Application } from "@/api"
import GenerateWithAiModal from "@/pages/aiStudio/GenerateWithAiModal"
import useModalAutoClose from "@/hooks/UseModalAutoClose"

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
            //  old.treatment_plans[0][index][key][doOrdos] =value.includes(",")?value.split(","): typeof value != "string"?value:[value]
            old.treatment_plans[index][key][doOrdos] =value.includes(",")?value.split(","): typeof value != "string"?value:[value]
            return old
        })
    }
    const [isforceReload,setIsForceReload] = useState(false)   
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
            old.treatment_plans =value
            return old
        })       
        setIsForceReload(true)
        setTimeout(() => {
            setIsForceReload(false)
        }, 600);        
    }    
    const resolveNeedFocusText = () => {
        return treatmentPlanData?.description_section["need focus benchmarks"].map((el:any) => {
            return (
                el+'\n\n'
            )
        })
        // return "scdc"
    }
    const updateNeedFocus= (value:any) => {
         setTratmentPlanData((pre:any) => {
            const old = pre
            old.description_section["need focus benchmarks"] =value.includes(",")?[...value.split(",")][0]:[value]
            return old
        })       
    }    
    useModalAutoClose({
        refrence:modalAiGenerateRef,
        close:() => {
            setShowGenerateWithAi(false)
        }
    })    
    const resolveDescriptText = () => {
        return treatmentPlanData?.description_section["description"]
        // return "scdc"
    }      
    const updateDescription= (value:any) => {
         setTratmentPlanData((pre:any) => {
            const old = pre
            old.description_section["description"] =value
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
                        <div>
                            {treatmentPlanData?.description_section?.description &&
                                <TextBoxAi isUpchange={isforceReload} isDescript label="" onChange={(e) => {
                                    updateDescription(e)
                                }} value={resolveDescriptText()}></TextBoxAi>                                    
                            }
                        </div>
                        <div className="w-full flex mt-4 items-center pr-4 justify-between">
                            <div className="dark:text-[#FFFFFFDE]  mb-1 text-light-secandary-text gap-2 flex justify-start items-center text-[14px] font-medium">
                                <span className="w-1 h-1 bg-light-secandary-text rounded-full dark:bg-[#FFFFFFDE]"></span>
                                Needs Focus Benchmarks
                                
                                {/* <img
                                    className=" transition-transform cursor-pointer w-5 h-5"
                                    onClick={() => {setIsModalOpen(true)}}
                                    src="./Themes/Aurora/icons/export-v2.svg"
                                    alt=""
                                />                                     */}
                            </div>  
                            <div onClick={() => {setIsModalOpen(true)}} className="text-[12px] cursor-pointer text-primary-color font-medium">Benchmarks List</div>
                        </div>
                        {treatmentPlanData?.description_section["need focus benchmarks"].length >0 &&
                                <TextBoxAi isUpchange={isforceReload} isNeedFocus label="" onChange={(e) => {

                                    updateNeedFocus(e)
                                }} value={resolveNeedFocusText()}></TextBoxAi>
                        }     
                        <BenchmarkModal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false)}} />
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
                                            input_text:treatmentPlanData?.treatment_plans,
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

                                                <TextBoxAi isBenchMark benchMark={el.area} isUpchange={isforceReload} label="" onChange={(val) => {
                                                    resolveChangeTextFields(val,index,"first12Weeks",'dos')
                                                }} value={el.first12Weeks.dos.map((e:string) =>e)}></TextBoxAi>

                                                {/* <TextBoxAi label="donts" onChange={(val) => {
                                                    resolveChangeTextFields(val,index,"first12Weeks",'donts')
                                                }} value={el.first12Weeks.donts.map((e:string) =>e)}></TextBoxAi> */}
                                            </div>
                                            <div className="w-[450px] pr-4">
                                                <div>
                                                <TextBoxAi isBenchMark benchMark={el.area} isUpchange={isforceReload} label="" onChange={(val) => {
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