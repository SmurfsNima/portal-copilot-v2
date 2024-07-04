import { createBrowserRouter } from "react-router-dom";
import Layout from "@/Themes/index";
import ProtectedRoute from "./Protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute Component={Layout}></ProtectedRoute>,
    children: [

    ],
  },
]);

export default router;
