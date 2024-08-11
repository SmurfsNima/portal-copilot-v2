import { createHashRouter } from "react-router-dom";
import Layout from "@/Themes/index";
import ProtectedRoute from "./Protected";
import { Information, Login, OverView, PatientList, TimeLine } from "@/pages";
import BioMarker from "@/pages/information/bioMarker";
import { Diagnosis } from "@/pages/information/diagnosis";
import { Intervention } from "@/pages/information/intervention";
import { AiStudio } from "@/pages/aiStudio";
import { TreatmentPlan } from "@/pages/Treatment Plan";

const router = createHashRouter([
  {
    path: "/",
    element: <ProtectedRoute Component={Layout}></ProtectedRoute>,
    children: [
      {
        path: "/patient-list",
        element: <PatientList></PatientList>,
        children: [],
      },
      {
        path: "/information/:id",
        element: <Information></Information>,
        children: [
          {
            index: true,
            element: <OverView></OverView>,
          },
          {
            path: "analysis",
            element: <BioMarker></BioMarker>,
          },
          {
            path: "diagnosis",
            element: <Diagnosis></Diagnosis>,
          },
          {
            path: "intervention",
            element: <Intervention></Intervention>,
          },
          {
            path: "treatment-plan",
            element: <TreatmentPlan></TreatmentPlan>,
          },

          {
            path: "timeline",
            element: <TimeLine></TimeLine>,
          },
        ],
      },
      {
        path: "/ai-studio",
        element: <AiStudio></AiStudio>,
      },
    ],
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
]);

export default router;
