import { useEffect, useRef, useState } from "react";

const CircularProgressBar = ({
  size = 48,
  percentage = 0,
  percentageNum = 0,
  progressColor = "#FC5474",
  titleC = 'text',
  speed = 100,
  count = 6.5
}) => {
  const [progressValue, setProgressValue] = useState(0);
  const progressRef = useRef(null);

  useEffect(() => {
    let startValue = 0;

    const progress = setInterval(() => {
      startValue++;
      setProgressValue(startValue);

      if (startValue === percentage) {
        clearInterval(progress);
      }
    }, speed);

    return () => clearInterval(progress);
  }, [percentage, speed]);

  const progressStyle = {
    background: percentage > 0 
      ? `conic-gradient(${progressColor} ${progressValue * 3.6}deg, rgba(34,139,34,0) ${progressValue * 3.6}deg)`
      : 'none', // No gradient when percentage is 0
  };

  return (
    <div
      ref={progressRef}
      className="relative flex justify-center items-center rounded-full"
      style={{ width: size, height: size, ...progressStyle }}
    >
      <div className="rounded-full bg-white border dark:border-none border-light-border-color dark:bg-[#333333] w-[90%] h-[90%] flex items-center justify-center flex-col gap-[1px]">
        <p className="text-[6px] h-[11px] text-light-primary-text dark:text-[#ffffff5e]">{`${titleC}`}</p>
        <p className="text-[10px]">
          {percentageNum === 200 ? null : `${percentageNum}%`} {count === 99 ? null : `${count} /10`}
        </p>
      </div>
    </div>
  );
};

export default CircularProgressBar;