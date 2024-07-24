import { useEffect, useState } from "react";
import border from "../../assets/images/profile-img-border.svg";
import { BiologicalCardInfo, MolecularCardInfo } from "./Data";
import DualProgressCircle from "./dualProgressCircle";
import ProgressCircle from "./progressCircle";
import { Application } from "@/api";
import { useParams } from "react-router-dom";
interface Patient {
  member_id: number;
  name: string;
  age?: number;
  sex?: string;
  photo: string;
  status: string;
  enroll_date?: string;
  last_followup?: string;
}
const InfoCard = () => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (id) {
      const patientId = parseInt(id, 10);
      if (!isNaN(patientId)) {
        Application.getPatients().then((res) => {
          const resolved: Patient[] = res.data;
          if (Array.isArray(resolved)) {
            const foundPatient = resolved.find((p) => {
              if (p && typeof p === "object" && "member_id" in p) {
                return p.member_id === patientId;
              }
              return false;
            });
            setPatient(foundPatient || null);
          }
        });
      }
    }
  }, [id]);
  console.log(patient);
  return (
    <div className="bg-black-primary w-full lg:px-2 xl:px-3 2xl:px-4 py-3  border border-main-border rounded-xl  flex justify-between ">
      <div className=" flex gap-2  xl:gap-4 items-center ">
        <div
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(3,218,197,1) 0%, rgba(31,74,75,1) 53%)",
          }}
          className="relative w-20 rounded-full bg-cover bg-center h-20 xl:w-32 xl:h-32 "
        >
          <div
            style={{ backgroundImage: `url(${border})` }}
            className="relative w-20 xl:w-32 h-20 xl:h-32 bg-cover bg-center"
          >
            <img
              className="absolute top-[4px] left-[4px] xl:top-[6px] xl:left-[6px] w-[72px] h-[72px] rounded-full  xl:h-[115px] xl:w-[115px] object-cover"
              src={patient?.photo}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col  gap-2 text-nowrap">
          <h2 className="text-secondary-text  lg:text-[8px] xl:text-sm font-medium">
            {patient?.name}
          </h2>
          <div className="flex -ml-2 text-[8px] xl:text-sm">
            <h2 className="text-primary-text border-r border-x-secondary-text  px-2 lg:text-[8px] xl:text-sm ">
            {patient?.age} Years
            </h2>
            <h2 className="text-primary-text border-r border-x-secondary-text  px-2 lg:text-[8px] xl:text-sm ">
            {patient?.sex}
            </h2>
            <h2 className="text-primary-text px-2 lg:text-[8px] xl:text-sm ">
              P1245
            </h2>
          </div>
          <div className=" text-[8px] xl:text-[10px]">
            <h2 className="text-secondary-text">Conditions: </h2>
            <p className="text-primary-text">1. High Blood Pressure</p>
            <p className="text-primary-text">2. Diabetes</p>
          </div>
        </div>
      </div>

      <div className="flex  relative  ">
        {BiologicalCardInfo.map((item, i) => (
          <ProgressCircle
            key={i}
            size={35}
            progress={85}
            title={item.title}
            MAE={item.MAE}
            icon={item.icon}
            otherStyles={item.otherStyles}
            border="text-brand-secondary-color"
          />
        ))}
      </div>
      <div className="flex items-center gap-3 -ml-6 xl:-ml-4">
        <div className="flex  items-center ">
          <h2 className="text-secondary-text text-xs xl:text-sm text-nowrap -rotate-90 ">
            Digital Clocks
          </h2>
          <div className="w-[1px] h-36 bg-secondary-color -ml-6 " />
        </div>

        <DualProgressCircle size={120} progress1={48} progress2={39} />
        <div className="flex justify-center items-center gap-3">
          <div className="w-[1px] h-[140px] bg-secondary-color " />
          <h2 className="text-secondary-text text-xs xl:text-sm text-nowrap -rotate-90 -ml-10 ">
            Molcular Clocks
          </h2>
        </div>
      </div>
      <div className="flex  -ml-7  relative  ">
        {MolecularCardInfo.map((item, i) => (
          <ProgressCircle
            key={i}
            size={35}
            progress={45}
            title={item.title}
            MAE={item.MAE}
            icon={item.icon}
            otherStyles={item.otherStyles}
            border="green"
          />
        ))}
      </div>
    </div>
  );
};

export default InfoCard;
