import React from "react";
import { useSelector } from "react-redux";
import { Dispatch, SetStateAction } from "react";

interface InterventionCardPorps {
  icon: string;
  title: string;
  text: string;
  buttons: string[];
  active: string | null;
  setActive: Dispatch<SetStateAction<any>>;
}

export const InterventionCard: React.FC<InterventionCardPorps> = ({
  icon,
  title,
  text,
  buttons,
  active,
  setActive,
}) => {
  const theme = useSelector((state: any) => state.theme.value.name);
  return (
    <div
      onClick={() => setActive(icon)}
      className={`${
        active === icon
          ? "bg-brand-primary-color text-black-background"
          : "bg-black-primary text-primary-text"
      } cursor-pointer  px-3 py-2 flex flex-col justify-between gap-2 border border-main-border rounded-2xl`}
    >
      <div className="flex items-center gap-2">
        <div className="bg-black-background p-1 flex justify-center items-center rounded-lg">
          <img className={`${theme}-icons-${icon}`} alt="" />
        </div>
        <h5 className=" text-sm font-medium">{title}</h5>
      </div>
      <p className="text-xs font-normal">{text}</p>
      <div className="  flex items-center gap-3 text-xs">
        {buttons.map((item, i) => (
          <div
            key={i}
            className="bg-black-secondary rounded-full px-4 py-2 text-brand-primary-color"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
