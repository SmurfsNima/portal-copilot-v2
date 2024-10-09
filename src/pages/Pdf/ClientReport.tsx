import { Application } from "@/api"
import ClientReport from "@/components/Pdf/ClientReport"
// import ClinicReport from "@/components/Pdf/ClinicReport"
import { useConstructor } from "@/help"
import { PDFViewer } from "@react-pdf/renderer"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { BeatLoader } from "react-spinners"
// import data from '../../components/Pdf/data.json'
const ClientReportPage = () => {
    const {id} = useParams()
    const [data,setData] = useState(null)
    useConstructor(() => {
        Application.downloadReport({
                treatment_plan_id:id
            }).then((res) => {
                setData(res.data)
        })
    })
    return (
        <>
            <div className="h-[100vh]">
                {data!=null ?
                    <PDFViewer className="w-full h-full">
                         <ClientReport  values={data}></ClientReport>
                    </PDFViewer>
                    // <BlobProvider              
                    //     document={<ClientReport values={data} />}
                    // >
                    //      {({ loading }) =>
                    //         loading ? "Loading document..." :
                    //             <PDFViewer height={"100%"} width={'100%'}>
                    //                 <ClientReport  values={data}></ClientReport>
                    //             </PDFViewer>
                    //          }

                    // </BlobProvider>
                :
                <div className="w-full h-screen flex justify-center items-center">
                    <BeatLoader color="blue"></BeatLoader>
                </div>
                }
            </div>
        </>
    )
}

export default ClientReportPage