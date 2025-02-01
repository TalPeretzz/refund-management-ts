import React, { useState } from "react";
import { Employee } from "../types/Employee";

interface Props {
    onSubmit: (employee: Employee) => void;
    employee?: Employee | null; // Optional for "Add" mode
}

const AddEmployeeForm: React.FC<Props> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<Omit<Employee, "UserId">>({
        FullName: "",
        Email: "",
        Username: "",
        Password: "",
        Role: "employee",
        IsActive: true,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "IsActive" ? (e.target as any).checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add new employee </h2>
            <label>
                Full Name:
                <input
                    type="text"
                    name="FullName"
                    value={formData.FullName}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Username:
                <input
                    type="text"
                    name="Username"
                    value={formData.Username}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    name="Password"
                    value={formData.Password}
                    onChange={handleChange}
                />
            </label>
            <label>
                Role:
                <select
                    name="Role"
                    value={formData.Role}
                    onChange={handleChange}
                >
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                    <option value="account-manager">Account Manager</option>
                    <option value="admin">Admin</option>
                </select>
            </label>
            <label>
                Is Active:
                <input
                    type="checkbox"
                    name="IsActive"
                    checked={formData.IsActive}
                    onChange={(e) =>
                        setFormData({ ...formData, IsActive: e.target.checked })
                    }
                />
            </label>
            <button type="submit">Add Employee</button>
        </form>
    );
};

export default AddEmployeeForm;
