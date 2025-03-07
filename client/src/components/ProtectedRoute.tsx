import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
    allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const { user, isLoading } = useAuth();
    // If no user is logged in, redirect to login page
    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    // If the user's role is not in the allowedRoles, redirect to unauthorized page
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
