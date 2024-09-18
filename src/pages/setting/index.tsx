import { useState } from "react";
import { PlanManagerModal } from "@/components";
export const Setting = () => {
  const subMenus = [
    {
      icon: "task",
      text: "Plan Priority",
    },
    {
      icon: "profile-2user",
      text: "Staff",
    },
    {
      icon: "note-remove",
      text: "Customize Questionnaire",
    },
    {
      icon: "lock",
      text: "Change Password",
    },
  ];
  const priorities = [
    {
      category: "Physiological",
      subCategories: [
        {
          name: "Recovery",
          isActive: true,
          level: 1,
          subMenus: [
            { name: "Sleep Quality", isActive: true, level: 1 },
            { name: "Heart Rate Variability", isActive: false, level: 2 },
            { name: "Time Spent Outside", isActive: true, level: 3 },
          ],
        },
        { name: "Time Priorities", isActive: false, level: 2 },
        { name: "Metabolic Function", isActive: true, level: 2 },
        { name: "Nutrition", isActive: false, level: 1 },
        { name: "Cardiovascular Health", isActive: false, level: 1 },
        { name: "Body Composition", isActive: false, level: 1 },
      ],
    },
    {
      category: "Fitness",
      subCategories: [
        { name: "Daily Activity", isActive: true, level: 1 },
        { name: "Stability", isActive: true, level: 1 },
        {
          name: "Mobility",
          isActive: true,
          level: 1,
          subMenus: [
            { name: "Lower Body", isActive: true, level: 1 },
            { name: "Upper Body", isActive: false, level: 2 },
          ],
        },
        {
          name: "Flexibility",
          isActive: false,
          level: 1,
          subMenus: [
            { name: "Cardiovascular Fitness", isActive: false, level: 1 },
            { name: "Power", isActive: false, level: 1 },
            { name: "Bodyweight Max Strength", isActive: false, level: 1 },
            { name: "Weighted Max Strength", isActive: false, level: 1 },
            { name: "Functional Strength", isActive: false, level: 1 },
          ],
        },
      ],
    },
    {
      category: "Emotional",
      subCategories: [
        { name: "Emotional Fitness", isActive: true, level: 1 },
      ],
    },
  ];
  const [active, setActive] = useState(0);
  return (
    <div className=" w-full h-[80vh] bg-black-background px-6 flex gap-4">
      <div className="flex flex-col gap-[10px]">
        {subMenus.map((menu, index) => (
          <div onClick={()=>setActive(index)} className={`px-4 pr-5 py-2 text-nowrap cursor-pointer bg-black-secondary rounded-md border ${active===index ? 'border-brand-primary-color' : 'border-main-border'}  flex gap-1 items-center text-xs text-primary-text font-normal`}>
            <img className="w-3 h-3 object-contain" src={`/public/Themes/Aurora/icons/${menu.icon}.svg`} alt="" />
            {menu.text}
          </div>
        ))}
      </div>
      {
        active === 0 &&(
            <PlanManagerModal priorities={priorities}></PlanManagerModal>

        )
      }
    </div>
  );
};
