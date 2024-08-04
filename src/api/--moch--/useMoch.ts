import Api from "./api"

import patients from  './data/patients.json'
import reports from './data/reports.json'
import biomarkers from './data/biomarkers.json'

const useMoch = () => {
    Api.post("/login",{
        token:"ebdsjcdkosoqe3r4gnfvnwoe2g94nvsjka23f0vslvnsk39jsncje239"
    })
    Api.post("/getPatient",patients)    

    Api.post("/getreports",reports)
    Api.post("/getBiomarkers" , biomarkers )
}

export default useMoch