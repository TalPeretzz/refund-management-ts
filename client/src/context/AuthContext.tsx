import React, { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Logger from "../utils/logger";

interface AuthContextType {
    user: { username: string; role: string; id: string } | null;
    login: (username: string, password: string) => Promise<void>;
    isLoading: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<{
        username: string;
        role: string;
        id: string;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const { token, role } = await loginUser(username, password);
            localStorage.setItem("token", token);
            const decoded: { username: string; role: string; id: string } =
                jwtDecode(token);
            localStorage.setItem(
                "user",
                JSON.stringify({ username, role, id: decoded.id })
            );
            setUser({ username, role, id: decoded.id });
            if (role === "admin") {
                navigate("/admin");
                return;
            }
            navigate("/employee");
        } catch (error) {
            if (error instanceof Error) {
                Logger.error("Login failed:", error.message);
            } else {
                Logger.error("Login failed:", error);
            }
            throw new Error("Login failed");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        Logger.warn("context", context);
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
