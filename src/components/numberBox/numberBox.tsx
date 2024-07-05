import {RiUserFill} from "react-icons/ri";
import {Card} from "@/components";
import React from "react";

interface numberBoxProps {
    theme:string
    title:string
    value:number
    mode:'increase'|'reduction'|'added'
}

const NumberBox:React.FC<numberBoxProps> = ({theme,mode,title,value}) => {
    const resolveModeText = () => {
        if(mode == 'added'){
            return '2 new patient added!'
        }
        if(mode == 'increase'){
            return '10% increase compared to last month'
        }
        return '10% reduction compared to last month'
    }
    const resolveIcon = () => {
        if(mode == 'increase'){
            return 'dicress.svg'
        }
        if(mode =='added'){
            return 'Add.svg'
        }
        return 'incress.svg'
    }
    return (
        <Card theme={theme}>
            <div className={"text-primary-text flex items-start justify-center flex-col  gap-2"}>
                <div className={"flex items-center justify-between w-full text-4xl"}>
                    <h1 className={"font-medium text-4xl text-white"}>{value}</h1>
                    <div className={"flex justify-center items-center p-2 rounded-full bg-black"}>
                        <RiUserFill className={"text-brand-primary-color w-5 h-5"}/>
                    </div>
                </div>
                <h1 className={"text-[14px] font-medium"}>{title}</h1>
                <div className="flex justify-start items-center">
                    <img src={'./Themes/Aurora/icons/'+resolveIcon()} alt="" />
                    <div className={"text-xs font-medium ml-1"}>{resolveModeText()}</div>
                </div>
            </div>
        </Card>
    );
};

export default NumberBox