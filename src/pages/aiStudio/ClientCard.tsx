import React, { Dispatch, SetStateAction } from "react";
// import { useSelector } from "react-redux";
import { getStatusBgColorClass } from "@/utils/status";
import { Link } from "react-router-dom";
interface ClientCardProps {
  index: number;
  picture?: string;
  name: string;
  email: string;
  status: string;
  cardActive: null | number;
  // onClick: () => void;
  memberID : number
  setCardActive: Dispatch<SetStateAction< null | number>>;
}
export const ClientCard: React.FC<ClientCardProps> = ({
  name,
  email,
  picture,
  status,
  cardActive,
  memberID,
  setCardActive,
}) => {
  // const theme = useSelector((state: any) => state.theme.value.name);
console.log(memberID);

  return (
    <div
      onClick={() => {
        setCardActive(memberID);
        // onClick(); // Call onClick when the card is clicked
      }} // onClick={() => setCardActive(index)}
      className={`${
        cardActive === memberID
          ? "dark:border-brand-primary-color bg-light-border-color border-light-blue-active   dark:bg-black-secondary"
          : "dark:border-main-border border-light-border-color bg-white dark:bg-black-primary"
      } cursor-pointer ${memberID == 1?'hidden':'block'}  px-3 py-2 border rounded-md relative mt-[6px] w-full  `}
    >
      <div className="w-full flex justify-between items-start text-[10px]">
        <div className="flex gap-3 items-center">
          <img
            className="rounded-full w-[32px] h-[32px]"
            src={picture!=''?picture:`https://ui-avatars.com/api/?name=${name}`}
            alt=""
          />
          <div className=" text-light-secandary-text dark:text-primary-text font-medium flex flex-col ">
            {name}
          </div>
        </div>
        <div
          className={`text-black text-[8px] px-2 py-[2px] rounded-2xl ${getStatusBgColorClass(status , status)} `}
        >
          {status}{" "}
        </div>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <div className="flex flex-col  text-primary-text">
          {" "}
          <span className="text-light-primary-text dark:text-secondary-text text-[8px] font-light">Email-address </span>
        <span className="text-[10px] text-light-secandary-text dark:text-primary-text font-normal">{email}</span>
        </div>
      </div>
      <Link to={`/information/${memberID}/Analysis`}>
      <div className=" absolute right-[5%] bottom-1 flex flex-col gap-4">
        <div className="cursor-pointer bg-light-border-color dark:bg-black-third rounded-full p-2">
          {" "}
          <img src="/Themes/Aurora/icons/export.svg" alt="" />
        </div>
        {/* <div className="cursor-pointer bg-black-third rounded-full p-2">
          {" "}
          <img
src="/Themes/Aurora/icons/more-square.svg"        
            alt=""
          />
        </div> */}
      </div>
      </Link>

    
    </div>
  );
};
