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
          <h1 className={"text-sm text-primary-text font-medium"}>
            General Report
          </h1>
          <div
            className={
              "grid grid-cols-3 xl:grid-cols-4  gap-2 w-full"
            }
          >
            <NumberBox
              mode="added"
              value={
                reports.length > 0
                  ? reports.filter((el) => el.key == "Total Enrollment")[0]
                      .value
                  : 0
              }
              title="Total Enrollment"
              theme={theme}
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
