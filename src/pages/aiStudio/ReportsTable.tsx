/* eslint-disable @typescript-eslint/no-explicit-any */

import { Application } from "@/api"
import { useEffect } from "react";
import { Button } from "symphony-ui";
interface ReportTableProps {
    data:Array<any>
    memberId:number;
    onUpdate : ()=>Promise<void>
}
const ReportTable:React.FC<ReportTableProps> = ({
    data,memberId,onUpdate
}) => {

    const handleDownload = (value:any) => {
        const link = document.createElement('a');
        link.href =`data:application/pdf;base64,`+value;
        link.download = 'downloaded_file.pdf'; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };    
    useEffect(()=>console.log(data), [data]
    )
    return (
        <>
            <div className=" bg-[#383838] px-4 rounded-[6px]">
                <div className="flex justify-start items-center">
                    <div className="text-[#FFFFFFDE] py-5 w-[250px] text-[14px]">Report Title</div>
                    <div className="text-[#FFFFFFDE] py-5 w-[400px] flex items-center justify-center text-[14px]">Create on</div>
                    <div className="text-[#FFFFFFDE] py-5 w-[330px] flex items-center justify-end pr-10 text-[14px]">Action</div>
                    <Button onClick={onUpdate} theme="Aurora">Refresh</Button>
     
                </div>
                <div className=" border-black-third  border"></div>
                {data.length> 0
                &&
                <div className="h-[35vh] overflow-y-scroll">
                    {data.map((el) => {
                        return (
                            <>
                                <div className="flex justify-start items-center">
                                    <div className="text-[#FFFFFFDE] py-2 w-[250px] text-[12px]">{el.Title}</div>
                                    <div className="text-[#FFFFFFDE] py-2 w-[400px] flex justify-center items-center text-[12px]">{el["Created Date"]}</div>
                                    <div className="text-[#FFFFFFDE] py-2 w-[330px] gap-2 flex justify-end px-5 items-center text-[12px]">
                                        
                                        <img onClick={() => {
                                        Application.getReportString({
                                            member_id : memberId,
                                            report_id:el.report_id
                                        }).then(res => {
                                            handleDownload(res.data)
                                        })
                                        }} className="cursor-pointer" src={'./Themes/Aurora/icons/document-download3.svg'} />

                                        <img className="cursor-pointer"  src={"./Themes/Aurora/icons/share.svg"} />

                                        <img className="cursor-pointer" src={"./Themes/Aurora/icons/edit4.svg"} />
                                    </div>
                                </div>
                                <div className=" border-black-third  border">
                                </div>
                            </>
                        )
                    })}

                </div>
                }
            </div>
        </>
    )
}

export default ReportTable