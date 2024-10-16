/* eslint-disable @typescript-eslint/no-explicit-any */
import { Application } from "@/api";
import { PlanManagerModal } from "@/components";
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { Button } from "symphony-ui";
import BenchmarkModal from "../Treatment Plan/benchmarkModal";
import TextBoxAi from "./TextBoxAi";
import GenerateWithAiModal from "@/pages/aiStudio/GenerateWithAiModal";
import useModalAutoClose from "@/hooks/UseModalAutoClose";
// import data from './data.json';

interface Benchmark {
  Benchmark: string;
  Value: number;
  checked: boolean;
}
interface BenchmarkArea {
  Name: string;
  Benchmarks: Benchmark[];
  checked: boolean;
}

interface Category {
  BenchmarkAreas: BenchmarkArea[];
}

type PrioritiesType = Record<string, Category>;

const GenerateNewPlan =() => {
    const navigate = useNavigate()
    const [generateStep,setGenereStep] = useState("Client Goals")
    const [clientGools,setClientGools]:any = useState({})
    const { id } = useParams<{ id: string }>();
    const [isLoading,setIsLoading] = useState(true)
    const [Priorities3,setPriorities3] = useState<PrioritiesType>({})
    const [Priorities6,setPriorities6] = useState<PrioritiesType>({})
    const [treatmentPlanData,setTratmentPlanData] = useState<any>(null)
    const resolveNextStep = () => {
        if(generateStep== 'Client Goals'){
            setGenereStep("Category Order")
        }else {         
            generatePaln()
        }
        if(generateStep == 'Generate'){
            Application.saveTreatmentPaln({
                treatment_id:treatmentPlanData.treatment_plans[1],
                description:treatmentPlanData.description_section.description,
                treatment_plan:treatmentPlanData.treatment_plans[0]
            })
            navigate(-1)
        }
    }
    const resolveBack = () => {
        if(generateStep== 'Generate'){
            setGenereStep("Category Order")
        }else {
            setGenereStep("Client Goals")
        }
    }    
    const [activeMenu,setActiveMenu] = useState('3 Month')
    const generatePaln =() => {
        setIsLoading(true)
        
        Application.generateTreatmentPlan({
            member_id: Number(id),
            three_months_priority:Priorities3,
            six_months_priority:Priorities6,
            use_ai:false
        }).then(res => {
            console.log(res.data);
            // console.log(res)
            setGenereStep("Generate")
            setIsLoading(false)
            if(!res.data.detail){
                setTratmentPlanData(res.data)
            }
            // navigate(-1)
        }).catch(()=> {
            setIsLoading(false)
        });
    }    
    const modalAiGenerateRef = useRef(null)
    const resolveChangeTextFields =(value:string,index:number,key:string,doOrdos:string) => {
        console.log(value)
        setTratmentPlanData((pre:any) => {
            const old = pre
            old.treatment_plans[0][index][key][doOrdos] =value.includes(",")?[...value.split(",")][0]:[value]
            return old
        })
    }
    const updateTreatmentPalnData= (value:any) => {
         setTratmentPlanData((pre:any) => {
            const old = pre
            old.treatment_plans[0] =value
            return old
        })       
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        Application.getPatientReorders(id as string).then((res) => {
            console.log(res)
            setIsLoading(false)
            if(res.data.client_goals){
                setClientGools(res.data.client_goals)
            }
            if(res.data.priority_plan_3m){
                setPriorities3(res.data.priority_plan_3m)
                setPriorities6(res.data.priority_plan_6m)
            }
        })

    },[])    
    const [isloadingGenerate,setIsLoadingGenerate] = useState(false)
    const [showGenerateWithAi,setShowGenerateWithAi] = useState(false)
    useModalAutoClose({
        refrence:modalAiGenerateRef,
        close:() => {
            setShowGenerateWithAi(false)
        }
    })      
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
    return (
        <>
        <div className="w-full flex justify-center px-4">
            <div className="w-full py-6 px-4 bg-white rounded-[6px] dark:bg-[#1E1E1E] border border-light-border-color dark:border-[#383838] h-[610px] ">
                <div className="flex justify-start items-center gap-4">
                    <div onClick={() => {
                        navigate(-1)
                    }} className={`Aurora-tab-icon-container w-[60px] cursor-pointer h-[35px]`}>
                        <img className={`Aurora-icons-arrow-left`} />
                    </div> 
                    <div className="text-[14px] font-medium text-light-secandary-text dark:text-[#FFFFFFDE]">
                        Generate Treatment Plan
                    </div>
                </div>

                <div className="w-full h-[56px] flex justify-evenly border-light-border-color bg-white border dark:border-[#383838]  dark:bg-[#2F2F2F] rounded-[6px] mt-4">
                    <div className="flex justify-center items-center gap-2">
                        <div className={`w-5 h-5 rounded-full ${generateStep=='Client Goals'?'dark:border-primary-color dark:text-primary-color text-light-blue-active border-light-blue-active':'text-light-primary-text border-light-primary-text dark:text-[#FFFFFF99]'} border flex justify-center items-center text-[12px] font-medium `}>1</div>
                        <div className={`text-[12px] ${generateStep=='Client Goals'?'dark:text-primary-color text-light-blue-active':' text-light-primary-text dark:text-[#FFFFFF99]'} font-medium `}>Client Goals</div>
                    </div>

                    <img className="w-[16px]" src="./Themes/Aurora/icons/nextStep.svg" alt="" />

                    
                    <div className="flex justify-center items-center gap-2">
                        <div className={`w-5 h-5 rounded-full ${generateStep=='Category Order'?'dark:border-primary-color dark:text-primary-color text-light-blue-active border-light-blue-active':'text-light-primary-text border-light-primary-text dark:text-[#FFFFFF99]'} border flex justify-center items-center text-[12px] font-medium `}>2</div>
                        <div className={`text-[12px] ${generateStep=='Category Order'?'dark:text-primary-color text-light-blue-active':' text-light-primary-text dark:text-[#FFFFFF99]'} font-medium `}>Category Order</div>
                    </div>  

                    <img className="w-[16px]" src="./Themes/Aurora/icons/nextStep.svg" alt="" />
                    
                    <div className="flex justify-center items-center gap-2">
                        <div className={`w-5 h-5 rounded-full ${generateStep=='Generate'?'dark:border-primary-color dark:text-primary-color text-light-blue-active border-light-blue-active':'text-light-primary-text border-light-primary-text dark:text-[#FFFFFF99]'} border flex justify-center items-center text-[12px] font-medium `}>3</div>
                        <div className={`text-[12px] ${generateStep=='Generate'?'dark:text-primary-color text-light-blue-active':' text-light-primary-text dark:text-[#FFFFFF99]'} font-medium `}>Generate</div>
                    </div>                                     
                </div>
                {
                    generateStep == 'Client Goals' &&
                        <div className="bg-white rounded-[6px] px-6 py-6 h-[256px] mt-2  border border-light-border-color dark:bg-[#2F2F2F] dark:border-[#383838]">
                            {isLoading && 
                            <div className="w-full flex justify-center mt-3">
                                <BeatLoader color="white" size={12}></BeatLoader>
                            </div>
                            }   

                            {Object.keys(clientGools).map((el:string) => {
                                return (
                                    <>
                                    <div className="flex mt-3 justify-between">
                                        <div className="text-[12px] w-[250px] text-light-secandary-text dark:text-[#FFFFFFDE]">
                                            {el}
                                        </div>

                                        <div className="text-[12px] text-left w-full ml-4 text-light-secandary-text dark:text-[#FFFFFFDE]">
                                            {clientGools[el][0]}
                                        </div>                                
                                    </div>
                                    </>
                                )
                            })}                 
                        </div>
                }
                {
                    generateStep == 'Category Order' &&
                    <div className="bg-white rounded-[6px]   h-[400px] mt-2  border border-light-border-color dark:bg-[#2F2F2F] dark:border-[#383838]">
                        <div className="flex justify-center mt-3 items-center">
                            <div onClick={() => {
                                setActiveMenu('3 Month')
                            }} className={`  ${
                                activeMenu === '3 Month' && "bg-[#272727] text-[#FFFFFFDE]"
                            } rounded-md w-[105px] text-xs text-[#FFFFFF99] h-[24px] flex items-center justify-center cursor-pointer   `}>
                                3 Month
                            </div>
                            <div onClick={() => {               
                                setActiveMenu('6 Month')
                            }} className={`  ${
                                activeMenu === '6 Month' && "bg-[#272727] text-[#FFFFFFDE]"
                            } rounded-md w-[105px] text-xs text-[#FFFFFF99] h-[24px] flex items-center justify-center cursor-pointer   `}>
                                6 Month
                            </div>   

                        </div>                       
                        {/* <PlanManagerModal onCompleteAction={() => {
                            // generatePaln()
                        }} isNewGenerate data={Priorities6}  setDataGenerate={(data) => {
                                setPriorities6(data)
                            }}>

                        </PlanManagerModal> */}
                            {activeMenu == '3 Month' ?
                                <PlanManagerModal onCompleteAction={() => {
                                    // generatePaln()
                                    }} isNewGenerate data={Priorities3} setDataGenerate={(data) => {
                                        setPriorities3(data)
                                    }}>
                                </PlanManagerModal>
                            :
                                <PlanManagerModal onCompleteAction={() => {
                                    // generatePaln()
                                }} isNewGenerate data={Priorities6}  setDataGenerate={(data) => {
                                        setPriorities6(data)
                                    }}>

                                </PlanManagerModal>
                            }                        
                    </div>
                }
                {
                    generateStep == 'Generate' &&
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
                                   
                                   {treatmentPlanData?.description_section["need focus benchmarks"].length >0 &&
                                        <TextBoxAi isNeedFocus label="" onChange={(e) => {

                                            updateNeedFocus(e)
                                        }} value={resolveNeedFocusText()}></TextBoxAi>
                                   }
                                    <BenchmarkModal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false)}} />
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
                                {treatmentPlanData?.treatment_plans[0].map((el:any,index:number) => {
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
{/* 
                                                <TextBoxAi label="donts" onChange={(val) => {
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
                }                
                <div className="w-full mt-6 flex gap-4 justify-center">
                    {generateStep !='Client Goals' &&
                        <Button onClick={resolveBack} theme="Aurora-pro">
                            <div className="w-[100px]">
                                Back
                            </div>
                        </Button>
                    }
                    <Button disabled={isLoading} onClick={() => {
                        resolveNextStep()
                    }} theme="Aurora">
                        {isLoading?
                        <div className="w-full h-full flex justify-center items-center">
                            <BeatLoader size={8} color="white"></BeatLoader>
                        </div>
                        :
                        <div className="w-[100px]">
                           {generateStep=='Generate'?'Save':'Next Step'} 
                        </div>
                        }
                    </Button>
                </div>
            </div>

        </div>
        </>
    )
}

export default GenerateNewPlan