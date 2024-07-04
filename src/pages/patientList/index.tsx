/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table , NumberBox } from "@/components";
// import NumberBox from "@/components/numberBox/numberBox";
import { useSelector } from "react-redux";
import { Outlet } from 'react-router-dom';

const PatientList = () => {
    const theme = useSelector((state: any) => state.theme.value.name)
    return (
        <>
        <div className="bg-black-background w-full h-screen px-8" >
            <div className={"py-5 space-y-5"}>
                <h1 className={"text-base text-primary-text font-medium"}>General Report</h1>
                <div className={"flex  items-center md:gap-0 gap-5 justify-between md:flex-row flex-col"}>
                    <NumberBox theme={theme}/>
                    <NumberBox theme={theme}/>
                    <NumberBox theme={theme}/>
                    <NumberBox theme={theme}/>
                </div>
            </div>            
            <Table></Table>
            <Outlet /> 
        </div>
        </>
    )
}

export default PatientList;