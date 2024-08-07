
import { BiomarkerEntry , BiomarkerCategory , ChartDataItem , diagnosis } from "@/types"
const resolveRespiration = (respiration:string) => {
    const respirationValue = Number(respiration)
    if(respirationValue> 50){
        return 'normal'
    }
    if(respirationValue>30 && respirationValue<=50){
        return 'at-risk'
    }
    if(respirationValue<=30){
        return 'critical'
    }    
    return 'critical'
}
const getStatusBgColorClass = (
  status: string,
  currentStatus: string
): string => {
  if (status.toLowerCase() === currentStatus.toLowerCase()) {
    switch (status.toLowerCase()) {
      case "high":
        return "bg-red-status text-black";
      case "low":
        return "bg-brand-primary-color text-black";
      case "medium":
        return "bg-orange-status  text-black";
      default:
        return "bg-black-secondary";
    }
  }
  return "bg-black-secondary";
};
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short'
    });
  };
  const extractBiomarkerData = (biomarker: BiomarkerEntry[]): {
    dates: string[];
    values: number[] | { Low: number[]; High: number[] };
    status: string;
  } => {
    const dates = biomarker.flatMap(entry => entry.date.map(formatDate));
    const hasHighLow = biomarker.some(entry => entry.value.high && entry.value.low);
  
    const values = hasHighLow
      ? {
          Low: biomarker.flatMap(entry => entry.value.low || []),
          High: biomarker.flatMap(entry => entry.value.high || [])
        }
      : biomarker.flatMap(entry => entry.value.value || []);
  
    const status = biomarker[0]?.value.status || "";
  
    return { dates, values, status };
  };
  
   const prepareChartData = (biomarkers: BiomarkerCategory[]): ChartDataItem[] => {
    return biomarkers.flatMap(biomarkerObject =>
      Object.entries(biomarkerObject).map(([key, biomarkerData]) => {
        const { dates, values, status } = extractBiomarkerData(biomarkerData);
        const avgValue = Array.isArray(values) ? (values.reduce((a, b) => a + b, 0) / values.length) : (values.Low.length + values.High.length) / 2;
  
        return {
          type: key.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase()),
          value: avgValue,
          isMeasured: Array.isArray(values) ? values.length > 0 : values.Low.length > 0 && values.High.length > 0,
          status,
          otherTypes: [],
          chartData: { dates, values }
        };
      })
    );
  };
  export const prepareDiagnosisData = (diagnosis: diagnosis[])=> {
    return diagnosis.map(diag => {

   
      return {
        ...diag,
        
      };
    });
  };
export {resolveRespiration , getStatusBgColorClass , prepareChartData}