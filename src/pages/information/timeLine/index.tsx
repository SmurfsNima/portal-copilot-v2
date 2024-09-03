import { InfoCard } from "@/components"
import { useState } from "react"
import './style.css';
// import { useSelector } from "react-redux";

const TimeLine = () => {
    // const theme = useSelector((state: any) => state.theme.value.name);
    const [activities] = useState([
        {
        date:'July 2nd, 2022',
        time:'09:36 am',
        content:'Registration',
        mode:'before',
        status:1
        },
        {
        date:'July 3rd, 2024',
        time:'04:08 pm',
        content:'Record blood test results by patient',
        mode:'before',
        status:2

        },
        {
        date:'Today',
        time:'09:36 am',
        content:'The patient suspects diabetes Request to register a new blood test from the patient with a time interval of 14 days from the previous test',
        mode:'Today',
        status:1

        }, 
        {
        date:'July 17rd, 2024',
        time:'05:12 pm',
        content:'New blood test results recorded by patient',
        mode:'after',
        status:3

        },                
        {
        date:'July 17rd, 2024',
        time:'05:12 pm',
        content:'New blood test results recorded by patient recorded by patient',
        mode:'after',
        status:1

        },                
        {
        date:'July 17rd, 2024',
        time:'05:12 pm',
        content:'New blood test results recorded by patient',
        mode:'after',
        status:1
        },                
    ])    

 
    return (
        <>
            <div className="flex flex-col w-full  items-start gap-4">
                <InfoCard></InfoCard>        
                <div className="bg-black-primary overflow-hidden  relative w-full lg:px-2 xl:px-3 2xl:px-4 py-3 min-h-[47vh] border border-main-border rounded-xl  flex ">
                    
                    <div className=" flex items-start justify-start w-full p-2">

                        <div className="flex relative px-8">
                        <div className=" w-[300px] gap-7 top-4 left-5 flex justify-start">
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
                        </div>

                        <div className="flex overflow-auto hidden-scrollBar flex-col max-h-[22rem]">
                        <div className=" relative ">
                            {activities.map((activity) => {
                            return (
                                <>
                                  <div className={`absolute block mt-[1.2rem] w-[1px] h-[20%] border-l-2 border-[#FFFFFFDE] ${activity.mode === 'Today' ? 'border-dashed' : activity.mode === 'after' ? 'border-dashed' : ''} dark:bg-darkmode-400 ml-5 mt-[-40px]`}></div>
                                    <div className="relative flex items-start mb-3 intro-x  z-10 mb-[30px]">
                                    <div className="before:block before:absolute  before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                                    <div className="flex justify-center items-center bg-[#333333] w-10 h-10 overflow-hidden rounded-full " style={{border:activity.date == 'Today'? '1px solid aqua':'unset'}}>
                                     
                                    {activity.status === 1 
                                                            ? <img src="/Themes/Aurora/icons/tick-square2.svg" alt="Status 1" /> 
                                                            : activity.status === 2 
                                                                ? <img src="/Themes/Aurora/icons/inprogress.svg" alt="Status 2" /> 
                                                                : <img src="/Themes/Aurora/icons/more-square2.svg" alt="Status 3" />}
                                    </div>
                                    </div>
                                    <div className="flex flex-col px-5 py-3 ml-4 border-[#383838] min-w-[20rem]  max-w-[45rem] border bg-[#272727] rounded-[16px]   ">
                                    <div className="flex items-center mb-[10px]">
                                        <div className="text-[14px] text-[#FFFFFFDE]">
                                        {activity.date}
                                        </div>
                                        <div className="ml-auto flex items-center gap-1 text-xs text-[#ffffff7e]">
                                        <img src="/public/Themes/Aurora/icons/clock.svg" alt="" />
                                        {activity.time}
                                        </div>
                                    </div>
                                    <p className="mt-1 text-[14px]  text-[#FFFFFFDE] ">
                                        {activity.content}
                                    </p>
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