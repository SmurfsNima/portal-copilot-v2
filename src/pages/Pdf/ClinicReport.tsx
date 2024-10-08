import { Application } from "@/api"
import ClinicReport from "@/components/Pdf/ClinicReport"
import { useConstructor } from "@/help"
import { BlobProvider, PDFViewer } from "@react-pdf/renderer"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { BeatLoader } from "react-spinners"
// import data from '../../components/Pdf/data.json'
const ClinicReportPage = () => {
    const {id} = useParams()
    const [data,setData] = useState(null)
    useConstructor(() => {
        Application.downloadClinicReport({
                treatment_plan_id:id
            }).then((res) => {
                setData(res.data)
        })
    })
    return (
        <>
            <div className="h-[100vh]">
                {data!=null ?
                    <BlobProvider              
                        document={<ClinicReport values={data} />}
                    >
                         {({ loading }) =>
                            loading ? "Loading document..." :
                                <PDFViewer height={"100%"} width={'100%'}>
                                    <ClinicReport  values={data}></ClinicReport>
                                </PDFViewer>
                             }

                    </BlobProvider>
                :
                <div className="w-full h-screen flex justify-center items-center">
                    <BeatLoader color="blue"></BeatLoader>
                </div>
                }
            </div>
        </>
    )
}

export default ClinicReportPage