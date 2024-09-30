import { Pationt, User,  } from "@/model";
import { PropsWithChildren, createContext, useState , useEffect } from "react";
import {  biomarker, diagnosis  } from "@/types";
import { Application } from "@/api";
import {Application as ApplicationModel} from '@/model'

interface AppContextProp {
    user:User;
    AppManager:ApplicationModel;
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

   

}

export const AppContext = createContext<AppContextProp>({
    user:new User(),
    token:null,
    isLoggedId:false,
    setUser:() => {},
    login:() => {},
    savePatientList: () => {},
    addPatient: () => {},
    removePatient: () => {},
    patients: [],
    getPatientById: () => undefined,
    getBiomarkers : ()=> undefined,
    getDiagnosis : ()=> undefined,
    getAllBiomarkersById : ()=> undefined,
  reportManager: new ClientReport()

})

const AppContextProvider =({children}:PropsWithChildren) => {
    const  [applicationmodel] = useState<ApplicationModel>(new ApplicationModel())
    const [token,setToken] = useState<string | null>(localStorage.getItem("token") || null)
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
        setUser:(user:User) => {
            localStorage.setItem('authUser',JSON.stringify(user))
            setUser(user)
        },
        login:(token:string) =>{
            setToken(token)
            localStorage.setItem("token",token)
        },
        savePatientList,
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