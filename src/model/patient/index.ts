import { PationtInformation, Biomarkers } from "@/types";

class Pationt {
    private biomarkers: Biomarkers = {}
    constructor(public information:PationtInformation){

    }
    public setBiomarkers(biomarkers:Biomarkers){
        this.biomarkers = biomarkers
    }
    public getBiomarkers(){
        return this.biomarkers
    }

}

export default Pationt;