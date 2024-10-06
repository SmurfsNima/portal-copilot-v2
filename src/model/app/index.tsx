interface ClientReports {
    memberId:string
    treatmentPlanId:string
}
class Application {
    public clientsReport:Array<ClientReports> = []
    constructor() {
        if(localStorage.getItem("treatmentPalnId")){
            this.clientsReport = JSON.parse(localStorage.getItem("treatmentPalnId") as string)
        }
    }
    public addTreatmentPlanID (memberID:string,treatmentPlanId:string) {
        this.clientsReport.push({
            memberId:memberID,
            treatmentPlanId:treatmentPlanId
        })
        this.syncTolocal()
    }

    public getTreatmentPlanId(memberId:string){
        if(this.clientsReport.map((el) => el.memberId).includes(memberId)){
            return this.clientsReport.filter(el =>el.memberId == memberId)[0].treatmentPlanId
        }
    }

    public syncTolocal() {
        localStorage.setItem("treatmentPalnId",JSON.stringify(this.clientsReport))
    }
}

export default Application