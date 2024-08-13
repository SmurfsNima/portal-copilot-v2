import React, { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
interface ClientCardProps {
  picture: string;
  name: string;
  city: string;
  age: number;
  height: number;
  weight: number;
  blood: string;
  status: string;
  cardActive: string;
  setCardActive: Dispatch<SetStateAction<string>>;
}
export const ClientCard: React.FC<ClientCardProps> = ({
  picture,
  name,
  city,
  age,
  height,
  weight,
  blood,
  status,
  cardActive,
  setCardActive,
}) => {
  console.log(cardActive);
  const theme = useSelector((state: any) => state.theme.value.name);

  return (
    <div
      onClick={() => setCardActive(name)}
      className={`${
        cardActive === name
          ? "border-brand-primary-color"
          : "border-main-border"
      } cursor-pointer bg-black-secondary px-3 py-2 border rounded-md relative mt-[6px] `}
    >
      <div className="w-full flex justify-between items-start text-[10px]">
        <div className="flex gap-3 items-center">
          <img className="rounded-full w-[32px] h-[32px]" src={picture} alt="" />
          <div className=" text-primary-text flex flex-col gap-1">
            {name}
            <span className="text-secondary-text">{city}</span>
          </div>
        </div>
        <div
          className={`text-black text-[10px] px-2 py-[2px] rounded-2xl ${
            status === "Checked" ? "bg-brand-primary-color" : "bg-orange-status"
          }`}
        >
          {status}{" "}
        </div>
      </div>
      <div className="mt-3 w-[60%] flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <span className="text-secondary-text text-[10px]">Age</span>
          <span className="text-primary-text text-xs">{age} Years</span>
          <span className="text-secondary-text text-[10px]">Height</span>
          <span className="text-primary-text text-xs">{height} cm</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-secondary-text text-[10px]">Weight</span>
          <span className="text-primary-text text-xs">{weight} kg</span>
          <span className="text-secondary-text text-[10px]">Blood</span>
          <span className="text-primary-text text-xs">{blood}</span>
        </div>
      </div>
      <div className=" absolute right-[5%] top-[35%] flex flex-col gap-4">
        <div className="cursor-pointer bg-black-third rounded-full p-2">
          {" "}
          <img
            className={`${theme}-icons-export`}
          
            alt=""
          />
        </div>
        <div className="cursor-pointer bg-black-third rounded-full p-2">
          {" "}
          <img
 className={`${theme}-icons-more`}          
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
