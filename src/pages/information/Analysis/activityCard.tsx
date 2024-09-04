import CircularProgressBar from "@/components/charts/CircularProgressBar";
import React from "react";
import { useSelector } from "react-redux";

interface ActivityCardProps {
  name: string;
  score: number;
  percentage: number;
}
export const ActivityCard: React.FC<ActivityCardProps> = ({
  name,
  score,
  percentage,
}) => {
  const theme = useSelector((state: any) => state.theme.value.name);

  return (
    <div className="bg-black-primary text-primary-text rounded-2xl cursor-pointer flex justify-between w-[315px]  px-5 py-3">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm font-medium text-center text-nowrap">
          <div className="h-8 w-8 bg-black-background rounded-lg flex items-center justify-center">
            {" "}
            <img   className={ ` bg-brand-primary-color ${theme}-icons-${name.replace(/\s+/g, "")}`} alt="" />
          </div>

          {name}
        </div>
        <span className="text-secondary-text text-xs font-light text-center ">Score</span>
        <div className="text-lg font-medium text-center">
          {score} <span className="text-secondary-text">/10</span>
        </div>
        <a
          className="text-brand-primary-color text-xs font-medium underline"
          href=""
        >
          Detail
        </a>
      </div>
      <CircularProgressBar
        size={95}
        startColor="#7F39FB"
        endColor="#7F39FB"
        percentage={percentage}
      ></CircularProgressBar>
    </div>
  );
};
