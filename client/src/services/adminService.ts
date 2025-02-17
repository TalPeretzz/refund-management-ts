import axios from "axios";
import { Employee } from "../types/Employee";

export const searchEmployee = async (query: string): Promise<Employee[]> => {
    const response = await axios.get("/api/users");
    return response.data.data.filter((employee: Employee) =>
        employee.FullName.toLowerCase().includes(query.toLowerCase())
    );
};

export const addEmployee = async (newEmployee: Employee): Promise<Employee> => {
    const response = await axios.post("/api/users", newEmployee);
    return response.data.data;
};

export const updateEmployee = async (employee: Employee): Promise<Employee> => {
    const response = await axios.put(`/api/users/${employee.UserId}`, employee);

    return response.data.data;
};

export const getManagers = async (): Promise<Employee[]> => {
    const { data } = await axios.get("/api/users/managers");
    return data.data;
};

export const getEmployee = async (id: string): Promise<Employee> => {
    const response = await axios.get(`/api/users/${id}`);
    return response.data.data;
};
