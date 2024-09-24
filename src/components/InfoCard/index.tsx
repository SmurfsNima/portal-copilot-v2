import { useContext, useEffect, useState } from "react";
import border from "../../assets/images/profile-img-border.svg";
import { BiologicalCardInfo, MolecularCardInfo, Plan_Progress} from "./Data";
import { useParams } from "react-router-dom";
import { AppContext } from "@/store/app";
import { Pationt } from "@/model";
import CircularProgressBar from "./CircularProgressBar";
import HalfCycle from "./HalfCycle";
import DualProgressCircle from "./dualProgressCircle";
import ProgressCircle from "./progressCircle";
import { Application } from "@/api";

interface Activity {
  category: string;
  score: number;
  value: number;
}
const InfoCard = () => {
  const [patient, setPatient] = useState<Pationt>();
  const { getPatientById } = useContext(AppContext);
  console.log(patient);

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    setPatient(getPatientById(Number(id)));
  }, [id]);

  const [active] = useState("Progress");
  const colorMap = {
    1: "#03DAC5", // Nutrition
    2: "#FC5474", // Mind
    3: "#FBAD37", // Activity
    4: "#7F39FB"  // Sleep
  };
  const [Physiologicalprogress, setPhysiologicalprogress] = useState<number>();
  const [Emotionalprogress, setEmotionalprogress] = useState<number>();
  const [Fitnessprogress, setFitnessprogress] = useState<number>();
  const [Physiologicalscore, setPhysiologicalscore] = useState<number>();
  const [Emotionalscore, setEmotionalscore] = useState<number>();
  const [Fitnessscore, setFitnessscore] = useState<number>();
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await Application.getActivityByPatientId(Number(id));
        console.log(response);
  
        response.data.activities.forEach((activity:Activity) => {
          switch (activity.category) {
            case 'Fitness':
              setFitnessprogress(activity.value);
              setFitnessscore(activity.score);
              break;
            case 'Physiological':
              setPhysiologicalprogress(activity.value);
              setPhysiologicalscore(activity.score);
              break;
            case 'Emotional':
              setEmotionalprogress(activity.value);
              setEmotionalscore(activity.score);
              break;
            default:
              console.warn('Unknown category:', activity.category);
          }
        });
  
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      }
    };
  
    fetchActivities();
  }, [id]);
   const Progress = [
    {
        ID:1,
        title: 'Physiological',
        Percentage : Physiologicalprogress,
    },
    {
        ID:2,
        title: 'Emotional',
        Percentage : Emotionalprogress,

    },
    {
        ID:3,
        title: 'Fitness',
        Percentage : Fitnessprogress,

    },

 ]
 const Score = [
    {
        ID:1,
        title: 'Physiological',
        Percentage : Physiologicalscore,
    },
    {
        ID:2,
        title: 'Emotional',
        Percentage : Emotionalscore,

    },
    {
        ID:3,
        title: 'Fitness',
        Percentage : Fitnessscore,

    },
    
 ]
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
          <h2 className="text-secondary-text text-sm font-medium">
            {patient?.information.name}
          </h2>
          <div className="flex -ml-2  text-sm">
            <h2 className="text-primary-text border-r border-x-secondary-text px-2 text-nowrap  xl:text-sm">
              {patient?.information.age} Years
            </h2>
            <h2 className="text-primary-text border-r border-x-secondary-text px-2  xl:text-sm">
              {patient?.information.sex}
            </h2>
            <h2 className="text-primary-text px-2 lg:text-[8px] xl:text-sm">
              P1245
            </h2>
          </div>
          {patient?.information?.conditions?.length ? (
            <div>
              <h2 className="text-secondary-text text-xs font-medium">
                Conditions:
              </h2>
              {patient.information.conditions.map((condition, index) => (
                <div key={index} className="text-xs font-normal text-primary-text">
                  {index + 1}. {condition}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* Content based on active state */}
      {active === "Aging" ? (
        <div className="flex gap-10">
           <div className="flex items-center -ml-6 mb-10 relative  ">
            {BiologicalCardInfo.map((item, i) => (
              <ProgressCircle
                key={i}
                size={35}
                progress={0}
                title={item.title}
                MAE={item.MAE}
                icon={item.icon}
                otherStyles={item.otherStyles}
                border="text-brand-secondary-color"
              />
            ))}
          </div>
          <div className="flex items-center gap-3 -ml-6 xl:-ml-16">
            <div className="flex  items-center ">
              <h2 className="text-secondary-text text-xs xl:text-sm text-nowrap -rotate-90 ">
                Digital Clocks
              </h2>
              <div className="w-[1px] h-36 bg-secondary-color -ml-6 " />
            </div>

            <DualProgressCircle size={120} progress1={null} progress2={null} />
            <div className="flex justify-center items-center gap-3">
              <div className="w-[1px] h-[140px] bg-secondary-color " />
              <h2 className="text-secondary-text text-xs xl:text-sm text-nowrap -rotate-90 -ml-10 ">
                Molcular Clocks
              </h2>
            </div>
          </div>
          <div className="flex items-center mb-6  -ml-[70px]  relative  ">
            {MolecularCardInfo.map((item, i) => (
              <ProgressCircle
                key={i}
                size={35}
                progress={0}
                title={item.title}
                MAE={item.MAE}
                icon={item.icon}
                otherStyles={item.otherStyles}
                border="green"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex w-full gap-20">
          <div className="text-sm text-primary-text flex items-center justify-center flex-col">
            <h3 className="mb-[10px]">Progress</h3>
            <div className="  flex items-center justify-center  gap-3">
            {Progress.map((item) => (
                <CircularProgressBar
                  key={item.ID}
                  size={50}
                  percentage={Number(item.Percentage?.toFixed(0))}                  percentageNum={item.Percentage || 0}
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
            <div className=" flex items-center justify-center  gap-3">
              {Score.map((item, index) => (
                <CircularProgressBar
                  key={index}
                  size={50}
                  percentage={(item.Percentage ?? 0) * 10}
                  percentageNum={200}
                  progressColor={colorMap[item.ID as keyof typeof colorMap]}
                  speed={20}
                  titleC={item.title}
                  count={item.Percentage || 0 }
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
      {/* <div className="absolute top-2 right-2 flex gap-1 text-xs">
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
      </div> */}
    </div>
  );
};

export default InfoCard;
