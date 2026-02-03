import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRoute = ({ role, children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Basic role check. If user role matches required role.
  // Note: user.role might be case sensitive? Usually uppercase in backend.
  return user.role?.toUpperCase() === role?.toUpperCase()
    ? children
    : <Navigate to="/" replace />;
};

export default RoleRoute;
