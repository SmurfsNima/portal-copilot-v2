import { useEffect, useState } from "react"
import StatusChart from "./StatusChart"

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ChartControllerProps {
    data:any
}


const ChartController:React.FC<ChartControllerProps> = ({
    data
}) => {
    const [resolveData,setResolveData] = useState(data)
    console.log(data)
    useEffect(() => {
        console.log(data)
        setResolveData(data)
    }, [data])
    return (
        <>
        <div className="w-full h-full max-h-[360px] gap-4 overflow-auto flex flex-wrap justify-start gap-x-[50px]  hidden-scrollBar">
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

        </div>
        </>
    )
}

export default ChartController