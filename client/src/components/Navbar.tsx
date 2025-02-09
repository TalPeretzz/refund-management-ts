import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";
import { Employee } from "../types/Employee";
import Modal from "./Modal";
import AddEmployeeForm from "./AddEmployeeForm";
import { updateEmployee } from "../services/adminService";

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
        null
    );

    const handleLogout = () => {
        logout();
        navigate("/"); // Redirect to login
    };

    const openEditModal = (employee: Employee | null) => {
        setSelectedEmployee(employee);
        setModalOpen(true);
    };

    const handleEditEmployee = async (updatedEmployee: Employee) => {
        try {
            await updateEmployee(updatedEmployee);

            // const updatedResults = searchResults.map((emp) =>
            //     emp.UserId === updatedData.UserId ? updatedData : emp
            // );
            // setSearchResults(updatedResults);
            setModalOpen(false);
            setSelectedEmployee(null);
            alert("Employee updated successfully!");
        } catch (error) {
            console.error("Error updating employee:", error);
            alert("Failed to update employee. Please try again later.");
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Left Side: Logo & App Name */}
                <div className="navbar-brand">
                    <svg
                        width="50"
                        height="50"
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="100"
                            cy="100"
                            r="95"
                            fill="url(#gradient)"
                            stroke="#2eac68"
                            strokeWidth="5"
                        />

                        <text
                            x="50%"
                            y="50%"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            fontSize="80"
                            fontWeight="bold"
                            fill="white"
                            fontFamily="Arial, sans-serif"
                        >
                            $
                        </text>

                        <rect
                            x="60"
                            y="40"
                            width="80"
                            height="120"
                            rx="10"
                            ry="10"
                            fill="white"
                            stroke="#2eac68"
                            strokeWidth="5"
                        />
                        <line
                            x1="75"
                            y1="60"
                            x2="125"
                            y2="60"
                            stroke="#2eac68"
                            strokeWidth="3"
                        />
                        <line
                            x1="75"
                            y1="80"
                            x2="125"
                            y2="80"
                            stroke="#2eac68"
                            strokeWidth="3"
                        />
                        <line
                            x1="75"
                            y1="100"
                            x2="125"
                            y2="100"
                            stroke="#2eac68"
                            strokeWidth="3"
                        />

                        <defs>
                            <linearGradient
                                id="gradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                            >
                                <stop
                                    offset="0%"
                                    style={{
                                        stopColor: "#2eac68",
                                        stopOpacity: 1,
                                    }}
                                />
                                <stop
                                    offset="100%"
                                    style={{
                                        stopColor: "#38a169",
                                        stopOpacity: 1,
                                    }}
                                />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span className="app-name">ExpenseApp</span>
                </div>

                {/* Right Side: Navigation Links */}
                <div className="navbar-right">
                    <ul>
                        {/* Profile Link */}
                        <li>
                            <button
                                className="profile-btn"
                                onClick={() => openEditModal(null)}
                            >
                                {user?.username}
                            </button>
                        </li>

                        {/* Logout Link */}
                        <li>
                            <a
                                href="/"
                                className="logout-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLogout();
                                }}
                            >
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
                {isModalOpen && (
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setModalOpen(false)}
                    >
                        <AddEmployeeForm
                            onSubmit={handleEditEmployee}
                            employee={selectedEmployee}
                        />
                    </Modal>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
