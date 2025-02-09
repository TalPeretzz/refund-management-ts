export interface Request {
    id?: string;
    title: string;
    description: string;
    status: "Pending" | "Approved" | "Rejected" | "Waiting for Account";
    date: string;
    employeeId?: number;
    managerId?: number;
    amount: number;
    employeeName?: string;
}

export interface RequestPayload {
    title: string;
    description: string;
    amount: number;
    attachment: File | null;
    employeeId: string;
}
