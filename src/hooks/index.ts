import { useContext, useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "@/store/app";
import { BiomarkerCategory, diagnosis } from "@/types";
import { Application } from "@/api";
import { faker } from "@faker-js/faker";

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("AuthContext was used outside of the AuthContextProvider");
  return context;
}

const useFetchData = (fetchFunction : any) => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<BiomarkerCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await fetchFunction(Number(id));
          // console.log(response)
          if(response.data!='Internal Server Error'){
            setData(response.data);
          }else{
            setData([])
          }
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }
    };

    fetchData();
  }, [id, fetchFunction]);

  return data;
};

export const useBiomarkers = () => useFetchData(Application.getBiomarkersByPatientId);
export const useBloodtest = () => useFetchData(Application.getBloodTestByPatientId);

export const useDiagnosis = () => {
  const { id } = useParams<{ id: string }>();
  const { getPatientById } = useContext(AppContext);
  const [diagnosis, setDiagnosis] = useState<diagnosis[]>([]);

  useEffect(() => {
    if (id) {
      const patient = getPatientById(Number(id));
      if (patient) {
        setDiagnosis(patient.diagnosis);
      }
    }
  }, [id, getPatientById]);

  return diagnosis;
};

export const useRandom = () => {
  const randomColor = useMemo(() => {
    return () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }, []);

  return { faker, randomColor };
};