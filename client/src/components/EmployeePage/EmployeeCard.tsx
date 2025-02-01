import React from "react";
import { Employee } from "../../types/Employee";
import "../styles/EmployeeCard.css";


interface Props {
  employee: Employee;
}

const EmployeeCard: React.FC<Props> = ({ employee }) => {
  return (
    <div className="employee-card">
      <h3>{employee.FullName}</h3>
      <p>Username: {employee.Username}</p>
      <p>Email: {employee.Email}</p>
      <p>Role: {employee.Role}</p>
      <p>Status: {employee.IsActive ? "Active" : "Inactive"}</p>
    </div>
  );
};

export default EmployeeCard;
