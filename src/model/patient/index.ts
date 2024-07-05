interface PationtInformation {
    name:string
    memberId:string
    age:number
    sex:'Male'|'Female'
    weight:number
    enroll:string,
    state:'Stable'|'Critical'|'Moderate'
    followUp:string
    heartRate:string
    pressure:string
    temperature:string
    oxygen:string
    respiration:string
    last:string
}

class Pationt {
    constructor(public information?:PationtInformation){

    }
}

export default Pationt