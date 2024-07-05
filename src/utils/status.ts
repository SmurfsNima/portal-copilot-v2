const resolveRespiration = (respiration:string) => {
    const respirationValue = Number(respiration)
    if(respirationValue> 50){
        return 'Normal'
    }
    if(respirationValue>30 && respirationValue<=50){
        return 'At-Risk'
    }
    if(respirationValue<=30){
        return 'Critical'
    }    
    return 'Critical'
}

export {resolveRespiration}