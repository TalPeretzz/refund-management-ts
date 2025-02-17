import axios from "axios";
import Logger from "../utils/logger";

export const loginUser = async (username: string, password: string) => {
    try {
        const response = await axios.post("/api/auth/login", {
            username,
            password,
        });
        return response.data;
    } catch (error: any) {
        Logger.error("Login failed: User not found");
        throw new Error(error.response?.data?.message || "Login failed");
    }
};
