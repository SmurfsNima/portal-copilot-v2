
import React from "react";
interface ProgressCircleProps {
    progress: number;
  }
  const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress }) => {
  const circleRadius = 50;
  const circleCircumference = 2 * Math.PI * circleRadius;

  const progressOffset = circleCircumference - (progress / 100) * circleCircumference;

  return (
    <div className="flex justify-center items-center ">
   
      <svg className="w-32 h-32">
        <circle
          className="text-main-border"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          r={circleRadius}
          cx="50%"
          cy="50%"
        />
        <circle
          className="text-brand-primary-color"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          r={circleRadius}
          cx="50%"
          cy="50%"
          style={{
            strokeDasharray: circleCircumference,
            strokeDashoffset: progressOffset,
            transition: 'stroke-dashoffset 0.35s',
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        />
        <text
          x="50%"
          y="40%"
          textAnchor="middle"
          dy=".3em"
          style={{fill : '#03DAC5'}}
          className="text-2xl font-bold  "
        >
          {`${progress}%`}
        </text>
        <text
          x="50%"
          y="60%"
          textAnchor="middle"
          dy=".3em"
          style={{fill : '#F5F5FA'}}
          className="text-xs font-normal"
        >
          Progress
        </text>
      </svg>
      </div>
   
  );
};

export default ProgressCircle;