

// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, roles }) => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   if (!token) return <Navigate to="/login" />;

//   if (roles && !roles.includes(role)) {
//     return <Navigate to="/unauthorized" />;
//   }

//   return children;

import { Navigate } from "react-router-dom";
import authService from "../services/authService";

const ProtectedRoute = ({ children }) => {
  return authService.isAuthenticated()
    ? children
    : <Navigate to="/login" replace />;

};

export default ProtectedRoute;
