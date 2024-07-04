/* eslint-disable @typescript-eslint/no-explicit-any */
import { useApp } from "@/hooks";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  Component: React.ComponentType<any>;
}
function ProtectedRoute({ Component }: ProtectedRouteProps) {
  const { isLoggedId } = useApp();
  
  if (!isLoggedId) {
    return <Navigate to="/login" replace />;
  }
  return <Component />;
}
export default ProtectedRoute;