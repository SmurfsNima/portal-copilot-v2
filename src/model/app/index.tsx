type appInformation  = {
    pdfBase64String:string
}
class Application {
    // patients:Array<Pat>
    information:appInformation = {
        pdfBase64String:''
    }

    setReport() {

        this.syncToLocal()
    }

    getReport(){
        return this.information.pdfBase64String
    }
    getReportAsPdf() {
        
    }

    syncToLocal() {
        localStorage.setItem("applicationData",JSON.stringify(this.information))
    }
}

export default Application