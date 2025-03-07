import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import EmployeePage from "./pages/EmployeePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

const AppRoutes: React.FC = () => {
    const { user, isLoading } = useAuth(); // Retrieve user data from AuthContext

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    if (!user) {
        return <LoginPage />;
    }

    return (
        <Routes>
            {/* Public Route: Login Page */}
            <Route path="/" element={<LoginPage />} />

            {/* Protected Route: Employee Page (Only for employees and managers) */}
            {["employee", "manager", "account-manager"].includes(user.role) && (
                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "employee",
                                "manager",
                                "account-manager",
                            ]}
                        />
                    }
                >
                    <Route
                        path="/employee"
                        element={<EmployeePage role={user.role} />}
                    />
                </Route>
            )}

            {/* Protected Route: Admin Page (Only for admins) */}
            {user.role === "admin" && (
                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                    <Route path="/admin" element={<AdminPage />} />
                </Route>
            )}

            {/* Unauthorized access page */}
            <Route
                path="/unauthorized"
                element={<h2>Unauthorized Access</h2>}
            />
        </Routes>
    );
};

export default AppRoutes;
