import React from "react";
// import { useSelector } from "react-redux";
interface patientInfoProps {
  name: string;
  value: number;
  icon: string,
  border:string,
}
export const PatientInfo: React.FC<patientInfoProps> = ({ name, value , icon , border }) => {
  // const theme = useSelector((state: any) => state.theme.value.name);
  return (
    <div className=" relative flex flex-col  items-center justify-center w-24 h-24  xl:w-28 xl:h-28 2xl:w-36 2xl:h-36">
      <img className="absolute w-full h-full object-cover" src={border} alt="" />
      <div className="flex flex-col  items-center justify-center gap-1">
        <img src={icon} alt="" />
        <h2 className={`${name === "Nutritions" ? 'text-primary-color' : 'text-brand-secondary-color'}  font-bold text-xs xl:text-lg 2xl:text-[20px]`}>
          {value}%
        </h2>
        <p className="text-third-text text-xs xl:text-sm 2xl:text-lg font-normal">{name}</p>
      </div>
    </div>
  );
};
