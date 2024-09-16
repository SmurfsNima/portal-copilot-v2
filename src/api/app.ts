/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "./api";
// import allBiomarkers from './--moch--/data/Allbiomarkers.json';
import AllBloodtests from './--moch--/data/AllBloodtests.json'
// import Allactivities from './--moch--/data/Allactivities.json'
class Application extends Api {
  static getPatients() {
    const response = this.get("/patients");
    return response;
  }

  static addDataEntery(data:any) {
    return this.post('/data_entry/',data)
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
  static getBiomarkersByPatientId(member_id: number) {
    const response = Api.get('/patients/'+member_id+'/biomarkers')
    return response
    // const patient = allBiomarkers.find(p => p.patient_id === patient_id);
    // if (patient) {
    //   return { data: patient.biomarkers };
    // } else {
    //   return { data: [] };
    // }
  }
  static getActivityByPatientId(member_id: number) {
    const response = Api.get('/patients/'+member_id+'/analysis/activity')
    return response
    // const patient = Allactivities.find(p => p.patient_id === patient_id);
    // if (patient) {
    //   return { data: patient.activities };
    // } else {
    //   return { data: [] };
    // }
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
static getAppoinments(patient_id: number){
  const response =  this.get(`/patients/`+patient_id+`/overview/appointments`)
  return response
}
static getSummary(member_id: number){
  const response =  this.get(`/summary/${member_id}`)
  return response
}
}




export default Application;
