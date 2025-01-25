import { Request } from "../types/Request";

const API_URL = "/api/requests"; // Replace with your actual backend URL

const request: Request[] = [
    {
        id: 1,
        title: "Travel Reimbursement",
        description: "Reimbursement for travel expenses.",
        status: "Pending",
        employeeId: 101,
        managerId: 201,
        date: "2025-01-10",
    },
    {
        id: 2,
        title: "Conference Fees",
        description: "Fees for attending the annual tech conference.",
        status: "Approved",
        employeeId: 102,
        managerId: 202,
        date: "2025-01-15",
    },
    {
        id: 3,
        title: "Training Program",
        description: "Payment for online training program.",
        status: "Pending",
        employeeId: 103,
        managerId: 201,
        date: "2025-01-18",
    },
    {
        id: 4,
        title: "Office Supplies",
        description: "Reimbursement for office supplies purchase.",
        status: "Approved",
        employeeId: 104,
        managerId: 202,
        date: "2025-01-20",
    },
    {
        id: 5,
        title: "Client Dinner",
        description: "Reimbursement for dinner with a client.",
        status: "Pending",
        employeeId: 101,
        managerId: 201,
        date: "2025-01-25",
    },
];

// Fetch all requests
export const getAllRequests = async (): Promise<Request[]> => {
    return request;
    //   const response = await fetch(API_URL);
    //   if (!response.ok) {
    //     throw new Error('Failed to fetch requests');
    //   }
    //   return await response.json();
};

// Create a new request
export const createRequest = async (
    newRequest: Partial<Request>
): Promise<Request> => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newRequest),
    });
    if (!response.ok) {
        throw new Error("Failed to create request");
    }
    return await response.json();
};

// Fetch requests filtered by a date range
export const getRequestsByDate = async (
    startDate: string,
    endDate: string
): Promise<Request[]> => {
    const response = await fetch(
        `${API_URL}?startDate=${startDate}&endDate=${endDate}`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch requests by date");
    }
    return await response.json();
};

// Update a request
export const updateRequest = async (
    id: number,
    updatedRequest: Partial<Request>
): Promise<Request> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRequest),
    });
    if (!response.ok) {
        throw new Error("Failed to update request");
    }
    return await response.json();
};

// Delete a request
export const deleteRequest = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete request");
    }
};

// Fetch history requests based on date range
export const getHistoryRequests = async (
    from: string,
    to: string
): Promise<Request[]> => {
    try {
        const response = await fetch(
            `${API_URL}/history?from=${from}&to=${to}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch history requests");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getManagerPendingRequests = async (): Promise<Request[]> => {
    const response = await fetch(`${API_URL}/manager-pending`);
    if (!response.ok)
        throw new Error("Failed to fetch manager pending requests");
    return await response.json();
};

export const getAccountManagerPendingRequests = async (): Promise<
    Request[]
> => {
    const response = await fetch(`${API_URL}/account-manager-pending`);
    if (!response.ok)
        throw new Error("Failed to fetch account manager pending requests");
    return await response.json();
};
