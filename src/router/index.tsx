import { createBrowserRouter } from "react-router-dom";
import Layout from "@/Themes/index";
import ProtectedRoute from "./Protected";
import { Information, Login, OverView, PatientList } from "@/pages";

const router = createBrowserRouter([
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
