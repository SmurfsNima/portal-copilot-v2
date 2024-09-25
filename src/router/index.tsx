import { createHashRouter } from "react-router-dom";
import Layout from "@/Themes/index";
import ProtectedRoute from "./Protected";
import { AiKnowlage, Information, Login, OverView, PatientList, TimeLine, Setting } from "@/pages";
import BioMarker from "@/pages/information/Analysis";
import { Diagnosis } from "@/pages/information/diagnosis";
import { Intervention } from "@/pages/information/intervention";
import { AiStudio } from "@/pages/aiStudio";
import { TreatmentPlan } from "@/pages/information/Treatment Plan";
import { ActionPlan } from "@/pages/information/ActionPlan";
import { Calender } from "@/pages/information/calender";
import { Messages } from "@/pages/messages";
import PdfViewerComponent from "@/pages/information/Treatment Plan/PdfViewer";
const router = createHashRouter([
  {
    path: "/",
    element: <ProtectedRoute Component={Layout}></ProtectedRoute>,
    children: [
      {
        path: "/",
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
          {
            path: "messages",
            element: <Messages></Messages>,
          },
        ],
      },
      {
        path: "/ai-studio",
        element: <AiStudio></AiStudio>,
      },
      {
        path: "/ai-knowlage",
        element: <AiKnowlage></AiKnowlage>,
      }, 
      {
        path: "/setting",
        element: <Setting></Setting>,
      },
    
     
    ],
  },
  {
    path: "pdf-viewer",
    element: <PdfViewerComponent></PdfViewerComponent>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
 
]);

export default router;
