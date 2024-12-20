import { Pationt, User , ClientReport } from "@/model";
import { PropsWithChildren, createContext, useState , useEffect } from "react";
import {  biomarker, diagnosis  } from "@/types";
import { Application } from "@/api";
import  ApplicationModel  from "@/model/app";

interface AppContextProp {
    reportManager : ClientReport
    ApplicationManager:ApplicationModel
    user:User;
    token:string | null;
    isLoggedId:boolean;
    setUser:(user:User) => void;
    login: (token: string) => void;
    savePatientList: (patients: Pationt[]) => void;
    addPatient: (patient: Pationt) => void;
    removePatient: (id: number) => void;
    patients: Pationt[];
    getPatientById: (id: number) => Pationt | undefined;
    getBiomarkers: (id: number) => biomarker[] | undefined;
    getDiagnosis: (id: number) => diagnosis[] | undefined;
    getAllBiomarkersById : () => undefined;
    themeISLight:boolean
    setThemeIsLight:(action:boolean) => void
}

export const AppContext = createContext<AppContextProp>({
    user:new User(),
    themeISLight:false,
    ApplicationManager:new ApplicationModel(),
    token:null,
    isLoggedId:false,
    setUser:() => {},
    login:() => {},
    savePatientList: () => {},
    addPatient: () => {},
    removePatient: () => {},
    patients: [],
    setThemeIsLight:() => undefined,
    getPatientById: () => undefined,
    getBiomarkers : ()=> undefined,
    getDiagnosis : ()=> undefined,
    getAllBiomarkersById : ()=> undefined,
  reportManager: new ClientReport()

})

const AppContextProvider =({children}:PropsWithChildren) => {
    const [token,setToken] = useState<string | null>(localStorage.getItem("token") || null)
    const [applicationModel,] = useState(new ApplicationModel())
    const [isLight,setIsLight]= useState<boolean>(localStorage.getItem("theme-base")=='light'?true : false)
    const localuser = localStorage.getItem('authUser')
    const resolveUser:User = Object.assign(new User(),JSON.parse(localuser as string))
    const [user,setUser] = useState<User>(resolveUser ? resolveUser : new User());
    const [clientReport] = useState<ClientReport>(new ClientReport())
    const [patients, setPatients] = useState<Pationt[]>(() => {
        const storedPatients = localStorage.getItem("patients");
        return storedPatients ? JSON.parse(storedPatients) : [];
      });

      useEffect(() => {
        localStorage.setItem("patients", JSON.stringify(patients));
      }, [patients]);
    
      const savePatientList = (patients: Pationt[]) => {
        setPatients(patients);
      };
    
      const addPatient = (patient: Pationt) => {
        setPatients((prevPatients) => [...prevPatients, patient]);
      };
    
      const removePatient = (id: number) => {
        setPatients((prevPatients) => prevPatients.filter((patient) => patient.information.member_id !== id));
      };
    
      const getPatientById = (id: number): Pationt | undefined => {
        return patients.find((patient) => patient.information.member_id === id);
      };
    
      const getBiomarkers = (id: number): biomarker[] | undefined => {
        const patient = getPatientById(id);
        return patient?.getBiomarkers();
      };
      const getDiagnosis = (id: number): diagnosis[] | undefined => {
        const patient = getPatientById(id);
        return patient?.getDiagnosis();
      };
      const getAllBiomarkersById = () : undefined=>{
         const Allbiomarkers = Application.getAllBiomarkers();
         console.log(Allbiomarkers);
         
          
         
      }

    const contextValue:AppContextProp = {
        token:token,
        user:user,
        isLoggedId:!!token,
        ApplicationManager:applicationModel,
        setUser:(user:User) => {
            localStorage.setItem('authUser',JSON.stringify(user))
            setUser(user)
        },
        themeISLight:isLight,
        login:(token:string) =>{
            setToken(token)
            localStorage.setItem("token",token)
        },
        savePatientList,
        setThemeIsLight:setIsLight,
        addPatient,
        removePatient,
        patients,
        getPatientById,
        getBiomarkers,
        getDiagnosis,
        getAllBiomarkersById,
        reportManager:clientReport
       


        
    }
   
    
    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export default AppContextProvider;