import { getStatusBgColorClass } from "@/utils/status"
type Status ='Needs Focus' | 'Ok' | 'Good' | 'Excellent' | 'All'

interface StatusMenuProps {
    activeStatus:Status,
    onChange:(status:Status) =>void
}
const StatusMenu:React.FC<StatusMenuProps> = ({activeStatus,onChange}) => {
    const status:Array<Status> =[
        "All",'Needs Focus','Ok','Good','Excellent'
    ]
    return (
        <>
            <div className="rounded-md bg-black-primary border border-main-border flex items-center justify-center text-xs text-primary-text">
                {status.map((state) => {
                    return (
                        <>
                            <div className="border-r border-main-border py-1 px-3  ">
                                <div
                                onClick={() => {
                                    onChange(state)
                                }}
                                className={` ${getStatusBgColorClass(
                                    activeStatus,
                                    state
                                )} rounded-2xl w-auto px-4 h-[24px] flex items-center justify-center`}
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