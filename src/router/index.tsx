import { createHashRouter } from "react-router-dom";
import Layout from "@/Themes/index";
import ProtectedRoute from "./Protected";
import { Information, Login, OverView, PatientList, TimeLine } from "@/pages";
import BioMarker from "@/pages/information/bioMarker";
import { Diagnosis } from "@/pages/information/diagnosis";
import { Intervention } from "@/pages/information/intervention";
import { AiStudio } from "@/pages/aiStudio";
import { TreatmentPlan } from "@/pages/information/Treatment Plan";
import { ActionPlan } from "@/pages/information/ActionPlan";
import { Calender } from "@/pages/information/calender";
const router = createHashRouter([
  {
    path: "/",
    element: <ProtectedRoute Component={Layout}></ProtectedRoute>,
    children: [
      {
        path: "/client-list",
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
            path: "action-plan",
            element: <ActionPlan></ActionPlan>,
          },
          {
            path: "calender",
            element: <Calender></Calender>,
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
