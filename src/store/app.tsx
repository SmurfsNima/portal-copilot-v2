import { Pationt, User } from "@/model";
import { PropsWithChildren, createContext, useState , useEffect  , useRef} from "react";
import {  biomarker, diagnosis , BiomarkerCategory } from "@/types";
import { Application } from "@/api";

interface AppContextProp {
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

    biomarkers: BiomarkerCategory[];
    fetchBiomarkers: (id: number) => void;
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
    biomarkers: [],
    fetchBiomarkers: () => {},
})

const AppContextProvider =({children}:PropsWithChildren) => {
    const [token,setToken] = useState<string | null>(localStorage.getItem("token") || null)
    const localuser = localStorage.getItem('authUser')
    const resolveUser:User = Object.assign(new User(),JSON.parse(localuser as string))
    const [user,setUser] = useState<User>(resolveUser ? resolveUser : new User());
    const [patients, setPatients] = useState<Pationt[]>(() => {
        const storedPatients = localStorage.getItem("patients");
        return storedPatients ? JSON.parse(storedPatients) : [];
      });
      const [biomarkers, setBiomarkers] = useState<BiomarkerCategory[]>();
      const biomarkersCache = useRef<Map<number, BiomarkerCategory[]>>(new Map());
    useEffect(()=>    console.log(biomarkers),[biomarkers]
  )
    
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
      const fetchBiomarkers = async (id: number) => {
        if (!biomarkersCache.current.has(id)) {
          try {
            const response = await Application.getBiomarkersByPatientId(id);
            console.log(response);
            
            biomarkersCache.current.set(id, response.data);
            setBiomarkers(response.data);
          } catch (error) {
            console.error("Failed to fetch biomarkers:", error);
          }
        } else {
          setBiomarkers(biomarkersCache.current.get(id) || []);
        }
      };
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
        biomarkers,
        fetchBiomarkers,

        
    }
   
    
    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export default AppContextProvider;