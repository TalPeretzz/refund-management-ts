import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import EmployeePage from "./pages/EmployeePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

const AppRoutes: React.FC = () => {
    let { user } = useAuth(); // Retrieve user data from AuthContext
    console.log("user", user);
    user = { username: "admin", role: "admin" };
    return (
        <Routes>
            {/* Public Route: Login Page */}
            <Route path="/" element={<LoginPage />} />

            {/* Protected Route: Employee Page (Accessible to employees and managers) */}
            <Route
                element={
                    <ProtectedRoute allowedRoles={["employee", "manager"]} />
                }
            >
                <Route
                    path="/employee"
                    element={<EmployeePage role={user!.role} />}
                />
            </Route>

            {/* Protected Route: Admin Page (Only accessible to admin users) */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/admin" element={<AdminPage />} />
            </Route>

            {/* Unauthorized access page */}
            <Route
                path="/unauthorized"
                element={<h2>Unauthorized Access</h2>}
            />
        </Routes>
    );
};

export default AppRoutes;
