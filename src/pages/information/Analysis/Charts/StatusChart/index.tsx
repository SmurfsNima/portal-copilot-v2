/* eslint-disable @typescript-eslint/no-explicit-any */
interface StatusChartProps {
    data:any,
    title:string
}
const StatusChart:React.FC<StatusChartProps> = ({data,title}) => {
    return (
        <>
            <div className="w-[315px] py-3 px-6 bg-black-primary border border-[#383838] h-[148px] rounded-[6px] flex justify-between">
                <div>
                    <div className="text-[#FFFFFFDE] text-[12px] h-[45px] w-[185px]">{title}</div>
                    <div className="flex justify-between w-[155px] items-center mt-4">
                        <div className="ml-4">
                            <div className="text-[#FFFFFF99] text-[12px] text-center font-light">Current</div>
                             <div className="text-[#FFFFFF99] text-[12px] font-light w-[120px] overflow-hidden h-[30px] mt-1 text-center">{data.value.current}</div>
                        </div>
                        {data.value.average!='null' &&
                            <div className="ml-4">
                                <div className="text-[#FFFFFF99] text-[12px] text-center font-light">Avg</div>
                                <div className="text-[#FFFFFF99] text-[12px] font-light mt-1 text-center">{data.value.average}</div>
                            </div>                        
                        }
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <div className={`${data.value.status == 'Excellent'?'visible':'invisible'}`}>
                            <div className="w-[8px] h-[8px] rounded-full bg-[#7F39FB]"></div>
                        </div>
                        <div className="bg-[#7F39FB] w-[8px] h-[27px] rounded-[27px] rounded-b-none"></div>
                        <div className="text-[#FFFFFF99] text-[8px]">Excellent</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`${data.value.status == 'Good'?'visible':'invisible'}`}>
                            <div className="w-[8px] h-[8px] rounded-full bg-[#03DAC5]"></div>
                        </div>
                        <div className="bg-[#03DAC5] w-[8px] h-[27px] rounded-[0px] "></div>
                        <div className="text-[#FFFFFF99] text-[8px]">Good</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`${data.value.status == 'Ok'?'visible':'invisible'}`}>
                            <div className="w-[8px] h-[8px] rounded-full bg-[#E8D284]"></div>
                        </div>
                        <div className="bg-[#E8D284] w-[8px] h-[27px] "></div>
                        <div className="text-[#FFFFFF99] text-[8px]">ok</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`${data.value.status == 'Needs Focus'?'visible':'invisible'}`}>
                            <div className="w-[8px] h-[8px] rounded-full bg-[#E2798E]"></div>
                        </div>
                        <div className="bg-[#E2798E] w-[8px] h-[27px] rounded-[27px] rounded-t-none"></div>
                        <div className="text-[#FFFFFF99] text-[8px]">Need Focus</div>
                    </div>                                                            
                </div>
            </div>
        </>
    )
}

export default StatusChart