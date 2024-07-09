import { createHashRouter } from "react-router-dom";
import Layout from "@/Themes/index";
import ProtectedRoute from "./Protected";
import { Information, Login, OverView, PatientList } from "@/pages";
import BioMarker from "@/pages/information/bioMarker";

const router = createHashRouter([
  {
    path: "/",
    element: <ProtectedRoute Component={Layout}></ProtectedRoute>,
    children: [
      {
        path:'/',
        element:<PatientList></PatientList>
      },
      {
        path:'/information/:id',
        element:<Information></Information>,
        children:[
          {
            index:true,
            element:<OverView></OverView>
          },
          {
            path:'biomarker',
            element:<BioMarker></BioMarker>
          }          
        ]
      }      
    ],
  },
  {
    path:'/login',
    element:<Login></Login>
  }
]);

export default router;
