interface PationtInformation {
  name: string;
  picture: string;
  patinet_id : number
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
 interface BiomarkerValue {
  value: number | { value: number } | { Low: number; High: number };
}
 interface biomarker {
  information: {
    [key: string]: {
      status: string;
      value: BiomarkerValue;
    };
  };
}
// interface Biomarkers {
//   blood_oxygen?: Measurement[];
//   blood_pressure?: Measurement[];
//   heart_rate?: Measurement[];
//   temperature?: Measurement[];
// }
interface DiagnosisData {
  date: string[];
  value: {
    value: number[];
    status: "low" | "normal" | "high";
  };
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  diagnosis_date: string;
  patient_value: number;
  normal_range: number[];
  avg_age_group_value: number;
}


interface diagnosis {
  name: string,
  data: DiagnosisData

}

export type { PationtInformation, BiomarkerValue, biomarker , DiagnosisData , diagnosis };
