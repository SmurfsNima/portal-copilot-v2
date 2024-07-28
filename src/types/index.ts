interface PationtInformation {
  name: string;
  photo: string;
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

  biomarkers: biomarker[];
  // status:'normal'|'low'|'high'
}
interface Measurement {
  date: string;
  value:
    | number
    | {
        value?: number;
        status?: "low" | "normal" | "high";
        Low?: number;
        High?: number;
      };
}
// interface Biomarkers {
//   blood_oxygen?: Measurement[];
//   blood_pressure?: Measurement[];
//   heart_rate?: Measurement[];
//   temperature?: Measurement[];
//   respiration_rate?: Measurement[];
// }

interface biomarker {
  [key: string]: Measurement[];
}
// interface Biomarkers {
//   blood_oxygen?: Measurement[];
//   blood_pressure?: Measurement[];
//   heart_rate?: Measurement[];
//   temperature?: Measurement[];
// }

export type { PationtInformation, Measurement, biomarker };
