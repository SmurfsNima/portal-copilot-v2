/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivityMenu, InfoCard, SearchBox, StatusMenu } from "@/components"
import { useEffect, useState } from "react"
import { useBiomarkers } from "@/hooks"
import ChartController from "./Charts/ChartController"
import { Application } from "@/api"
import { useParams } from "react-router-dom"
type MenuNames = 'All' | 'Blood Test'|'Ongoing'| 'Activity' | 'Client Profile' | "Weekly report"|"Fitness"|"Physiological" |"Emotional"
type menuItem  = {
    name:MenuNames
}


const Analysis = () => {
    const menus:Array<menuItem> = [
        {name :'All' },
        {name :'Fitness' },
        {name :'Physiological' },
        {name :'Emotional' },
        {name:"Ongoing"}
    ]    
    const [avtiveMenu,setActiveMenu] = useState<MenuNames>(menus[0].name)
    const [search,setSearch] =useState<string>("")
    const [activeStatus,setActiveStatus] = useState("All");
    const analyseData = useBiomarkers();
    const [onGoingData,setOnGoingData] = useState<any>({})
    const { id } = useParams<{ id: string }>();
    const [filteredData,setFilteredData] = useState<any>([])
    const updateCategory = () => {
        const filteredResults:any = {};

        // Since data is an array of objects, we access the first object using data[0]
        const entries = analyseData[0]; // Single object inside the array

        for (const key in entries) {
            if(activeStatus == 'All') {
                if(search == ''){
                    if (entries[key][0].category === avtiveMenu) {
                        filteredResults[key] = entries[key]; // Add to filtered results if category matches
                    }
                }else {
                    if (entries[key][0].category === avtiveMenu && key.toUpperCase().includes(search.toUpperCase())) {
                        filteredResults[key] = entries[key]; // Add to filtered results if category matches
                    }                
                }
            }else {
                if(search == ''){
                    if (entries[key][0].category === avtiveMenu && entries[key][0].value.status == activeStatus) {
                        filteredResults[key] = entries[key]; // Add to filtered results if category matches
                    }
                }else {
                    if (entries[key][0].category === avtiveMenu && key.toUpperCase().includes(search.toUpperCase()) && entries[key][0].value.status == activeStatus) {
                        filteredResults[key] = entries[key]; // Add to filtered results if category matches
                    }                
                }                
            }
        }

        return filteredResults;        
    }       
    const updateSearch = () => {
        const filteredResults:any = {};

        // Since data is an array of objects, we access the first object using data[0]
        const entries = analyseData[0]; // Single object inside the array

        for (const key in entries) {
            if(activeStatus == 'All'){
                if (key.toUpperCase().includes(search.toUpperCase())) {
                    filteredResults[key] = entries[key]; // Add to filtered results if category matches
                }                
            }else {
                if (key.toUpperCase().includes(search.toUpperCase()) && entries[key][0].value.status == activeStatus) {
                    filteredResults[key] = entries[key]; // Add to filtered results if category matches
                }     
                // && entries[key][0].value.status == activeStatus
            }
        }

        return filteredResults;        
    }       
    const updateStatus = () => {
        const filteredResults:any = {};

        // Since data is an array of objects, we access the first object using data[0]
        const entries = analyseData[0]; // Single object inside the array

        for (const key in entries) {
            if (entries[key][0].value.status == activeStatus) {
                filteredResults[key] = entries[key]; // Add to filtered results if category matches
            }                
        }

        return filteredResults;            
    }
   useEffect(() => {
        Application.WeaklyReportGraph({
            member_id:id
        }).then(res => {
            if(res.data != 'Internal Server Error'){
                setOnGoingData(res.data)
            }
        })
    },[])    
    useEffect(() => {
        if((avtiveMenu != 'All' )) {
            setFilteredData([updateCategory()])
        } else{
            if(search!= ''){
                setFilteredData([updateSearch()])
            }else {
                if(activeStatus !='All'){
                    setFilteredData([updateStatus()])
                }else {
                    setFilteredData(analyseData)
                }
            }
        }
    },[avtiveMenu,analyseData,search,activeStatus])
    const resolveOnGoingData =() => {
        const resolved:any ={}
        if(activeStatus == 'All'){
            Object.keys(onGoingData).map((el) => {
                if(el.toLowerCase().includes(search.toLowerCase()) ||  search ==''){
                    resolved[el] = onGoingData[el]
                }
            })
        }
        if(activeStatus != 'All'){
            Object.keys(onGoingData).map((el) => {
                if(search != ''){
                    if((el.toLowerCase().includes(search.toLowerCase()) &&  onGoingData[el].status == activeStatus)){
                        resolved[el] = onGoingData[el]
                    }
                }else {
                    if((onGoingData[el].status == activeStatus)){
                        resolved[el] = onGoingData[el]
                    }                    
                }
            })
        }        
        return resolved
    }
    return (
        <>
            <div className="flex flex-col w-full  items-start gap-2">
                <InfoCard></InfoCard>
                <div className="flex w-full justify-between ">
                <ActivityMenu menus={menus} activeMenu={avtiveMenu} onChangeMenuAction={(menu :string) => {
                    setActiveMenu(menu as MenuNames)
                }}></ActivityMenu>

                <div className=" flex items-center gap-2 ">
                    <SearchBox
                    changeHandler={(e) =>{
                        setSearch(e.target.value)
                    }}
                    theme="Aurora"
                    placeholder="| Quick alphabetical search for benchmarks"
                    />
                    <StatusMenu status={["All","Needs Focus","ok","Good","Excellent"]} activeStatus={activeStatus as any} onChange={((value) =>setActiveStatus(value))}></StatusMenu>
                </div>
                </div>    
                <div className="flex w-full  ">
                    <ChartController onGoingData={resolveOnGoingData()} isGoing={avtiveMenu =='Ongoing'?true:false} data={filteredData}></ChartController>
                </div>            
            </div>
        </>
    )
}

export default Analysis