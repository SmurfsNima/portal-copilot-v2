
interface ProgressCircleProps {
  title: string,
  MAE: string,
  icon: string,
  progress: number,
  size: number,
  otherStyles: string,
  border: string,
}


const ProgressCircle: React.FC<ProgressCircleProps> = ({ size=45 ,progress, title , MAE , icon , otherStyles , border}) => {
const radius = (size - 10) / 2;
const circumference = 2 * Math.PI * radius;
const offset = circumference - (progress / 100) * circumference;
const gradientId = border === "green" ? "grad1" : "grad2";

return (
  <div className={`relative ${otherStyles} flex flex-col items-center`}>
    <div className='relative' style={{ width: size, height: size }}>
      <svg
        className="transform rotate-90"
        width={size}
        height={size}
      >
       <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#3e3dc7", stopOpacity: 1 }} />
            <stop offset="25%" style={{ stopColor: "#00bcb5", stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "#009ed7", stopOpacity: 1 }} />
            <stop offset="75%" style={{ stopColor: "#0078e7", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#84d3a2", stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#8686ff", stopOpacity: 1 }} />
              <stop offset="25%" style={{ stopColor: "#7871f6", stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: "#6b5ced", stopOpacity: 1 }} />
              <stop offset="75%" style={{ stopColor: "#6045e2", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#562ad7", stopOpacity: 1 }} />
            </linearGradient>
        </defs> 
        
  
        <circle
          className="text-gray-700"
          strokeWidth="5"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke={`url(#${gradientId})`}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className='absolute top-[10px] inset-0 flex items-start justify-center'>
        <img width={22} src={icon} alt="" />
      </div>
    </div>
    <div className="mt-2 text-center">
      <div className="text-primary-text text-[10px] font-normal">{title}</div>
      <div className=" text-secondary-text text-[10px] text-nowrap">MAE <span className="text-primary-text">{MAE}</span></div>
    </div>
  </div>
);
};

export default ProgressCircle;