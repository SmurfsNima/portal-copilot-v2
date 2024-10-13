import { createHashRouter } from "react-router-dom";
import Layout from "@/Themes/index";
import ProtectedRoute from "./Protected";
import { AiKnowlage, Information, Login,  PatientList, TimeLine, Setting, HelthProfile, Historycaldata, TreatMentPlan } from "@/pages";
import BioMarker from "@/pages/information/Analysis/index2";
import { Diagnosis } from "@/pages/information/diagnosis";
import { Intervention } from "@/pages/information/intervention";
import { AiStudio } from "@/pages/aiStudio";
// import { TreatmentPlan } from "@/pages/information/Treatment Plan";
import { ActionPlan } from "@/pages/information/ActionPlan";
import { Calender } from "@/pages/information/calender";
import { Messages } from "@/pages/messages";
import PdfViewerComponent from "@/pages/information/Treatment Plan/PdfViewer";
import WeaklyReport from "@/pages/Pdf/WeaklyReport";
import ClinicReportPage from "@/pages/Pdf/ClinicReport";
import ClientReportPage from "@/pages/Pdf/ClientReport";
import CopilotChat from "@/pages/information/CopilotChat";
import ResportTest from "@/pages/ReportTest";
import GenerateNewPlan from "@/pages/information/TreatmentPlan-V2/GenerateNewPlan";
import FormDataEntry from "@/pages/FormDataEntry";

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
        path:'historyCalData',
        element:<Historycaldata></Historycaldata>
      },
      {
        path:"/helthProfile/:id",
        element:<HelthProfile></HelthProfile>
      },
      {
        path:"/helthProfile/dataEntry/",
        element:<FormDataEntry></FormDataEntry>
      },      
      {
        path: "/information/:id",
        element: <Information></Information>,
        children: [
          // {
          //   index: true,
          //   element: <OverView></OverView>,
          // },
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
            element: <TreatMentPlan></TreatMentPlan>,
           
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
          {
            path: "copilot",
            element: <CopilotChat></CopilotChat>
          },
        ],
      },
      {
        path:'generateNewTreatmentPlan/:id',
        element:<GenerateNewPlan></GenerateNewPlan>
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
    path:"ClinicReportPage/:id",
    element:<ClinicReportPage></ClinicReportPage>
  },
  {
    path:"ClientReportPage/:memberId/:id",
    element:<ClientReportPage></ClientReportPage>
  },  
  {
    path:"weaklyReport/:memberId/:reportId",
    element:<WeaklyReport></WeaklyReport>
  },
  {
    path:"reportTest",
    element:<ResportTest></ResportTest>
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
 
]);

export default router;
