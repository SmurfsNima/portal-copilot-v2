/* eslint-disable @typescript-eslint/no-explicit-any */

import { MutableRefObject, useEffect } from "react";

interface RegenerateModalProps {
    refEl:MutableRefObject<HTMLDivElement|null>;
    onClose:() => void;
    onGenerate:(data:any) => void
}
const GenerateModal:React.FC<RegenerateModalProps> = ({refEl,onClose,...props}) => {


    useEffect(() => {

    },[])

    return (
        <>
            <div ref={refEl} {...props} className="z-50 bg-black-secondary  relative text-primary-text py-10 pb-6 px-8 rounded-lg shadow-lg w-[85%] max-h-[600px] overflow-y-auto ">
                <div className="absolute right-7 top-6">
                    <button onClick={onClose} className="text-lg">
                    <img src={"Themes/Aurora/icons/close.svg"}></img>
                    </button>                

                </div>
            </div>                
        </>
    )
}

export default GenerateModal