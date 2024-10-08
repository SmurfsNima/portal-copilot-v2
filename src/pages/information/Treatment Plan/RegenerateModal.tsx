/* eslint-disable @typescript-eslint/no-explicit-any */
import { Application } from "@/api";
import { PlanManagerModal } from "@/components";
import { MutableRefObject, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { Button } from "symphony-ui";
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
interface RegenerateModalProps {
    refEl:MutableRefObject<HTMLDivElement|null>;
    onClose:() => void;
    onGenerate:(data:any) => void
}
type PrioritiesType = Record<string, Category>;
const RegenerateModal:React.FC<RegenerateModalProps> = ({refEl,onClose,onGenerate,...props}) => {
    const [clientGools,setClientGools]:any = useState({})
    const [Priorities3,setPriorities3] = useState<PrioritiesType>({})
    const [Priorities6,setPriorities6] = useState<PrioritiesType>({})
    const { id } = useParams<{ id: string }>();
    const [step ,setStep] = useState(1)
    const [activeMenu,setActiveMenu] = useState('3 Month')
    const [isLoading,setIsLoading] = useState(true)
    const [AIAssistanc,setAiAssistance] = useState(false)
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
    const generatePaln =() => {
        Application.generateTreatmentPlan({
            member_id: Number(id),
            three_months_priority:Priorities3,
            six_months_priority:Priorities6,
            use_ai:AIAssistanc
        }).then(res => {
            console.log(res.data);
            
            onGenerate(res.data)
            onClose()
            // console.log(res)
        });
    }
    return (
        <>
            <div ref={refEl} {...props} className="z-50 bg-black-secondary  relative text-primary-text py-10 pb-6 px-8 rounded-lg shadow-lg w-[85%] max-h-[600px] overflow-y-auto ">
                <div className="absolute right-7 top-6">
                    <button onClick={onClose} className="text-lg">
                    <img src={"Themes/Aurora/icons/close.svg"}></img>
                    </button>                

                </div>
                {step == 1 ?
                    <>
                        <div className="bg-[#383838] py-3 px-4 mt-4 rounded-[6px] w-full">
                            <div className="text-[#FFFFFFDE] text-[12px]">Client Goals</div>
                            <div className="w-full border-b mt-2 border-solid border-[white] opacity-30"></div>
                            {isLoading && 
                            <div className="w-full flex justify-center mt-3">
                                <BeatLoader color="white" size={12}></BeatLoader>

                            </div>
                            }
                            {Object.keys(clientGools).map((el:string) => {
                                return (
                                    <>
                                    <div className="flex mt-3 justify-between">
                                        <div className="text-[12px] w-[250px] text-[#FFFFFFDE]">
                                            {el}
                                        </div>

                                        <div className="text-[12px] text-left w-full ml-4 text-[#FFFFFFDE]">
                                            {clientGools[el][0]}
                                        </div>                                
                                    </div>
                                    </>
                                )
                            })}
                        </div>
                        <div className="w-full flex mt-8 justify-center items-center">
                            <Button onClick={() => {
                                setStep(2)
                            }} theme="Aurora">
                            <div className="w-[120px]">  Next Step</div>  
                            </Button>

                        </div>
                    </>
                :
                <>
                    <div>
                        <div className="w-full flex justify-between  mt-4 mb-3 items-center">
                            <div className="w-[170px]"></div>
                            <div className="flex justify-center items-center">
                                <div onClick={() => {
                                    setActiveMenu('3 Month')
                                }} className={`  ${
                                    activeMenu === '3 Month' && "bg-black-third"
                                } rounded-md w-[105px] text-xs h-[24px] flex items-center justify-center cursor-pointer   `}>
                                    3 Month
                                </div>
                                <div onClick={() => {               
                                    setActiveMenu('6 Month')
                                }} className={`  ${
                                    activeMenu === '6 Month' && "bg-black-third"
                                } rounded-md w-[105px] text-xs h-[24px] flex items-center justify-center cursor-pointer   `}>
                                    6 Month
                                </div>   

                            </div>

                            <div className="flex justify-between gap-2 items-start">
                                <div onClick={() => {
                                    setAiAssistance(!AIAssistanc)
                                }} className={` relative rounded-[40px] flex items-center cursor-pointer ${!AIAssistanc?'justify-start border border-[#7F39FB]':'justify-end bg-[#7F39FB]'} px-1 w-12 h-6`}>
                                    <div className="w-4 h-4 rounded-full bg-[#FFFFFFDE]"></div>
                                </div>
                                <div className="text-[#FFFFFFDE] text-sm">AI Assistance for Plan</div>
                            </div>                         
                        </div>
                            {activeMenu == '3 Month' ?
                                <PlanManagerModal onCompleteAction={() => {
                                    generatePaln()
                                    }} isgenerate data={Priorities3} setDataGenerate={(data) => {
                                        setPriorities3(data)
                                    }}>
                                </PlanManagerModal>
                            :
                                <PlanManagerModal onCompleteAction={() => {
                                    generatePaln()
                                }} isgenerate data={Priorities6}  setDataGenerate={(data) => {
                                        setPriorities6(data)
                                    }}>

                                </PlanManagerModal>
                            }


                    </div>
                </>
                }
            </div>                
        </>
    )
}

export default RegenerateModal