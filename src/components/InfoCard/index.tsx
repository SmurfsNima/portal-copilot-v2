import { useContext, useEffect, useState } from "react";
import border from "../../assets/images/profile-img-border.svg";
import { Progress ,Score , Plan_Progress} from "./Data";
import { useParams } from "react-router-dom";
import { AppContext } from "@/store/app";
import { Pationt } from "@/model";
import CircularProgressBar from "./CircularProgressBar";
import HalfCycle from "./HalfCycle";

const InfoCard = () => {
  const [patient, setPatient] = useState<Pationt>();
  const { getPatientById } = useContext(AppContext);

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    setPatient(getPatientById(Number(id)));
  }, [id]);

  const [active, setActive] = useState("Progress");
  const colorMap = {
    1: "#03DAC5", // Nutrition
    2: "#FC5474", // Mind
    3: "#FBAD37", // Activity
    4: "#7F39FB"  // Sleep
  };

  return (
    <div className="bg-black-primary w-full lg:px-2 xl:px-3 2xl:px-4 py-2 border border-main-border rounded-xl flex items gap-10 relative overflow-hidden h-[166px]">
      <div className="mt-5 flex gap-10 xl:gap-12">
        {/* Patient Info */}
        <div className="relative w-20 rounded-full bg-cover bg-center h-20 xl:w-[115px] xl:h-[115px]">
          <div
            style={{ backgroundImage: `url(${border})` }}
            className="relative w-20 h-20 xl:w-[115px] xl:h-[115px] bg-cover bg-center"
          >
            <img
              className="absolute top-[4px] left-[4px] xl:top-[6px] xl:left-[6px] w-[78px] h-[88px] rounded-full xl:h-[105px] xl:w-[105px] object-cover"
              src={patient?.information.picture}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-secondary-text lg:text-[8px] xl:text-sm font-medium">
            {patient?.information.name}
          </h2>
          <div className="flex -ml-2 text-[8px] xl:text-sm">
            <h2 className="text-primary-text border-r border-x-secondary-text px-2 lg:text-[8px] xl:text-sm">
              {patient?.information.age} Years
            </h2>
            <h2 className="text-primary-text border-r border-x-secondary-text px-2 lg:text-[8px] xl:text-sm">
              {patient?.information.sex}
            </h2>
            <h2 className="text-primary-text px-2 lg:text-[8px] xl:text-sm">
              P1245
            </h2>
          </div>
          <div>
            <h2 className="text-secondary-text text-xs font-medium">
              Conditions:
            </h2>
            {/* Uncomment and map through conditions */}
            {/* {patient?.information?.conditions.map((condition, index) => (
              <div className="text-xs font-normal text-primary-text">
                {index + 1}. {condition}
              </div>
            ))} */}
          </div>
        </div>
      </div>

      {/* Content based on active state */}
      {active === "Aging" ? (
        <div className="flex gap-10">
          {/* Your Aging content */}
        </div>
      ) : (
        <div className="flex w-full gap-20">
          <div className="text-sm text-primary-text flex items-center justify-center flex-col">
            <h3 className="mb-[10px]">Progress</h3>
            <div className=" w-[120px] h-[110px] flex items-center justify-center flex-wrap gap-3">
            {Progress.map((item) => (
                <CircularProgressBar
                  key={item.ID}
                  size={50}
                  percentage={item.Percentage}
                  percentageNum={item.Percentage}
                  progressColor={colorMap[item.ID as keyof typeof colorMap]}
                  speed={20}
                  titleC={item.title}
                  count={99}
                />
              ))}
            </div>
          </div>
          <div className="text-sm text-primary-text flex items-center justify-center flex-col">
            <h3 className="mb-[10px]">Score</h3>
            <div className=" w-[120px] h-[110px] flex items-center justify-center flex-wrap gap-3">
              {Score.map((item, index) => (
                <CircularProgressBar
                  key={index}
                  size={50}
                  percentage={item.Percentage * 10} 
                  percentageNum={200}
                  progressColor={colorMap[item.ID as keyof typeof colorMap]}
                  speed={20}
                  titleC={item.title}
                  count={item.Percentage}
                />
              ))}
            </div>
          </div>
          <div className="text-sm text-primary-text flex items-center justify-center flex-col">
            <h3 className="mb-[10px]">Plan Progress</h3>
            <HalfCycle percentage={Plan_Progress[0].Percentage} />
          </div>
        </div>
      )}

      {/* Toggle buttons */}
      <div className="absolute top-2 right-2 flex gap-1 text-xs">
        <div
          onClick={() => setActive("Progress")}
          className={`rounded-lg px-3 py-2 cursor-pointer ${
            active === "Progress"
              ? "text-primary-text bg-black-third"
              : "text-secondary-text"
          }`}
        >
          Progress
        </div>
        <div
          onClick={() => setActive("Aging")}
          className={`rounded-lg px-3 py-2 cursor-pointer ${
            active === "Aging"
              ? "text-primary-text bg-black-third"
              : "text-secondary-text"
          }`}
        >
          Aging
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
