import { useEffect, useState } from "react";
import { PlanManagerModal } from "@/components";
import { Application } from "@/api";
import { UploadLogo } from "./uploadLogo";
import {IntegrationPage} from "./IntegrationPagePage.tsx";
interface Benchmark {
  Benchmark: string;
  Value: number;
  checked: boolean;
}

interface BenchmarkArea {
  Name: string;
  Benchmarks: Benchmark[];
  checked: boolean;
}

interface Category {
  BenchmarkAreas: BenchmarkArea[];
}

type PrioritiesType = Record<string, Category>;
export const Setting = () => {
  const subMenus = [
    {
      icon: "task",
      text: "Plan Priority",
    },
    {
      text: "Upload Your Logo",
      icon: "Upload icon"
    },
    {
      text: "Integration",
      icon: "Integration"
    }
    // {
    //   icon: "profile-2user",
    //   text: "Staff",
    // },
    // {
    //   icon: "note-remove",
    //   text: "Customize Questionnaire",
    // },
    // {
    //   icon: "lock",
    //   text: "Change Password",
    // },
  ];
  const [Priorities, setPriorities] = useState<PrioritiesType>({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Application.showPlanPriorities();
        console.log(response);
        setPriorities(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  const [active, setActive] = useState(0);
  return (
    <div className=" w-full h-[80vh] dark:bg-black-background px-6 flex gap-4">
      <div className="flex flex-col gap-[10px]">
        {subMenus.map((menu, index) => (
          <div onClick={()=>setActive(index)} className={`px-4 pr-5 py-2 text-nowrap cursor-pointer bg-light-min-color dark:bg-black-secondary rounded-md border ${active===index ? 'dark:border-brand-primary-color border-light-border-color-active' : 'dark:border-main-border '}  flex gap-1 items-center text-xs dark:text-primary-text text-lite-primary-text font-normal`}>
            <img className="w-4 h-4 object-contain invert dark:invert-0" src={`./Themes/Aurora/icons/${menu.icon}.svg`} alt="" />
            {menu.text}
          </div>
        ))}
      </div>
      {
        active === 0 &&(
            <PlanManagerModal data={Priorities}></PlanManagerModal>

        )
      }
      {
        active === 1 && (
            <UploadLogo></UploadLogo>
        )

      }
      {
        active === 2 &&(
            <IntegrationPage></IntegrationPage>

        )
      }
    </div>
  );
};
