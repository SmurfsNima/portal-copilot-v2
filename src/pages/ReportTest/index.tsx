import { PDFViewer } from "@react-pdf/renderer"
import  Data from './data.json'
import ClinicReport from "@/components/Pdf/ClinicReport"

const ResportTest =() => {
    return (
        <>
        <div className="w-full h-[100vh]">
            <PDFViewer className="w-full h-full">
                <ClinicReport  values={Data} ></ClinicReport>
            </PDFViewer>

        </div>
        </>
    )
}

export default ResportTest