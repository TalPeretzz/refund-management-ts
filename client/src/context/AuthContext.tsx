import React, { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    user: { username: string; role: string } | null;
    login: (username: string, password: string) => Promise<void>;
    isLoading: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<{ username: string; role: string } | null>(
        null
    );
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
            localStorage.setItem("user", JSON.stringify({ username, role }));
            setUser({ username, role });
            console.log("role", role);
            if (role === "admin") {
                navigate("/admin");
                return;
            }
            navigate("/employee");
        } catch (error) {
            if (error instanceof Error) {
                console.error("Login failed:", error.message);
            } else {
                console.error("Login failed:", error);
            }
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
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
