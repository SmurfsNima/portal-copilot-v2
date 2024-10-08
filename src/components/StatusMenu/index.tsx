import { getStatusBgColorClass } from "@/utils/status"
type Status ='Needs Focus' | 'Ok' | 'Good' | 'Excellent' | 'All'

interface StatusMenuProps {
    status?: string[]
    activeStatus:Status,
    onChange:(status:string) =>void
}
const StatusMenu:React.FC<StatusMenuProps> = ({ status,activeStatus,onChange}) => {
  
    return (
        <>
            <div className="rounded-md bg-black-primary border  border-main-border flex items-center justify-center text-[10px] text-primary-text">
                { status && status.map((state) => {
                    return (
                        <>
                            <div className=" py-1 px-3  ">
                                <div
                                onClick={() => {
                                    onChange(state)
                                }}
                                className={` ${getStatusBgColorClass(
                                    activeStatus,
                                    state
                                )} 
                                rounded-2xl w-auto px-4 h-[24px] flex items-center justify-center cursor-pointer`}
                                >
                                {state}
                                </div>
                            </div>                        
                        </>
                    )
                })}          
            </div>            
        </>
    )
}

export default StatusMenu