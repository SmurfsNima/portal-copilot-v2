import { Dispatch, SetStateAction } from "react";
import { LineChart, MixedLinesChart } from "@/components/charts/index";
import { useSelector } from "react-redux";
interface CharCardProps {
  title: string;
  type?: string;
  Avarage: number;
  current: number;
  active: string | null;
  setActive: Dispatch<SetStateAction<any>>;
}
// const otherTypes = ['Hb' , 'HCT' , 'WBC' ,'MCHC' , 'MCH' , 'RBC', 'PLT' ]
export const ChartCard: React.FC<CharCardProps> = ({
  title,
  type = "line",
  Avarage,
  current,
  active,
  setActive,
  
}) => {
  const theme = useSelector((state: any) => state.theme.value.name);

  return (
    <div
      onClick={() => setActive(title)}
    data-active ={active===title}
    className={`${active===title && 'bg-brand-primary-color'} bg-black-primary px-1 xl:px-6  py-3 border border-main-border rounded-2xl flex`}
    >
      <div className=" w-full  flex   flex-col gap-3  ">
        <div className="flex gap-2 items-center">
          <div className="bg-black-background flex items-center justify-center rounded-lg p-1">
            <img
              className={`${theme}-icons-${title?.replace(/\s+/g, "")}`}
              alt=""
            />
          </div>

          <h2
          data-active={active===title}
           className={`${theme}-biomarker-chartCard-title`}
          >
            {title}
          </h2>
        </div>
        {/* {
            title === "CBC" &&(
                <div className="flex  my-1 ">
                { otherTypes.map((item , i) => (
                  <span key={i}
                    onClick={() => setActive(item)}
                    className={`${
                      active === item
                        ? "text-brand-primary-color   border-brand-primary-color"
                        : "text-secondary-text border-main-border "
                    } border-b cursor-pointer px-2 text-sm`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            )
        } */}
       
        <div className=" w-[180px] h-[100px]">
          {title === "Blood Pressure" ? (
            <MixedLinesChart active={active === title} />
          ) : (
            <LineChart active={active === title} model={type} />
          )}
        </div>
      </div>
      <div className="flex flex-col items-end justify-between w-full ">
        <div className="flex flex-col text-center ">
          <h2
             data-active={active===title}
             className={` ml-[2px] text-secondary-text  ${
                theme}-biomarker-chartCard-text text-xs`}
          >
            Avg
          </h2>
          <h2
          data-active={active===title}
            className={` ml-[2px]  ${
                theme}-biomarker-chartCard-text text-lg`}
          >
            {Avarage}
            <span
          data-active={active===title}
            className={` ml-[2px]  ${
             theme}-biomarker-chartCard-text text-[10px] text-secondary-text`}
          >
            {title === "Temperature"
              ? "oF"
              : title === "Heart Rate"
              ? "bpm"
              : title === "CBC"
              ? "%"
              : "mm/hg"}
          </span>
          </h2>{" "}
          
        </div>
        <div className="flex  text-center  flex-col">
          <h2
           data-active={active===title}
             className={` ml-[2px] text-secondary-text  ${
                theme}-biomarker-chartCard-text text-xs`}
          >
            Current
          </h2>
          <h2
           data-active={active===title}
            className={` ml-[2px]  ${
                theme}-biomarker-chartCard-text  text-lg`}
          >
            {current}
            <span
           data-active={active===title}
            className={` ml-[2px] text-secondary-text  ${
                theme}-biomarker-chartCard-text text-[10px]`}
          >
            {title === "Temperature"
              ? "oF"
              : title === "Heart Rate"
              ? "bpm"
              : title === "CBC"
              ? "%"
              :  "mm/hg"}
          </span>
          </h2>{" "}
        
        </div>
      </div>
    </div>
  );
};
