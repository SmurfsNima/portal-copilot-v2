import { MutableRefObject } from "react";

interface GenerateWithAiModalProps {
    refEl:MutableRefObject<HTMLDivElement|null>;
    onSuccess:(text:string) => void
}
const GenerateWithAiModal:React.FC<GenerateWithAiModalProps> = ({
    refEl,
    onSuccess
}) => {
    return (
        <>
            <div ref={refEl} className="w-[205px] h-[190px] overflow-auto px-3 py-2 rounded-[6px] bg-[#272727] border border-[#383838]">
                <div className="bg-black-primary border border-main-border rounded-md -ml-1 ">
                    <input className="bg-transparent outline-none text-[10px] pl-2  py-2 opacity-80 " type="text" placeholder="Ask AI to..." />
                </div>
                {/* <div onClick={() => {
                    onSuccess("Improve Writing")
                }} className="text-[10px] text-[#FFFFFFDE] h-[34px] flex justify-start items-center border-b cursor-pointer border-b-[#383838]">Improve Writing</div>
                <div onClick={() => {
                    onSuccess("Fix Spelling & Grammar")
                }} className="text-[10px] text-[#FFFFFFDE] h-[34px] flex justify-start items-center border-b cursor-pointer border-b-[#383838]">Fix Spelling & Grammar</div>
                <div onClick={() => {
                    onSuccess("Translate")
                }} className="text-[10px] text-[#FFFFFFDE] h-[34px] flex justify-start items-center border-b cursor-pointer border-b-[#383838]">Translate</div> */}
                <div onClick={() => {
                    onSuccess("Make Longer")
                }} className="text-[10px] text-[#FFFFFFDE] h-[34px] flex justify-start items-center border-b cursor-pointer border-b-[#383838]">Make Longer</div>
                <div onClick={() => {
                    onSuccess("Make Shorter")
                }} className="text-[10px] text-[#FFFFFFDE] h-[34px] flex justify-start items-center border-b cursor-pointer border-b-[#383838]">Make Shorter</div>
                <div onClick={() => {
                    onSuccess("Simplify Language")
                }} className="text-[10px] text-[#FFFFFFDE] h-[34px] flex justify-start items-center border-b cursor-pointer border-b-[#383838]">Simplify Language</div>
                <div onClick={() => {
                    onSuccess("Be More Specific")
                }} className="text-[10px] text-[#FFFFFFDE] h-[34px] flex justify-start items-center  cursor-pointer border-b-[#383838]">Be More Specific</div>
            </div>
        </>
    )
}

export default GenerateWithAiModal