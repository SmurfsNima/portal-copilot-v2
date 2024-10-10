/* eslint-disable @typescript-eslint/no-unused-vars */
import { Application } from "@/api"
import { useConstructor } from "@/help"
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"
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
                    <>
                        <PDFViewer className="w-full h-[100%]">
                            <WeaklyReportComponent  values={data} ></WeaklyReportComponent>
                        </PDFViewer>
                        {window.innerWidth<=600 &&
                            <PDFDownloadLink
                                className="absolute w-full top-0 right-0 z-20"
                                document={<WeaklyReportComponent values={data} />}
                                fileName="my-document.pdf"
                                style={{ textDecoration: 'none', color: 'blue' }}
                                >
                                    <div className="w-full rounded-lg flex justify-center items-center mt-2 mr-32 h-[40px] bg-white">
                                        <button className="w-full h-full flex justify-center items-center">download</button>

                                    </div>
                            </PDFDownloadLink>
                        }
                    </>
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