// DualProgressCircle.js
interface DualProgressCircleProps{
  progress1 : number,
  progress2 : number,
  size : number,
}
const DualProgressCircle: React.FC<DualProgressCircleProps> = ({ progress1, progress2, size = 135 }) => {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset1 = circumference - (progress1 / 100) * circumference;
  const offset2 = circumference - (progress2 / 100) * circumference;

  return (
    <div className="flex    items-center">
      <div className="relative " style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            className="text-gray-900"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className={`text-gray-800 }`}
            strokeWidth="10"
            stroke="currentColor"
            fill="currentColor"
            r={radius - 5}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className="text-brand-secondary-color"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset1}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className="text-brand-primary-color"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset2}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            style={{ transform: "rotate(180deg)", transformOrigin: "center" }}
          />
        </svg>

        <div className="absolute inset-0 top-3 -left-1 flex justify-start items-center gap-2  ">
          <div className=" ml-6 flex flex-col items-end gap-1">
            <span className="text-secondary-text text-right text-[10px]">
              Biological <br /> Age
            </span>
            <div className="h-[1px] w-7 bg-secondary-text" />
            <span className="text-primary-text text-[16px] font-medium">
              {progress1}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-secondary-text text-right text-[10px] font-medium">
              Chrono <br /> Age
            </span>
            <div className="h-[1px] w-7 bg-secondary-text" />
            <span className="text-base text-primary-text">{progress2}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DualProgressCircle;
