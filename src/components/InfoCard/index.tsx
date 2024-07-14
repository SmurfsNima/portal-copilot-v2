import border from "../../assets/images/profile-img-border.svg";
import profille from "../../assets/images/profile-img.svg";
import { BiologicalCardInfo ,MolecularCardInfo} from "./Data";
import DualProgressCircle from "./dualProgressCircle";
import ProgressCircle from "./progressCircle";

const InfoCard = () => {
  return (
    <div className="bg-black-primary w-full max-w-[1224px] mx-auto lg:px-6 md:px-4 py-3  border border-main-border rounded-xl  flex ">
      <div className=" flex gap-4 items-center ">
        <div
          style={{
            backgroundImage:
            'radial-gradient(circle, rgba(3,218,197,1) 0%, rgba(31,74,75,1) 53%)',
           
          }}
          className="relative w-32 rounded-full bg-cover bg-center h-32 "
        >
          <div  style={{ backgroundImage: `url(${border})` }} className="relative w-32 h-32 bg-cover bg-center">
            
            <img
              className="absolute top-[6px] left-[6px]  h-[115px] w-[115px] object-cover"
              src={profille}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col  gap-2 text-nowrap">
          <h2 className="text-secondary-text text-[14px] font-medium">
            Leslie Alexander
          </h2>
          <div className="flex -ml-2 text-sm">
            <h2 className="text-primary-text border-r border-x-secondary-text  px-2 text-sm">
              48 Years
            </h2>
            <h2 className="text-primary-text border-r border-x-secondary-text  px-2 text-sm">
              Female
            </h2>
            <h2 className="text-primary-text px-2 text-sm ">P1245</h2>
          </div>
          <div className="text-xs">
            <h2 className="text-secondary-text">Conditions: </h2>
            <p className="text-primary-text">1. High Blood Pressure</p>
            <p className="text-primary-text">2. Diabetes</p>
          </div>
        </div>
      </div>

      <div className=" ml-4 flex gap-1 relative  ">
        {BiologicalCardInfo.map((item , i) => (
          <ProgressCircle
          key={i}
            size={45}
            progress={85}
            title={item.title}
            MAE={item.MAE}
            icon={item.icon}
            otherStyles={item.otherStyles}
            border="text-brand-secondary-color"
          />
        ))}
      </div>
      <div className="flex items-center gap-5">
        <div className="flex  items-center ">
          <h2 className="text-secondary-text text-sm text-nowrap -rotate-90 ">
            Digital Clocks
          </h2>
          <div className="w-[1px] h-36 bg-secondary-color -ml-6 " />
        </div>

        <DualProgressCircle size={135} progress1={48} progress2={39} />
        <div className="flex justify-center items-center gap-4">
          <div className="w-[1px] h-[140px] bg-secondary-color -" />
          <h2 className="text-secondary-text text-sm text-nowrap -rotate-90 -ml-12 ">
            Molcular Clocks
          </h2>
        </div>
      </div>
      <div className="flex  relative  ">
        {MolecularCardInfo.map((item , i) => (
          <ProgressCircle
          key={i}
            size={45}
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

export default  InfoCard