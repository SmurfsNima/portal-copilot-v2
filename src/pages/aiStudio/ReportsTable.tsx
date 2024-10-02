/* eslint-disable @typescript-eslint/no-explicit-any */

interface ReportTableProps {
    data:Array<any>
}
const ReportTable:React.FC<ReportTableProps> = ({
    data
}) => {
    return (
        <>
            <div className=" bg-[#383838] px-4 rounded-[6px]">
                <div className="flex justify-start items-center">
                    <div className="text-[#FFFFFFDE] py-5 w-[250px] text-[14px]">Report Title</div>
                    <div className="text-[#FFFFFFDE] py-5 w-[400px] flex items-center justify-center text-[14px]">Create on</div>
                    <div className="text-[#FFFFFFDE] py-5 w-[330px] flex items-center justify-end pr-10 text-[14px]">Action</div>
                </div>
                <div className=" border-black-third  border"></div>
                <div className="h-[35vh] overflow-y-scroll">
                    {data.map((el) => {
                        return (
                            <>
                                <div className="flex justify-start items-center">
                                    <div className="text-[#FFFFFFDE] py-2 w-[250px] text-[12px]">{el.Title}</div>
                                    <div className="text-[#FFFFFFDE] py-2 w-[400px] flex justify-center items-center text-[12px]">{el["Created Date"]}</div>
                                </div>
                                <div className=" border-black-third  border"></div>
                            </>
                        )
                    })}

                </div>
            </div>
        </>
    )
}

export default ReportTable