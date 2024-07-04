import { createBrowserRouter } from "react-router-dom";
import Layout from "@/Themes/index";
import ProtectedRoute from "./Protected";
import { Login, PatientList } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute Component={Layout}></ProtectedRoute>,
    children: [
      {
        path:'/',
        element:<PatientList></PatientList>
      }
    ],
  },
  {
    path:'/login',
    element:<Login></Login>
  }
]);

export default router;
