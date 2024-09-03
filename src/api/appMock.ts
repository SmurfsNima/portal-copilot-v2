import Api from "./mockApi";

class ApplicationMock extends Api {
  static getReports() {
    const response = this.post("/getreports", {});
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
}

export default ApplicationMock