interface PationtInformation {
  name: string;
  photo: string;
  member_id: number;
  age: number;
  sex: "male" | "female";
  // weight : number ,
  status: "critical" | "normal" | "at-risk";
  enroll_date: string;
  last_followup: string;
  biomarkers: biomarker[];
  // status:'normal'|'low'|'high'

  // heart_rate:string
  // pressure:string
  // tempreture:string
  // oxygen:string
  // respiration_rate:string
}
export interface Measurement {
  date: string;
  value: number | {
    value?:number
  status?: "low" | "normal" | "high";
  Low?: number;
  High?: number;
  }
}
interface biomarker {
  [key: string]: Measurement[];
}
// interface Biomarkers {
//   blood_oxygen?: Measurement[];
//   blood_pressure?: Measurement[];
//   heart_rate?: Measurement[];
//   temperature?: Measurement[];
// }

export type { PationtInformation, biomarker };
