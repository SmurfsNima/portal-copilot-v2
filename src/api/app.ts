import Api from "./api"

class Application extends Api {
    static getPatients() {
        const response = this.post('/getPatient',{})
        return response
    }          

    static getReports() {
        const response = this.post("/getreports",{})
        return response
    }
}

export default Application