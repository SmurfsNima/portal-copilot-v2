import {  PationtInformation, biomarker, diagnosis} from "@/types";

class Pationt {
    private biomarkers: biomarker[] = []
    private diagnosis: diagnosis[] = []
    constructor(public information:PationtInformation    ){

    }
    public setBiomarkers(biomarkers:biomarker[]){
        this.biomarkers = biomarkers
    }
    public getBiomarkers(){
        return this.biomarkers
    }
    public setDiagnosis(diagnosis: diagnosis[]){
        this.diagnosis = diagnosis
    }
    public getDiagnosis(){
        return this.diagnosis
    }
   


}

export default Pationt;