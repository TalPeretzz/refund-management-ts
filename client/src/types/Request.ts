import { Employee } from "./Employee";

export interface Request {
    id?: string;
    title: string;
    description: string;
    status: "Pending" | "Approved" | "Rejected" | "Manager Approved";
    date: string;
    employeeId?: number;
    managerId?: number;
    amount: number;
    employeeName?: string;
    employee?: Employee;
}

export interface RequestPayload {
    title: string;
    description: string;
    amount: number;
    attachment: File | null;
    employeeId: string;
}
