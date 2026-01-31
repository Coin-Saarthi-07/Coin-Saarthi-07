import { Navigate } from "react-router-dom";
import authService from "../services/authService";

const RoleRoute = ({ role, children }) => {
  const user = authService.getCurrentUser();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return user.role === role
    ? children
    : <Navigate to="/" replace />;
};

export default RoleRoute;
