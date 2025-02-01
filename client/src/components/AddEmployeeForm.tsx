import React, { useState, useEffect } from "react";
import { Employee } from "../types/Employee";
import { getManagers } from "../services/adminService";

interface Props {
    onSubmit: (employee: Employee) => void;
    employee?: Employee | null;
}

const AddEmployeeForm: React.FC<Props> = ({ onSubmit, employee }) => {
    const [formData, setFormData] = useState<Omit<Employee, "UserId">>({
        FullName: "",
        Email: "",
        Username: "",
        Password: "",
        Role: "employee",
        IsActive: true,
    });

    const [managers, setManagers] = useState<Employee[]>([]);

    useEffect(() => {
        const fetchManagers = async () => {
            try {
                const data = await getManagers();
                console.log("data", data);
                setManagers(data);
            } catch (error) {
                console.error("Failed to fetch managers:", error);
            }
        };

        fetchManagers();
    }, []);

    useEffect(() => {
        if (employee) {
            setFormData({
                FullName: employee.FullName || "",
                Email: employee.Email || "",
                Username: employee.Username || "",
                Password: "",
                Role: employee.Role || "employee",
                IsActive: employee.IsActive ?? true,
                ManagerId: employee.ManagerId || "",
            });
        }
    }, [employee]);

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
            <h2>{employee ? "Edit Employee" : "Add New Employee"}</h2>
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
                Manager:
                <select
                    name="ManagerId"
                    value={formData.ManagerId}
                    onChange={handleChange}
                >
                    <option value="">Select a Manager</option>
                    {managers.map((manager) => (
                        <option key={manager.UserId} value={manager.UserId}>
                            {manager.FullName}
                        </option>
                    ))}
                </select>
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
            <button type="submit">
                {employee ? "Update Employee" : "Add Employee"}
            </button>
        </form>
    );
};

export default AddEmployeeForm;
