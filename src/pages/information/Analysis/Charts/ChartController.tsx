import { useEffect, useState } from "react"
import StatusChart from "./StatusChart"
import OnGoingChart from "./OngoingChart"

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
    // const { id } = useParams<{ id: string }>();
    // const [onGoingData,setOnGoingData] = useState<any>({})
 
    return (
        <>
        <div className="w-full h-full max-h-[360px] gap-4 overflow-auto flex flex-wrap justify-start gap-x-[50px]  hidden-scrollBar">
            <>
                {isGoing ?
                    <>
                        { Object.keys(onGoingData).length > 0 ?
                            <>
                                {
                                    Object.keys(onGoingData).map(el => {
                                        return (
                                            <>
                                                <OnGoingChart title={el} data={onGoingData[el]}></OnGoingChart>
                                            </>
                                        )
                                    })
                                }                            
                            </>
                        :undefined }
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