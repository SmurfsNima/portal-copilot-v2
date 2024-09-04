import { TabsWrapper } from "@/components";
import { useEffect, useRef } from "react";
interface ClientPreviewProps{
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
}
const ClientPreview:React.FC<ClientPreviewProps> = ({
    isOpen,
    onClose
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const tabs =[
        {
            text: "Summary",
            path : '',
            icon : true
        },    
        {
            text: "Data Entry",
            path : '',
            icon : true,
        },    
        {
            text: "Overview",
            path : '',
            icon : true,
            isVisible:false
        },  
        {
            text: "Overview",
            path : '',
            icon : true,
            isVisible:false
        },  
        {
            text: "Overview",
            path : '',
            icon : true,
            isVisible:false
        },  
        {
            text: "Overview",
            path : '',
            icon : true,
            isVisible:false
        },  
        {
            text: "Overview",
            path : '',
            icon : true,
            isVisible:false
        },                                                   
    ]
  useEffect(() => {
    const handleClickOutside = (event : MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;    
    return (
        <>
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black-background bg-opacity-50">
            <div ref={modalRef} className="bg-black-secondary relative text-primary-text p-6 rounded-lg w-[1012px] shadow-lg ">
                <button onClick={() => {}} className="text-lg absolute top-3 right-3">
                    <img src={"Themes/Aurora/icons/close.svg"}></img>
                </button>
                <TabsWrapper TabsInfo={tabs} handleTabClick={() =>{}}/>
            </div>
        </div>
        </>
    )
}

export default ClientPreview