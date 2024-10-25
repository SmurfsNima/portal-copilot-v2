/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

interface AccordionProps {
    title:string
    children?: React.ReactNode;
    themes?:string;
    time? : string
}

const Accordion:React.FC<AccordionProps> = ({title,children,themes,time}) => {
    let theme =useSelector((state: any) => state.theme.value.name)
    if(themes){
        theme =themes
    }
    const [isActive,setIsActive] = useState(false)
    const handleClick = () => {
        if (isActive) {
            setHeight(contentRef.current?.scrollHeight || 0);
            // setHeight(contentRef.current?.scrollHeight || 0);
            setTimeout(() => {
                setIsActive(false)
            }, 10);
        } else {
            setIsActive(true);
            setHeight(contentRef.current?.scrollHeight || 0);
            // setHeight(contentRef.current?.scrollHeight || 0);
        }
    };
    useEffect(() => {
        if (contentRef.current) {
        if (isActive) {
            setHeight(contentRef.current.scrollHeight);
        } else {
            setTimeout(() => {
            setHeight(0);
            }, 10);
        }
        }
    }, [isActive,title]);    
    const [height, setHeight] = useState<number | undefined>(0);
    const handleTransitionEnd = () => {
        if (isActive) {
            setHeight(undefined);
        }
    };    
    const contentRef = useRef<HTMLDivElement | null>(null);
    return (
        <>
            <div data-isActive={isActive} onClick={handleClick} className={`${theme}-Accordion-container `}>
                <div className="flex items-center gap-1">
                <h2 className={`${theme}-Accordion-text`}>{title} {time && <span className="text-brand-primary-color ml-2 text-xs">{time}</span>} </h2>
                {/* <span className={`${theme}-graphicinfo-btn-number ${!number && "hidden"}`}>
                    ({number})
                </span> */}
                </div>
                <div className={`${theme}-icons-arrow-${isActive?'up':'down'}`}></div>          
            </div>
            <div
                ref={contentRef}
                style={{ height }}
                className=" transition-height duration-500 ease-in-out "
                onTransitionEnd={handleTransitionEnd}
            >
                {
                    isActive && (
                        <div className={`${theme}-Accordion-list-container `}>
                        {children}
                    </div>
                    )
                }
               
            </div>            
        </>
    )
}

export default Accordion