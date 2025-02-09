import { Request, RequestPayload } from "../types/Request";
import axios from "axios";
import { getUserIdFromToken } from "../utils/jwt.utils";
import Logger from "../utils/logger";

const API_URL = "/api/requests"; // Replace with your actual backend URL

/**
 * Fetches all requests from the backend.
 * @returns A list of requests.
 */
export const getRequests = async () => {
    try {
        const token = localStorage.getItem("token");
        const userId = getUserIdFromToken();
        const response = await axios.get(`${API_URL}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        Logger.error("Error fetching requests:", error);
        throw error;
    }
};

/**
 * Sends a new expense request to the backend.
 * @param request - The request data.
 * @returns The created request response.
 */
export const createRequest = async (request: RequestPayload) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_URL}`, request, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        Logger.error("Error creating request:", error);
        throw error;
    }
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
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(
            `${API_URL}?startDate=${from}&endDate=${to}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            Logger.error(error.message, error);
        } else {
            Logger.error("An unknown error occurred", error);
        }
        throw error;
    }
};

export const getManagerPendingRequests = async (): Promise<Request[]> => {
    const token = localStorage.getItem("token");
    try {
        const userId = getUserIdFromToken();
        const response = await axios.get(
            `${API_URL}/${userId}/manager-pending`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        Logger.error("Error fetching manager pending requests:", error);
        throw error;
    }
};

export const getAccountManagerPendingRequests = async (): Promise<
    Request[]
> => {
    const response = await fetch(`${API_URL}/account-manager-pending`);
    if (!response.ok)
        throw new Error("Failed to fetch account manager pending requests");
    return await response.json();
};
