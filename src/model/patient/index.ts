import {  PationtInformation, biomarker} from "@/types";

class Pationt {
    private biomarkers: biomarker[] = []
    constructor(public information:PationtInformation    ){

    }
    public setBiomarkers(biomarkers:biomarker[]){
        this.biomarkers = biomarkers
    }
    public getBiomarkers(){
        return this.biomarkers
    }
   


}

export default Pationt;