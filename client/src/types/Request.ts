export interface Request {
    id: number; // Unique identifier for the request
    title: string; // Title of the request
    description: string; // Description of the request
    status: "Pending" | "Approved" | "Rejected" | "Waiting for Account"; // Status
    date: string; // ISO date string for the request
    employeeId: number; // Employee ID
    managerId: number; // Manager ID
}
