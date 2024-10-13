/* eslint-disable @typescript-eslint/no-explicit-any */
import GenerateWithAiModal from "@/pages/aiStudio/GenerateWithAiModal"
import { useRef, useState } from "react"
import { Button, TextArea } from "symphony-ui"

interface TextBoxAiProps {
    value:string
}

const TextBoxAi:React.FC<TextBoxAiProps> = ({value}) => {
    const [isActiveAi,setIsActiveAi] = useState(false)
    const modalAiGenerateRef = useRef(null)
    const [showAiReport,setShowAiReport] = useState(false)

    return (
        <>
            <div onMouseLeave={() => {
                    setIsActiveAi(false)
                    setShowAiReport(false)
                }} onMouseEnter={() => {
                     setIsActiveAi(true)
                }} className="w-[450px] relative pr-4">
                <TextArea onBlur={() => {}} onChange={() => {}} value={value} theme="Aurora" name="" inValid={false}  ></TextArea>
                <div className="w-[32px] absolute top-3 right-6 h-[32px]">
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
                                <GenerateWithAiModal onSuccess={() => {
                                    setShowAiReport(false)
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