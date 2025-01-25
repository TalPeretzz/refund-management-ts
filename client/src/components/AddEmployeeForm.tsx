import React, { useState, useEffect } from 'react';
import RoleDropdown from './RoleDropdown';
import { Employee } from '../types/Employee';

interface AddEmployeeFormProps {
  onSubmit: (employee: Employee) => void;
  employee?: Employee | null; // Optional for editing
}

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({
  onSubmit,
  employee,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [manager, setManager] = useState('');

  useEffect(() => {
    if (employee) {
      setUsername(employee.fullName || '');
      setRole(employee.role || '');
      setManager(employee.manager || '');
      setPassword(''); // Leave password empty during editing
    }
  }, [employee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && role && manager) {
      const updatedEmployee: Employee = {
        ...employee,
        fullName: username,
        role,
        manager,
        ...(password ? { password } : {}), // Include password only if it's entered
      } as Employee;
      onSubmit(updatedEmployee);
    }
  };

  return (
    <form className="add-employee-form" onSubmit={handleSubmit}>
      <label>
        Username
        <input
          type="text"
          placeholder="Enter employee username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password {employee ? '(Set New Password)' : ''}
        <input
          type="password"
          placeholder={
            employee ? 'Enter new password (optional)' : 'Enter password'
          }
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={!employee} // Required only for new employees
        />
      </label>
      <label>
        Manager
        <input
          type="text"
          placeholder="Enter manager name"
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          required
        />
      </label>
      <label>
        Role
        <RoleDropdown selectedRole={role} onChange={setRole} />
      </label>
      <button type="submit">
        {employee ? 'Update Employee' : 'Add Employee'}
      </button>
    </form>
  );
};

export default AddEmployeeForm;
