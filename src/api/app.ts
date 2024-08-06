import Api from "./api";
import allBiomarkers from './--moch--/data/Allbiomarkers.json';

class Application extends Api {
  static getPatients() {
    const response = this.post("/getPatient", {});
    return response;
  }

  static getReports() {
    const response = this.post("/getreports", {});
    return response;
  }
  static getBiomarkers() {
    const response = this.post("/getBiomarkers", {}); 
    return response;
  }
  static getDiagnosis() {
    const response = this.post("/getDiagnosis", {}); 
    return response;
  }
  static getAllBiomarkers() {
    const response = this.post("/getAllBiomarkers", {});
    return response;
  }
  static getBiomarkersByPatientId(patient_id: number) {
    const patient = allBiomarkers.find(p => p.patient_id === patient_id);
    if (patient) {
      return { data: patient.biomarkers };
    } else {
      return { data: [] };
    }
  }
}



export default Application;
