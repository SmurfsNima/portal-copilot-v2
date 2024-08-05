import Api from "./api";

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
    const response = this.post("/getBiomarkers", {}); // Assuming a POST request similar to others
    return response;
  }

}

export default Application;
