import { InfoCard } from "@/components";
import { useSelector } from "react-redux";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const daysInMonth = [
  { date: "29", activities: [], inCurrentMonth: false },
  { date: "30", activities: [], inCurrentMonth: false },
  { date: "01", activities: [], inCurrentMonth: true },
  { date: "02", activities: ["30 min walking", "Track body states", "Workout of the day"], inCurrentMonth: true },
  { date: "03", activities: [], inCurrentMonth: true },
  { date: "04", activities: ["Track body states"], inCurrentMonth: true },
  { date: "05", activities: ["30 min walking", "Workout of the day"], inCurrentMonth: true },
  { date: "06", activities: [], inCurrentMonth: true },
  { date: "07", activities: [], inCurrentMonth: true },
  { date: "08", activities: [], inCurrentMonth: true },
  { date: "09", activities: [], inCurrentMonth: true },
  { date: "10", activities: ["30 min walking", "Track body states", "+3 more"], inCurrentMonth: true },
  { date: "11", activities: [], inCurrentMonth: true },
  { date: "12", activities: [], inCurrentMonth: true },
  { date: "13", activities: [], inCurrentMonth: true },
  { date: "14", activities: [], inCurrentMonth: true },
  { date: "15", activities: ["30 min walking", "Track body states", "Workout of the day"], inCurrentMonth: true },
  { date: "16", activities: [], inCurrentMonth: true },
  { date: "17", activities: [], inCurrentMonth: true },
  { date: "18", activities: [], inCurrentMonth: true },
  { date: "19", activities: [], inCurrentMonth: true },
  { date: "20", activities: [], inCurrentMonth: true },
  { date: "21", activities: [], inCurrentMonth: true },
  { date: "22", activities: [], inCurrentMonth: true },
  { date: "23", activities: [], inCurrentMonth: true },
  { date: "24", activities: ["Track body states", "30 min walking", "+3 more"], inCurrentMonth: true },
  { date: "25", activities: [], inCurrentMonth: true },
  { date: "26", activities: [], inCurrentMonth: true },
  { date: "27", activities: [], inCurrentMonth: true },
  { date: "28", activities: [], inCurrentMonth: true },
  { date: "29", activities: [], inCurrentMonth: true },
  { date: "30", activities: [], inCurrentMonth: true },
  { date: "31", activities: [], inCurrentMonth: true },
  { date: "01", activities: [], inCurrentMonth: false },
  { date: "02", activities: [], inCurrentMonth: false },
  { date: "03", activities: [], inCurrentMonth: false },
  { date: "04", activities: [], inCurrentMonth: false },
]
export const Calender = () => {
    const theme = useSelector((state: any) => state.theme.value.name);
  return (
    <div className="w-full flex flex-col gap-1">
    <InfoCard />
    <div className="w-full bg-black-primary border border-main-border text-primary-text px-4 py-2 rounded-lg max-h-[550px] overflow-auto">
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-semibold">July 2024</h2>
        <img className={`${theme}-icons-arrow-down`} alt="" />
      </div>
      <div className="grid grid-cols-7 gap-2 mmt-1">
        {daysOfWeek.map((day, index) => (
          <div key={index} className=" text-sm text-center text-primary-text">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            className={`px-4 py-1  rounded-lg  ${
              day.inCurrentMonth ? "bg-black-secondary" : "bg-black-third"
            }`}
          >
            <div className={` ${day.inCurrentMonth ? 'text-primary-text' : 'text-secondary-text'}  text-xs`}>{day.date}</div>
            {day.activities.length > 0 && (
              <ul >
                {day.activities.map((activity, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="w-[10px] h-[10px] rounded-full border border-brand-primary-color"></span>
                    <span className="text-[8px]">{activity}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};
