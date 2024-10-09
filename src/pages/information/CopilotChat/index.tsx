import { AiChat, InfoCard } from "@/components"

const CopilotChat =() => {
    return (
        <>
         <div className="flex flex-col w-full  items-start gap-2">
            <InfoCard></InfoCard>
            <div className="w-full">
                <AiChat></AiChat>
            </div>
         </div>
        </>
    )
}

export default CopilotChat