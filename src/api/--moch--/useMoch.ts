import Api from "./api"

import patients from  './data/patients.json'
import reports from './data/reports.json'
import biomarkers from './data/biomarkers.json'
import Allbiomarkers from './data/Allbiomarkers.json'
import AllBloodtests from './data/AllBloodtests.json'
import diagnosis from './data/diagnosis.json'
import graphData from './data/graphData.json'
import actionPlan  from "./data/actionPlan.json"
import Allactivities from './data/Allactivities.json'
const useMoch = () => {
    Api.post("/auth/token",{
        access_token:"ebdsjcdkosoqe3r4gnfvnwoe2g94nvsjka23f0vslvnsk39jsncje239"
    })
    // Api.post("/patients",patients)
    Api.get("/patients",patients)     

    Api.post("/getreports",reports)
    Api.get("/patients/allbiomarkers" , biomarkers)
    Api.post("/getAllBiomarkers" , Allbiomarkers)
    Api.post("/getAllBloodtests" , AllBloodtests)
    Api.post("/getAllactivities" , Allactivities)
    Api.post("/getDiagnosis" , diagnosis)
    Api.post("/graphData" , graphData)
    Api.post("/actionplan" , actionPlan)
};


export default useMoch