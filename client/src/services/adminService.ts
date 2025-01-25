import axios from 'axios';
import { Employee } from '../types/Employee';
const mockDataPath = '../../mockData/employees.json';

const employees: Employee[] = [
  {
    id: 1,
    username: 'johndoe',
    fullName: 'John Doe',
    role: 'Manager',
    manager: 'Sarah Smith',
    email: 'johndoe@example.com',
  },
  {
    id: 2,
    username: 'janesmith',
    fullName: 'Jane Smith',
    role: 'Employee',
    manager: 'John Doe',
    email: 'janesmith@example.com',
  },
  {
    id: 3,
    username: 'bobjohnson',
    fullName: 'Bob Johnson',
    role: 'Employee',
    manager: 'John Doe',
    email: 'bobjohnson@example.com',
  },
];

export const searchEmployee = async (query: string): Promise<Employee[]> => {
  return employees.filter((employee) =>
    employee.fullName.toLowerCase().includes(query.toLowerCase())
  );

  //   const response = await axios.get(`/api/admin/search?query=${query}`);
  //   return response.data;
};

export const addEmployee = async (newEmployee: Employee) => {
  const id = employees.length + 1; // Generate a unique ID
  const employeeWithId = { ...newEmployee, id };
  employees.push(employeeWithId); // Add the new employee to the in-memory data
  return employeeWithId;
  //   const response = await axios.post("/api/admin/add", { username, role });
  //   return response.data;
};
