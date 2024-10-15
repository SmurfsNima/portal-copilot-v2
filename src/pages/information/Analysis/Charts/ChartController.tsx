import { useEffect, useState } from "react"
import StatusChart from "./StatusChart"
import OnGoingChart from "./OngoingChart"
import MethylationChart from "@/components/charts/MethylationChart"

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ChartControllerProps {
    data:any
    isGoing:boolean
    onGoingData:any
}


const ChartController:React.FC<ChartControllerProps> = ({
    data,
    isGoing,
    onGoingData
}) => {
    const [resolveData,setResolveData] = useState(data)
    console.log(data)
    useEffect(() => {
        console.log(data)
        setResolveData(data)
    }, [data])
    useEffect(() => {
        setActiveChart("")
    },[onGoingData])
    // const { id } = useParams<{ id: string }>();
    // const [onGoingData,setOnGoingData] = useState<any>({})
    const [isShowMore,setIsShowMore] = useState(false);
    const [avtiveChart,setActiveChart] = useState("")
    useEffect(() => {
        if(avtiveChart!=''){
            setIsShowMore(true)
        }else{
            setIsShowMore(false)
        }
    },[avtiveChart])
    return (
        <>
        <div className="w-full h-full max-h-[360px] gap-4 overflow-auto flex flex-wrap justify-start gap-x-[50px]  hidden-scrollBar">
            <>
                {isGoing ?
                    <>
                    {isShowMore ?
                    <>
                    <div className="w-full flex justify-between">
                        <div className="w-[330px] flex flex-col gap-4 overflow-y-scroll h-[350px]">
                        { Object.keys(onGoingData).length > 0 ?
                            <>
                                {
                                    Object.keys(onGoingData).map(el => {
                                        return (
                                            <>
                                                <OnGoingChart isActive={el == avtiveChart} onClick={() => {
                                                    setActiveChart(el)
                                                    // setIsShowMore(true)
        
                                                }} title={el} data={onGoingData[el]}></OnGoingChart>
                                            </>
                                        )
                                    })
                                }                            
                            </>
                        :undefined }
                        </div>
                        {
                            avtiveChart!= ''&&
                                <div className="w-[1090px] h-[350px] px-6">
                                    <div className="w-full h-[350px] border-light-border-color  dark:bg-[#1E1E1E] p-4 dark:border-[#383838] border rounded-[6px]">
                                        <div className="text-[14px] text-light-secandary-text dark:text-[#FFFFFFDE] mb-4">{avtiveChart}</div>
                                        <div className="w-full h-[250px] dark:bg-[#1E1E1E] p-4 border-light-border-color dark:border-[#383838] border rounded-[6px]">
                                            <div className="mb-4 flex justify-start items-center gap-8">
                                                <div className="dark:text-[#FFFFFF99]  text-light-primary-text text-[12px]">Average Value: <span className="font-semibold text-[14px] text-light-secandary-text dark:text-[#FFFFFFDE] ml-2">{onGoingData[avtiveChart].avg}</span></div>
                                                <div className="dark:text-[#FFFFFF99] text-light-primary-text text-[12px]">Current Value: <span className="font-semibold text-[14px]  text-light-secandary-text dark:text-[#FFFFFFDE] ml-2">{onGoingData[avtiveChart].current_value}</span></div>
                                            </div>
                                            <div>
                                                <MethylationChart values={onGoingData[avtiveChart].data.value} labels={onGoingData[avtiveChart].data.label}></MethylationChart>   

                                            </div>

                                        </div>

                                    </div>
                                </div>

                        }

                    </div>
                    </>
                    :
                    <>
                        { Object.keys(onGoingData).length > 0 ?
                            <>
                                {
                                    Object.keys(onGoingData).map(el => {
                                        return (
                                            <>
                                                <OnGoingChart onClick={() => {
                                                    setActiveChart(el)
                                                }} title={el} data={onGoingData[el]}></OnGoingChart>
                                            </>
                                        )
                                    })
                                }                            
                            </>
                        :undefined }
                    </>
                    }
                    </>
                :
                <>
                    {
                        resolveData.length > 0 ?
                        <>
                        {
                            Object.keys(resolveData[0]).map(el => {
                                return (
                                    <>
                                        <StatusChart title={el} data={resolveData[0][el][0]}></StatusChart>
                                    </>
                                )
                            })
                        }
                        </>
                        :undefined
                    }
                </>
                }
            </>

        </div>
        </>
    )
}

export default ChartController