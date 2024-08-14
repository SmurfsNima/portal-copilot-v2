import { InfoCard } from "@/components"
import { useState } from "react"
import { useSelector } from "react-redux";

const TimeLine = () => {
    const theme = useSelector((state: any) => state.theme.value.name);
    const [activities] = useState([
        {
        date:'July 2nd, 2024',
        time:'09:36 am',
        content:'Registration',
        mode:'before'
        },
        {
        date:'July 3rd, 2024',
        time:'04:08 pm',
        content:'Record blood test results by patient',
        mode:'before'
        },
        {
        date:'Today',
        time:'09:36 am',
        content:'The patient suspects diabetes Request to register a new blood test from the patient with a time interval of 14 days from the previous test',
        mode:'Today'
        }, 
        {
        date:'July 17rd, 2024',
        time:'05:12 pm',
        content:'New blood test results recorded by patient',
        mode:'after'
        },                
    ])    
    return (
        <>
            <div className="flex flex-col w-full  items-start gap-4">
                <InfoCard></InfoCard>        
                <div className="bg-black-primary overflow-hidden relative w-full lg:px-2 xl:px-3 2xl:px-4 py-3 min-h-[47vh] border border-main-border rounded-xl  flex ">
                    <div className="absolute gap-4 top-4 left-5 flex justify-start">
                        <div className="flex justify-start items-center gap-1">
                            <img src="/Themes/Aurora/icons/tick-square2.svg" alt="" />
                            <div className="text-[#FFFFFFDE] text-[12px]">Done</div>
                        </div>
                        <div className="flex justify-start items-center gap-1">
                            <img src="/Themes/Aurora/icons/inprogress.svg" alt="" />
                            <div className="text-[#FFFFFFDE] text-[12px]">In progress</div>
                        </div>

                        <div className="flex justify-start items-center gap-1">
                            <img src="/Themes/Aurora/icons/more-square2.svg" alt="" />
                            <div className="text-[#FFFFFFDE] text-[12px]">Up-coming</div>
                        </div>
                    </div>
                    <div className="grid col-span-12 grid-cols-12">
                        <div className="col-span-4 mt-2"></div>
                        <div className="col-span-6  ">
                        <div className=" relative ">
                            {activities.map((activity) => {
                            return (
                                <>
                                <div className={`absolute block  w-[1px] h-[30%] border-l-2 border-[#FFFFFFDE] ${activity.mode == 'after'?'border-dashed':''} dark:bg-darkmode-400 ml-5 mt-[-40px]`}></div>
                                <div className="relative flex items-center mb-3 intro-x  z-10">
                                    <div className="before:block before:absolute  before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                                    <div className="flex justify-center items-center bg-[#333333] w-10 h-10 overflow-hidden rounded-full " style={{boxShadow:activity.date == 'Today'? '0px 0px 20px 0px rgba(255, 255, 255, 0.60)':'unset'}}>
                                        {/* <img
                                        alt="Midone Tailwind HTML Admin Template"
                                        src={fakerData[9].photos[0]}
                                        /> */}
                            <img src="/Themes/Aurora/icons/tick-square2.svg" alt="" />
                                    </div>
                                    </div>
                                    <div className="flex-1 px-5 py-3 ml-4 border-[#383838] w-[auto] border bg-[#272727] rounded-[16px]  ">
                                    <div className="flex items-center">
                                        <div className="font-medium text-[#FFFFFFDE]">
                                        {activity.date}
                                        </div>
                                        <div className="ml-auto flex items-center gap-1 text-xs text-[#FFFFFFDE]">
                                        <img src="/public/Themes/Aurora/icons/clock.svg" alt="" />
                                        {activity.time}
                                        </div>
                                    </div>
                                    <div className="mt-1 text-[#FFFFFFDE]">
                                        {activity.content}
                                    </div>
                                    </div>
                                </div>
                                </>

                            )
                            })}

                        </div>
                        </div>   

                    </div>

                </div>

             
            </div>
        </>
    )
}

export default TimeLine