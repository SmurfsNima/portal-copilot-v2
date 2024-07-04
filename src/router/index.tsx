import { createBrowserRouter } from "react-router-dom";
import Layout from "@/Themes/index";
import ProtectedRoute from "./Protected";
import { Login } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute Component={Layout}></ProtectedRoute>,
    children: [

    ],
  },
  {
    path:'/login',
    element:<Login></Login>
  }
]);

export default router;
