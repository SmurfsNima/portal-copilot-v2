import MethylationChart from "@/components/charts/MethylationChart"
import { useNavigate } from "react-router-dom";

const Historycaldata = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="w-full h-full px-6">
                <div className="w-[60px] mb-3">
                    <div onClick={() => {
                        navigate(-1)
                        // setisCreateReportMode(false)
                        // setShowGenerateButton(true)
                    }} className={`Aurora-tab-icon-container cursor-pointer h-[35px]`}>
                        <img className={`Aurora-icons-arrow-left`} />
                    </div>                   

                </div>
                <div className="w-full h-full bg-[#1E1E1E] p-8 border-[#383838] border rounded-[6px]">
                    <div className="text-[14px] text-[#FFFFFFDE] mb-8">‘Days Met Calories Target’ Historical Data</div>
                    <div className="w-full  bg-[#1E1E1E] p-8 border-[#383838] border rounded-[6px]">
                        <div className="mb-4 flex justify-start items-center gap-8">
                            <div className="text-[#FFFFFF99] text-[12px]">Average Value: <span className="font-semibold text-[14px] text-[#FFFFFFDE] ml-2">50</span></div>
                             <div className="text-[#FFFFFF99] text-[12px]">Current Value: <span className="font-semibold text-[14px] text-[#FFFFFFDE] ml-2">60</span></div>
                        </div>
                        <MethylationChart></MethylationChart>   

                    </div>

                </div>
            </div>
        </>
    )
}

export default Historycaldata