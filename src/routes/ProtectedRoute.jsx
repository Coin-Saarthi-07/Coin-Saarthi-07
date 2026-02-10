import { Navigate } from "react-router-dom";
import authService from "../services/authService";

const ProtectedRoute = ({ children }) => {
  const user = authService.getCurrentUser();

  // 🚫 BLOCKED USER → FORCE LOGOUT
  if (user?.status === "BLOCKED") {
    authService.logout();
    return <Navigate to="/login" replace />;
  }

  // 🔐 NOT AUTHENTICATED
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
