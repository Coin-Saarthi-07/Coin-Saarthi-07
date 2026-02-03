import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading, user } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Or return null / spinner
    }

    // If user is authenticated, redirect them away from public routes like Login/Register
    // replace={true} ensures the Back button doesn't create an infinite loop
    if (isAuthenticated) {
        if (user?.role === "ADMIN") {
            return <Navigate to="/admin/dashboard" replace />;
        }
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default PublicRoute;
