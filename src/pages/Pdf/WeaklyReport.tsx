import { Application } from "@/api"
import { useConstructor } from "@/help"
import { PDFViewer } from "@react-pdf/renderer"
import { useState } from "react"
import { useParams } from "react-router-dom"
import WeaklyReportComponent from '@/components/Pdf/WeaklyReport';
import { BeatLoader } from "react-spinners"

const WeaklyReport =() => {
    const {reportId,memberId} = useParams()
    const [data,setData] = useState(null)
    const [isLoading,setisLoading] = useState(true)
    useConstructor(() => {
        Application.downloadReportForGenerate({
            member_id:memberId,
            report_id:reportId
        }).then(resovle => {
            console.log(resovle)
            setisLoading(false)
            setData(resovle.data)
        })
    })
    // 997866112777
    // 5940ffa98e
    return (
        <>
            <div className="h-[100vh]">
                {data!=null && !isLoading?
                    // <BlobProvider              
                    //     document={<WeaklyReportComponent values={data} />}
                    // >
                    //         {({ loading }) =>
                    //         loading ? "Loading document..." : 
                    //         <PDFViewer  height={"100%"} width={'100%'}>
                    //             <WeaklyReportComponent  values={data} ></WeaklyReportComponent>
                    //         </PDFViewer>

                    //         }
                    // </BlobProvider>
                    <PDFViewer className="w-full h-full">
                        <WeaklyReportComponent  values={data} ></WeaklyReportComponent>
                    </PDFViewer>
                :
                <div className="w-full h-screen flex justify-center items-center">
                    <BeatLoader color="blue"></BeatLoader>
                </div>
                }
            </div>        
        </>
    )
}

export default WeaklyReport