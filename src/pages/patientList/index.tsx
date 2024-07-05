/* eslint-disable @typescript-eslint/no-explicit-any */
import { Application } from "@/api";
import { Table , NumberBox } from "@/components";
import { useConstructor } from "@/help";
import { Pationt } from "@/model";
import { useState } from "react";
// import NumberBox from "@/components/numberBox/numberBox";
import { useSelector } from "react-redux";
import { Outlet } from 'react-router-dom';

const PatientList = () => {
    const theme = useSelector((state: any) => state.theme.value.name)
    const [patients,setPatients] = useState<Array<Pationt>>([])
    useConstructor(() => {
        Application.getPatients().then(res => {
            console.log(res)
            const resolved = res.data.map((el:any) => {
                return new Pationt({...el})
            })
            setPatients(resolved)
        })
    })
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
            <Table classData={patients}></Table>
            <Outlet /> 
        </div>
        </>
    )
}

export default PatientList;