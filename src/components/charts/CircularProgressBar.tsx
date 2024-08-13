import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
interface CircularProgressBarProps{
    percentage : number,  
}
const CircularProgressBar : React.FC<CircularProgressBarProps> = ({ percentage  }) => {
  return (
    <div className="flex items-center justify-center ">
      <div className="w-10 h-10 ">
      <svg style={{ height: 0 }}>
          <defs>
            <linearGradient id="gradientColors" gradientTransform="rotate(90)">
              <stop offset="0%" stopColor="#E742EB
" />
              <stop offset="100%" stopColor="#3D70F1
" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor: '#fff',
            pathColor:'url(#gradientColors)',
            trailColor: '#2D3748',
            textSize: '24px',
          })}
        />
      </div>
    </div>
  );
};

export default CircularProgressBar;