interface PationtInformation {
    id:string
    name:string
    photo:string
    memberId:string
    age:number
    sex:'Male'|'Female'
    weight:number
    enroll:string,
    state:'Normal'|'Critical'|'At-Risk'
    followUp:string
    heartRate:string
    pressure:string
    temperature:string
    oxygen:string
    respiration:string
    last:string
}

export type {
    PationtInformation
}