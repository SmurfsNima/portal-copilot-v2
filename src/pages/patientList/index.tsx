/* eslint-disable @typescript-eslint/no-explicit-any */
import { Application } from "@/api";
import { Table, NumberBox } from "@/components";
// import { useConstructor } from "@/help";
import { Pationt } from "@/model";
import Biomarker from "@/model/biomarkers";
// import Biomarker from "@/model/biomarkers";
import { biomarker } from "@/types";
import { useState, useContext, useEffect } from "react";
// import NumberBox from "@/components/numberBox/numberBox";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { AppContext } from "@/store/app";
// import Diagnosis from "@/model/diagnosis";
import Icon1 from '../../assets/images/profile-tick.png';
import Icon2 from '../../assets/images/profile-tick2.png';
import Icon4 from '../../assets/images/profile-tick3.png';
import Icon3 from '../../assets/images/profile-delete.png';

const PatientList = () => {
  const theme = useSelector((state: any) => state.theme.value.name);
  const { patients ,savePatientList } = useContext(AppContext);
  const [reports, setReports] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientResponse = await Application.getPatients();
        const biomarkerResponse = await Application.getBiomarkers();
        const DiagnosisResponse = await Application.getDiagnosis();

        console.log(patientResponse);
        console.log(biomarkerResponse);
        console.log("diagnosis" , DiagnosisResponse);

        const biomarkersByPatientId: { [key: number]: biomarker[] } = {};
        biomarkerResponse.data.forEach((item: any) => {
          biomarkersByPatientId[item.patient_id] = item.biomarkers.map(
            (bio: any) => new Biomarker(bio)
          );
        });
        // const DiagnosisByPatientId: { [key: number]: diagnosis[] } = {};
        // DiagnosisResponse.data.forEach((item: any) => {
        //   DiagnosisByPatientId[item.patient_id] = item.diagnosis.map(
        //     (bio: any) => new Diagnosis(bio)
        //   );
        // });

        const resolvedPatients = patientResponse.data.map((el: any) => {
          const biomarkers = biomarkersByPatientId[el.patient_id] || [];
          // const Diagnosis = DiagnosisByPatientId[el.patient_id] || [];
          // const diagnosis = el.diagnosis.map((diagnosis: diagnosis) => {
          //   return new Diagnosis(diagnosis);
          // });

          const patient = new Pationt({
            ...el,
            heart_rate: 0,
            blood_pressure: 0,
            temperatue: 0,
            blood_oxygen: 0,
            respiration_rate: "",
          });
          
          
          patient.setBiomarkers(biomarkers);
          // patient.setDiagnosis(Diagnosis);

          return patient;
        });
        
        
       
        savePatientList(resolvedPatients);
        console.log(patients);
        
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }

      try {
        const reportsResponse = await Application.getReports();
        setReports(reportsResponse.data);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    };

    fetchData();
  }, []);


  // useConstructor(() => {
  //   Application.getPatients().then((res) => {
  //     console.log(res);
  //     const resolved = res.data.map((el: any) => {
  //       const biomarkers = el.biomarkers.map((bio: biomarker) => {
  //         return new Biomarker(bio);
  //       });
  //       const diagnosis = el.diagnosis.map((diagnosis: diagnosis)=>{
  //         return new Diagnosis(diagnosis)
  //       })

  //       const patient = new Pationt({
  //         ...el,
  //       });

  //       patient.setBiomarkers(biomarkers);
  //       patient.setDiagnosis(diagnosis)
  //       console.log(patient);
  //       // addPatient(patient);

  //       return patient;
  //     });
  //     setPatients(resolved)
  //     // savePatientList(resolved);
  //   });

  //   Application.getReports().then((res) => {
  //     setReports(res.data);
  //   });
  // });
  return (
    <>
      <div className="bg-black-background w-full -mt-4  px-5">
        <div className={""}>
          <div className="w-full flex items-center justify-between text-[#ffffffc3] mb-[10px]">

          <h1 className={"text-sm"}>
            General Report
          </h1>
          <h1 className="flex text-[12px] cursor-pointer"><span className="mr-[5px] "><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="none">
<path d="M18.3333 10.0001C18.3333 14.6001 14.6 18.3334 9.99996 18.3334C5.39996 18.3334 2.59163 13.7001 2.59163 13.7001M2.59163 13.7001H6.35829M2.59163 13.7001V17.8667M1.66663 10.0001C1.66663 5.40008 5.36663 1.66675 9.99996 1.66675C15.5583 1.66675 18.3333 6.30008 18.3333 6.30008M18.3333 6.30008V2.13341M18.3333 6.30008H14.6333" stroke="white" stroke-opacity="0.87" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg></span>Reload Data</h1>
          </div>
          <div
            className={
              "grid grid-cols-3 xl:grid-cols-4  gap-2 w-full"
            }
          >
            <NumberBox
              mode="added"
              value={
                reports.length > 0
                  ? reports.filter((el) => el.key == "Total Enrollment")[0].value
                  : 0
              }
              title="Total Enrollment"
              theme={theme}
              icon={Icon2}

            />
            <NumberBox
              mode="increase"
              value={
                reports.length > 0
                  ? reports.filter((el) => el.key == "Critical Patients")[0]
                      .value
                  : 0
              }
              title="Critical Patients"
              theme={theme}
              icon={Icon3}

            />
            <NumberBox
              mode="reduction"
              value={
                reports.length > 0
                  ? reports.filter((el) => el.key == "At Risk Patients")[0]
                      .value
                  : 0
              }
              title="At Risk Patients"
              theme={theme}
              icon={Icon1}
            />
            <NumberBox
              mode="increase"
              value={
                reports.length > 0
                  ? reports.filter((el) => el.key == "Normal Patients")[0].value
                  : 0
              }
              title="Normal Patients"
              theme={theme}
              icon={Icon4}

            />
          </div>
        </div>
        <Table classData={patients}></Table>
        <Outlet />
      </div>
    </>
  );
};

export default PatientList;
