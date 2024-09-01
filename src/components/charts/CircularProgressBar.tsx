import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CircularProgressBarProps {
  percentage: number;
  size?: number;
  startColor?: string;
  endColor?: string;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  percentage,
  size = 40, 
  startColor = '#E742EB', 
  endColor = '#3D70F1', 
}) => {
  return (
    <div className="flex items-center justify-center">
      <div style={{ width: size, height: size }}>
        <svg style={{ height: 0 }}>
          <defs>
            <linearGradient id="gradientColors" gradientTransform="rotate(90)">
              <stop offset="0%" stopColor={startColor} />
              <stop offset="100%" stopColor={endColor} />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor: '#fff',
            pathColor: 'url(#gradientColors)',
            trailColor: '#2D3748',
            textSize: '24px',
          })}
        />
      </div>
    </div>
  );
};

export default CircularProgressBar;