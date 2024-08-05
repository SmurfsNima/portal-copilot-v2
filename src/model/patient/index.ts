import { PationtInformation, biomarker, diagnosis } from "@/types";

class Pationt {
  private biomarkers: biomarker[] = [];
  private diagnosis: diagnosis[] = [];
  constructor(public information: PationtInformation) {}
  public setBiomarkers(biomarkers: biomarker[]) {
    this.biomarkers = biomarkers;
    this.updateInformationWithBiomarkers();
  }
  public getBiomarkers() {
    return this.biomarkers;
  }
  public setDiagnosis(diagnosis: diagnosis[]) {
    this.diagnosis = diagnosis;
  }
  public getDiagnosis() {
    return this.diagnosis;
  }

 
  private updateInformationWithBiomarkers() {
    console.log(this.biomarkers);

    const biomarkerMapping: { [key: string]: keyof PationtInformation } = {
      "Heart Rate": "heart_rate",
      "Blood Pressure": "blood_pressure",
      "Temperature": "temperatue",
      "Oxygen Saturation": "blood_oxygen",
      "Respiration Rate": "respiration_rate",
    };

    this.biomarkers.forEach((bio) => {
      const biomarkerName = Object.keys(bio.information)[0];
      const biomarkerDetails = bio.information[biomarkerName];
      const biomarkerData = biomarkerDetails.value;

      console.log("biomarkerName:", biomarkerName, "biomarkerData:", biomarkerData);

      let outerValue;
      if (typeof biomarkerData === 'object' && biomarkerData !== null) {
        outerValue = 'value' in biomarkerData ? biomarkerData.value : biomarkerData;
      } else {
        outerValue = biomarkerData;
      }

      if (outerValue !== undefined) {
        const fieldName = biomarkerMapping[biomarkerName];
        if (fieldName) {
          if (typeof outerValue === 'object' && 'Low' in outerValue && 'High' in outerValue) {
            (this.information as any)[fieldName] = `${outerValue.Low}/${outerValue.High}`;
          } else if (typeof outerValue === 'number') {
            (this.information as any)[fieldName] = outerValue;
          } else if (typeof outerValue === 'object' && 'value' in outerValue) {
            (this.information as any)[fieldName] = outerValue.value;
          }
        }
      }
    });
  }
}


export default Pationt;
