import { useEffect, useRef } from "react";
import { Button } from "symphony-ui";

interface ConfirmShareProps {
    isOpen: boolean;
    title:string;
    content:string
    onClose: () => void;
    onConfirm:() => void
}
const ConfirmShareModal:React.FC<ConfirmShareProps> = ({
    isOpen,onClose,onConfirm,content,title
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    

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
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-light-overlay dark:bg-black-background bg-opacity-80 dark:bg-opacity-95">
                 <div ref={modalRef} className={`dark:bg-black-secondary bg-white relative text-primary-text p-6 rounded-lg shadow-lg w-[428px]`}>
                    <div className="flex justify-center mb-2">
                        <img src="./images/danger.svg" alt="" />
                    </div>
                    <div className="text-[14px] text-light-secandary-text dark:text-white font-medium text-center">
                        {title}
                    </div>
                    <div className="text-[12px] text-light-secandary-text dark:text-white text-center mb-5 mt-2">{content}</div>
                    <div className="w-full flex mt-2 justify-center gap-3">
                        <Button onClick={() => {
                            onClose()
                        }} theme="Aurora-pro">
                            <div className="w-[60px]">
                                Close
                            </div>
                            </Button>
                        <Button onClick={() => {
                            onConfirm()
                        }} theme="Aurora">
                            <div className="w-[60px]">
                                Confirm
                            </div>
                        </Button>
                    </div>             
                </div>            
            </div>        
        </>
    )
}

export default ConfirmShareModal