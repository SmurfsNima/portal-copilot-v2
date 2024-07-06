/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import check from '/Themes/Aurora/icons/check.svg'
import calender from '/Themes/Aurora/icons/calender.svg'

const Appointments = () => {
    const theme = useSelector((state: any) => state.theme.value.name);
    const appointments = [
        { date: '21 Aug, 2024', time: '8:30 pm', doctor: 'Dr. Daniel Alfonzo', isDone: false, details: 'more details' },
        { date: '19 Feb, 2024', time: '10:00 am', doctor: 'Dr. Daniel Alfonzo', isDone: true, details: 'more details' },
        { date: '05 Mar, 2024', time: '9:00 am', doctor: 'Dr. Daniel Alfonzo', isDone: true, details: 'more details' },
        { date: '27 Feb, 2024', time: '11:00 am', doctor: 'Dr. Daniel Alfonzo', isDone: true, details: 'more details' },
    ];    
    return (
        <>
            {appointments.map((item, index) => (
              <div key={index} className="flex gap-2">
                <div className="relative">
                  <img width={32} className='object-contain' src={item.isDone ? check : calender} alt="" />
                  <div className="h-[42px] w-[1px]  bg-main-border absolute top-9  left-[14px]" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h2 className={`${theme}-graphicinfo-btn-text`}>{item.date}</h2>
                    <p className="text-[10px] font-normal text-third-text">{item.time}</p>
                  </div>
                  <h2 className="text-secondary-text text-xs">{item.doctor}</h2>
                  <a className="underline text-primary-color cursor-pointer text-xs">{item.details}</a>
                </div>
              </div>
            ))}        
        </>
    )
}

export default Appointments