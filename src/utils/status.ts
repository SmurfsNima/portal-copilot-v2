const resolveRespiration = (respiration:string) => {
    const respirationValue = Number(respiration)
    if(respirationValue> 50){
        return 'normal'
    }
    if(respirationValue>30 && respirationValue<=50){
        return 'at-risk'
    }
    if(respirationValue<=30){
        return 'critical'
    }    
    return 'critical'
}

export {resolveRespiration}