import { useAppSelector } from "../../../hooks/reduxHooks";
import { selectAppRole } from "../../../store/userSlice/userSlice";
import { Outlet, Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const role = useAppSelector(selectAppRole);

  return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
