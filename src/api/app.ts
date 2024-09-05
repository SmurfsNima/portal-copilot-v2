/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "./api";
import allBiomarkers from './--moch--/data/Allbiomarkers.json';
import AllBloodtests from './--moch--/data/AllBloodtests.json'
class Application extends Api {
  static getPatients() {
    const response = this.get("/patients");
    return response;
  }

  static getReports() {
    const response = this.post("/getreports", {});
    return response;
  }
  static getBiomarkers() {
    const response = this.get("/patients/allbiomarkers"); 
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
  static getBloodTest() {
    const response = this.post("/getBloodTest", {});
    return response;
  }
  static getgraphData() {
    const response = this.post("/graphData", {});
    return response;
  }
  static getActionPLan() {
    const response = this.post("/actionplan", {});
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
  static getBloodTestByPatientId(patient_id: number) {
    const patient = AllBloodtests.find(p => p.patient_id === patient_id);
    if (patient) {
      return { data: patient.bloodTests };
    } else {
      return { data: [] };
    }
  }

  static addClient(data:any){
    const response = this.post("/patients/add_patient",data)
    return response
  }
}



export default Application;
