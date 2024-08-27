import React, { useEffect, useRef } from "react";

interface HalfCycleProps {
  percentage: number;
}

const HalfCycle: React.FC<HalfCycleProps> = ({ percentage }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const $bar = barRef.current!;
    const $val = spanRef.current!;
    const perc = percentage;

    const animation = { p: 0 };

    const step = () => {
      animation.p += (perc - animation.p) * 0.1;
      const progressValue = Math.round(animation.p);
      $bar.style.transform = `rotate(${45 + progressValue * 1.8}deg)`;
      $val.textContent = `${progressValue}%`;

      if (progressValue < perc) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [percentage]);

  return (
    <div className="relative  float-left text-center bg-[#ff] mt-[10px]">
      <div className="relative overflow-hidden w-[180px] h-[90px] -mb-[28px]">
        <div
          ref={barRef}
          className="absolute top-0 left-0 w-[180px] h-[180px] rounded-full box-border border-[16px] border-[#9191915e] border-b-[#03DAC5] border-r-[#03DAC5]"
        ></div>
      </div>
      <div className="flex items-center justify-center flex-col mt-[-3rem] ">

      <span ref={spanRef} className="text-lg font-bold">{percentage}%</span>
      <p className="text-[10px] text-[#ffffff5e]">Completed</p>
      </div>
    </div>
  );
};

export default HalfCycle;
