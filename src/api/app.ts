import Api from "./api"

class Application extends Api {
    static getPatients() {
        const response = this.post('/getPatient',{})
        return response
    }          
}

export default Application