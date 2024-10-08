import { Application } from "@/api"
import ClinicReport from "@/components/Pdf/ClinicReport"
import { useConstructor } from "@/help"
import { PDFViewer } from "@react-pdf/renderer"
import { useState } from "react"
import { useParams } from "react-router-dom"
// import data from '../../components/Pdf/data.json'
const PDFRender = () => {
    const {id,type} = useParams()
    const [data,setData] = useState(null)
    console.log(type)
    useConstructor(() => {
        if(type == 'clinic'){
            Application.downloadClinicReport({
                treatment_plan_id:id
            }).then((res) => {
                setData(res.data)
            })
        }
        if(type =='client'){
            Application.downloadReport({
                treatment_plan_id:id
            }).then((res) => {
                setData(res.data)
            })            
        }
    })
    return (
        <>
            <div className="h-[100vh]">
                {data!=null ?
                    <PDFViewer height={"100%"} width={'100%'}>
                        <ClinicReport values={data}></ClinicReport>
                    </PDFViewer>
                :
                undefined
                }
            </div>
        </>
    )
}

export default PDFRender