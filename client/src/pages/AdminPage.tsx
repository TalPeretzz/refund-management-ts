import React, { useState } from 'react';
import EmployeeSearch from '../components/EmployeeSearch';
import AddEmployeeForm from '../components/AddEmployeeForm';
import Modal from '../components/Modal';
import { searchEmployee, addEmployee } from '../services/adminService';
import { Employee } from '../types/Employee';
import '../styles/AdminPage.css';

const AdminPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Employee[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const handleSearch = async (query: string) => {
    const results = await searchEmployee(query);
    setSearchResults(results);
  };

  const handleAddEmployee = async (newEmployee: Employee) => {
    const addedEmployee = await addEmployee(newEmployee);
    setSearchResults((prev) => [...prev, addedEmployee]); // Add to local state
    setModalOpen(false);
    alert('Employee added successfully!');
  };

  const handleEditEmployee = async (updatedEmployee: Employee) => {
    const updatedResults = searchResults.map((emp) =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    setSearchResults(updatedResults); // Update local state
    setModalOpen(false);
    setSelectedEmployee(null);
    alert('Employee updated successfully!');
  };

  const openEditModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setEditMode(true);
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
            setSelectedEmployee(null); // Clear selected employee
          }}
        >
          Add Employee
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <AddEmployeeForm
          onSubmit={isEditMode ? handleEditEmployee : handleAddEmployee}
          employee={selectedEmployee}
        />
      </Modal>
      <h2>Search Results</h2>
      <ul>
        {searchResults.map((employee) => (
          <li
            key={employee.id}
            onClick={() => openEditModal(employee)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                openEditModal(employee);
              }
            }}
            tabIndex={0} // Makes the element focusable
            role="button" // Indicates the element is clickable
            style={{
              cursor: 'pointer',
              padding: '0.75rem 1rem',
              borderBottom: '1px solid #ddd',
            }}
          >
            {employee.fullName} - {employee.role} (Manager: {employee.manager})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
