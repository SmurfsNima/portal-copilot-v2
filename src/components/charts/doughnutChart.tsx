import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  patientValue: number | undefined;
  normalRange: number[] | undefined;
  avgAgeGroupValue: number | undefined;
}

export const DoughnutChart: React.FC<DoughnutChartProps> = ({ patientValue, normalRange, avgAgeGroupValue }) => {
  // Set default values
  const defaultPatientValue = 0;
  const defaultNormalRange = [0, 100];
  const defaultAvgAgeGroupValue = 0;

  const data = {
    datasets: [
      {
        data: [avgAgeGroupValue ?? defaultAvgAgeGroupValue, 100 - (avgAgeGroupValue ?? defaultAvgAgeGroupValue)], // Avg Age Group
        backgroundColor: ['#7F39FB', '#383838'],
        borderWidth: 0,
        cutout: '80%',
        circumference: 360,
        rotation: 35,
        weight: 90,
      },
      {
        data: [normalRange ? normalRange[1] : defaultNormalRange[1], 100 - (normalRange ? normalRange[1] : defaultNormalRange[1])], // Normal Range
        backgroundColor: ['#03DAC5', '#383838'],
        borderWidth: 0,
        cutout: '60%',
        circumference: 360,
        rotation: 35,
        weight: 90,
      },
      {
        data: [patientValue ?? defaultPatientValue, 100 - (patientValue ?? defaultPatientValue)], // Patient Value
        backgroundColor: ['#FBAD37', '#383838'],
        borderWidth: 0,
        cutout: '45%',
        circumference: 360,
        rotation: 35,
        weight: 90,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutoutPercentage: 70,
  };

  return (
    <div className="relative flex gap-8 items-center">
      <div style={{ width: '109px', height: '110px' }}>
        <Doughnut data={data} options={options} />
      </div>
      <div className="mt-12 flex flex-col justify-start items-start">
        <div className="flex items-start justify-center mb-2 gap-3">
          <span className="w-3 h-3 bg-brand-secondary-color rounded-full"></span>
          <span className="text-secondary-text text-xs font-normal">Avg Age Group</span>
        </div>
        <div className="flex items-center justify-center mb-2 gap-3">
          <span className="w-3 h-3 bg-brand-primary-color rounded-full"></span>
          <span className="text-secondary-text text-xs font-normal">Normal Range</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <span className="w-3 h-3 bg-orange-status rounded-full"></span>
          <span className="text-secondary-text text-xs font-normal">Patient Value</span>
        </div>
      </div>
    </div>
  );
};