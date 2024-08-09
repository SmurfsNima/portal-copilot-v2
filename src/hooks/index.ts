import { useContext } from "react";
import { AppContext } from "@/store/app";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BiomarkerCategory , diagnosis } from "@/types";
import { Application } from "@/api";
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error("AuthContext was used outside of the AuthContextProvider");
  return context;
}
export const useBiomarkers = () => {
  const { id } = useParams<{ id: string }>();
  const [biomarkers, setBiomarkers] = useState<BiomarkerCategory[]>([]);

  useEffect(() => {
    const fetchBiomarkers = async () => {
      if (id) {
        try {
          const response = await Application.getBiomarkersByPatientId(Number(id));
          setBiomarkers(response.data);
        } catch (error) {
          console.error("Failed to fetch biomarkers:", error);
        }
      }
    };

    fetchBiomarkers();
  }, [id]);

  return biomarkers;
};
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