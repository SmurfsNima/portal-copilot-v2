import Api from "./api"

import patients from  './data/patients.json'

const useMoch = () => {
    Api.post("/login",{
        token:"ebdsjcdkosoqe3r4gnfvnwoe2g94nvsjka23f0vslvnsk39jsncje239"
    })
    Api.post("/getPatient",patients)    
}

export default useMoch