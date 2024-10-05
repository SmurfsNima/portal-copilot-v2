import ClinicReport from "@/components/Pdf/ClinicReport"
import { PDFViewer } from "@react-pdf/renderer"

const PDFRender = () => {
    return (
        <>
            <div className="h-[100vh]">
                <PDFViewer height={"100%"} width={'100%'}>
                    <ClinicReport></ClinicReport>
                </PDFViewer>

            </div>
        </>
    )
}

export default PDFRender