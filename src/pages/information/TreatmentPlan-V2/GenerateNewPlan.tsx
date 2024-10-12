/* eslint-disable @typescript-eslint/no-explicit-any */
import { Application } from "@/api";
import { PlanManagerModal } from "@/components";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { Button, TextArea } from "symphony-ui";
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
    const generatePaln =() => {
        setIsLoading(true)
        setGenereStep("Generate")
        Application.generateTreatmentPlan({
            member_id: Number(id),
            three_months_priority:Priorities3,
            six_months_priority:Priorities6,
            use_ai:false
        }).then(res => {
            console.log(res.data);
            // console.log(res)
            setIsLoading(false)
            setTratmentPlanData(res.data)
            // navigate(-1)
        });
    }    
    const resolveTextDoDoes = (value:any) => {
        const resolvedText = ''
        const newDo = value.dos.map((el:any) => el)
        const newDoes = value.donts.map((el:any) => el)
        return resolvedText+ newDo + newDoes
    }
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
    return (
        <>
        <div className="w-full flex justify-center px-4">
            <div className="w-full py-6 px-4 bg-white rounded-[6px] dark:bg-[#1E1E1E] border border-light-border-color dark:border-[#383838] h-[610px] ">
                <div className="flex justify-start items-center gap-4">
                    <div onClick={() => {

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
                        <PlanManagerModal onCompleteAction={() => {
                            // generatePaln()
                        }} isNewGenerate data={Priorities6}  setDataGenerate={(data) => {
                                setPriorities6(data)
                            }}>

                        </PlanManagerModal>
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
                                    <div className="dark:bg-[#1E1E1E] mt-3 dark:text-[#FFFFFFDE] text-[12px]">Needs Focus Benchmarks:</div>
                                    {treatmentPlanData?.description_section["need focus benchmarks"].map((el:any) => {
                                        return (
                                            <div className="ml-4 flex justify-start items-center gap-2 mt-1">
                                                <span className="w-[3px] h-[3px] bg-light-secandary-text rounded-full dark:bg-[#FFFFFFDE]"></span>
                                            {el}</div>
                                        )
                                    })}
                                </div>

                                <div className="dark:text-[#FFFFFFDE] mt-4 text-light-secandary-text gap-2 flex justify-start items-center text-[14px] font-medium">
                                    <span className="w-1 h-1 bg-light-secandary-text rounded-full dark:bg-[#FFFFFFDE]"></span>
                                    Report Details
                                </div>

                                <div className="w-full border-b border-b-light-border-color dark:border-b-[#383838] pb-3 font-medium text-[14px] mt-6 text-light-secandary-text dark:text-[#FFFFFFDE] flex justify-start">
                                    <div className="w-[350px]">Benchmark Areas</div>
                                    <div className="w-[450px]">First 12 weeks</div>
                                    <div className="w-[450px]">Second 12 weeks</div>
                                </div>
                                {treatmentPlanData?.treatment_plans[0].map((el:any) => {
                                    return (
                                        <div className="text-light-secandary-text flex border-b border-b-light-border-color dark:border-b-[#383838] text-[12px] py-4 w-full dark:text-[#FFFFFFDE] ">
                                            <div className="flex w-[350px]"> <div className=" w-[90px] overflow-hidden">{el.subCategory}</div> <span className="ml-1">{el.area}</span></div>
                                            <div className="w-[450px] pr-4">
                                                <TextArea onChange={() => {}} value={resolveTextDoDoes(el.first12Weeks)} theme="Aurora" name="" inValid={false} onBlur={() => {}} ></TextArea>
                                            </div>
                                            <div className="w-[450px] pr-4">
                                                <TextArea onChange={() => {}} value={resolveTextDoDoes(el.second12Weeks)} theme="Aurora" name="" inValid={false} onBlur={() => {}} ></TextArea>
                                            </div>                                            
                                        </div>
                                    )
                                })}
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
                    <Button onClick={() => {
                        resolveNextStep()
                    }} theme="Aurora">
                        <div className="w-[100px]">
                           {generateStep=='Generate'?'Save':'Next Step'} 
                        </div>
                    </Button>
                </div>
            </div>

        </div>
        </>
    )
}

export default GenerateNewPlan