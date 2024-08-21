import Api from "./api"

import patients from  './data/patients.json'
import reports from './data/reports.json'
import biomarkers from './data/biomarkers.json'
import Allbiomarkers from './data/Allbiomarkers.json'
import diagnosis from './data/diagnosis.json'
import graphData from './data/graphData.json'
const useMoch = () => {
    Api.post("/auth/token",{
        access_token:"ebdsjcdkosoqe3r4gnfvnwoe2g94nvsjka23f0vslvnsk39jsncje239"
    })
    Api.post("/patients",patients)    

    Api.post("/getreports",reports)
    Api.post("/getBiomarkers" , biomarkers)
    Api.post("/getAllBiomarkers" , Allbiomarkers)
    Api.post("/getDiagnosis" , diagnosis)
    Api.post("/graphData" , graphData)
};


export default useMoch