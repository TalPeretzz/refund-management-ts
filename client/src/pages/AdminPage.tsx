import React, { useState } from "react";
import EmployeeSearch from "../components/EmployeeSearch";
import AddEmployeeForm from "../components/AddEmployeeForm";
import Modal from "../components/Modal";
import {
    searchEmployee,
    addEmployee,
    updateEmployee,
} from "../services/adminService";
import { Employee } from "../types/Employee";
import "../styles/AdminPage.css";

const AdminPage: React.FC = () => {
    const [searchResults, setSearchResults] = useState<Employee[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
        null
    );

    // Search employees from backend
    const handleSearch = async (query: string) => {
        try {
            const results = await searchEmployee(query);
            setSearchResults(results);
        } catch (error) {
            console.error("Error fetching employees:", error);
            alert("Failed to fetch employees. Please try again later.");
        }
    };

    // Add a new employee
    const handleAddEmployee = async (newEmployee: Omit<Employee, "UserId">) => {
        try {
            const addedEmployee = await addEmployee(newEmployee);
            setSearchResults((prev) => [...prev, addedEmployee]);
            setModalOpen(false);
            alert("Employee added successfully!");
        } catch (error) {
            console.error("Error adding employee:", error);
            alert("Failed to add employee. Please try again later.");
        }
    };

    // Update an existing employee
    const handleEditEmployee = async (updatedEmployee: Employee) => {
        try {
            const updatedData = await updateEmployee(updatedEmployee);
            const updatedResults = searchResults.map((emp) =>
                emp.UserId === updatedData.UserId ? updatedData : emp
            );
            setSearchResults(updatedResults);
            setModalOpen(false);
            setSelectedEmployee(null);
            alert("Employee updated successfully!");
        } catch (error) {
            console.error("Error updating employee:", error);
            alert("Failed to update employee. Please try again later.");
        }
    };

    // Open modal in edit mode
    const openEditModal = (employee: Employee) => {
        console.log("employee", employee);
        setEditMode(true);
        setSelectedEmployee(employee);
        setModalOpen(true);
    };

    return (
        <div className="admin-page">
            <h1>Admin Dashboard</h1>
            <div className="search-and-add">
                <EmployeeSearch onSearch={handleSearch} />
                <button
                    className="add-employee-button"
                    onClick={() => {
                        setModalOpen(true);
                        setEditMode(false);
                        setSelectedEmployee(null);
                    }}
                >
                    Add Employee
                </button>
            </div>

            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                    <AddEmployeeForm
                        onSubmit={
                            isEditMode ? handleEditEmployee : handleAddEmployee
                        }
                        employee={selectedEmployee}
                    />
                </Modal>
            )}

            <h2>Search Results</h2>
            {searchResults.length > 0 ? (
                <ul className="employee-list">
                    {searchResults.map((employee) => (
                        <li key={employee.UserId} className="employee-item">
                            <button
                                onClick={() => openEditModal(employee)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        openEditModal(employee);
                                    }
                                }}
                                tabIndex={0}
                                className="employee-button"
                            >
                                {employee.FullName} - {employee.Role}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>
                    No employees found. Try searching for a name, username, or
                    email.
                </p>
            )}
        </div>
    );
};

export default AdminPage;
