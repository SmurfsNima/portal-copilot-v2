interface PationtInformation {
  name: string;
  picture: string;
  patient_id : number
  member_id: number;
  age: number;
  sex: "male" | "female";
  weight: number;
  status: "critical" | "normal" | "at-risk";
  enroll_date: string;
  last_followup: string;
  heart_rate: number;
  blood_pressure: number;
  temperatue: number;
  blood_oxygen: number;
  respiration_rate: string;
  score: number,
  progress: number,
  conditions : string[]

  // biomarkers: biomarker[];
  // diagnosis : diagnosis[]
  // status:'normal'|'low'|'high'
}
// interface Measurement {
//   date: string;
//   value:
//     | number
//     | {
//         value?: number;
//         status?: "low" | "normal" | "high";
//         Low?: number;
//         High?: number;
//       };
// }
// interface Biomarkers {
//   blood_oxygen?: Measurement[];
//   blood_pressure?: Measurement[];
//   heart_rate?: Measurement[];
//   temperature?: Measurement[];
//   respiration_rate?: Measurement[];
// }


 interface biomarker {
  information: {
    [key: string]: {
      status: string;
      value: BiomarkerValue;
    };
  };
}
interface BiomarkerValue {
  high?: number[];
  low?: number[];
  value?: number[];
  status: string;
}
// interface Biomarkers {
//   blood_oxygen?: Measurement[];
//   blood_pressure?: Measurement[];
//   heart_rate?: Measurement[];
//   temperature?: Measurement[];
// }
interface ChartDataItem {
  type: string;
  value: number;
  isMeasured: boolean;
  status: string;
  otherTypes: string[];
  chartData: {
    dates: string[];
    values: number[] | { Low: number[]; High: number[] };
  };
}
interface BiomarkerEntry {
  value: BiomarkerValue;
  date: string[];
  activity: boolean[];
}
interface BiomarkerCategory {
  [key: string]: BiomarkerEntry[];
}
interface Data {
  type: string;
  severity: string;
  diagnosis_date: string;
  patient_value: number;
  normal_range: number[];
  avg_age_group_value: number;
  date: string[];
  value: {
    value : number[],
    status : string;
  };
}

interface diagnosis {
  information:{
    name: string;
    data: Data;
  }

}
interface Checkin {
  date: string;
  status: boolean;
}

interface Task {
  how: string;
  why: string;
  tags: string[];
  notes: string;
  status: string;
  task_id: string;
  end_date: string;
  biomarker: string;
  task_name: string;
  start_date: string;
  description: string;
  time_of_day: string;
  alternatives: string[];
  scheduled_days: number[];
  duration_minutes: number;
  priority_actions: string;
  frequency_per_week: number;
}

interface Category {
  tasks: Task[];
  category_name: string;
}

interface WeeklyPlan {
  categories: Category[];
  week_number: number;
}

interface MonthlyPlan {
  weekly_plan: WeeklyPlan[];
  high_level_summary: string;
  key_areas_of_focus: string;
}

interface PlanInfo {
  monthly_plan: MonthlyPlan;
}

 interface actionPlan {
  a_id: number;
  a_p_name: string;
  a_p_start_date: string;
  a_p_end_date: string;
  checkin: Checkin[];
  plan_info: PlanInfo;
}

export type { PationtInformation, BiomarkerValue, biomarker , BiomarkerEntry  , BiomarkerCategory ,  ChartDataItem  , diagnosis , actionPlan  };
