/* eslint-disable @typescript-eslint/no-explicit-any */
import { Application } from "@/api"
import GenerateWithAiModal from "@/pages/aiStudio/GenerateWithAiModal"
import { useEffect, useRef, useState } from "react"
import { Button, TextArea } from "symphony-ui"

interface TextBoxAiProps {
    value:string
    onChange?:(val:string) => void
    label:string
}

const TextBoxAi:React.FC<TextBoxAiProps> = ({value,onChange,label}) => {
    const [isActiveAi,setIsActiveAi] = useState(false)
    const modalAiGenerateRef = useRef(null)
    const [showAiReport,setShowAiReport] = useState(false)
    const [,setPramt] = useState("")
    const [localVal,setLocalVal] = useState(value)
    const beGenerateWithAi = (pre:string) => {
        Application.UpdateTreatmentPlanWithAi({
            ai_generation_mode:pre,
            input_text:localVal.includes(",")? localVal.split(","):[localVal],
        }).then(res => {
            setLocalVal(res.data.map((e:any) => e))
        })
    }
    useEffect(() => {
        if(onChange){
            onChange(localVal)
        }
    },[localVal])
    return (
        <>
            <div onMouseLeave={() => {
                    setIsActiveAi(false)
                    setShowAiReport(false)
                }} onMouseEnter={() => {
                     setIsActiveAi(true)
                }} className="w-[450px] relative pr-4">
                <TextArea onBlur={() => {}} onChange={(e) => {
                   setLocalVal(e.target.value)
                }} value={localVal} label={label} theme="Aurora" name="" inValid={false}  ></TextArea>
                <div className="w-[32px] absolute top-8 right-6 h-[32px]">
                    {isActiveAi  && 
                        <>
                            <Button onClick={() => {
                                setShowAiReport(true)
                            }} theme="Aurora-pro">
                                <img className="Aurora-icons-stars invisible" alt="" />
                            </Button>
                            <img onClick={() => {
                                setShowAiReport(true)
                            }} className="Aurora-icons-stars w-[16px] left-2 cursor-pointer absolute top-1" alt="" />
                            {showAiReport &&
                            <div className="absolute left-[-200px] top-10 z-40">
                                <GenerateWithAiModal onSuccess={(val) => {
                                    setShowAiReport(false)
                                    setPramt(val)
                                    beGenerateWithAi(val)
                                }} refEl={modalAiGenerateRef}></GenerateWithAiModal>

                            </div>
                            }
                        
                        </>
                    }
                </div>
            </div>        
        </>
    )
}
export default TextBoxAi