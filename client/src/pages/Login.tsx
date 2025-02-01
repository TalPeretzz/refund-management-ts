import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import "../styles/LoginPage.css";

const Login: React.FC = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            await login(username, password);
        } catch (err) {
            console.log("Login failed:", err);
            setError("Invalid username or password.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <svg
                    width="200"
                    height="200"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="100"
                        cy="100"
                        r="95"
                        fill="url(#gradient)"
                        stroke="#2eac68"
                        strokeWidth="5"
                    />

                    <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fontSize="80"
                        fontWeight="bold"
                        fill="white"
                        fontFamily="Arial, sans-serif"
                    >
                        $
                    </text>

                    <rect
                        x="60"
                        y="40"
                        width="80"
                        height="120"
                        rx="10"
                        ry="10"
                        fill="white"
                        stroke="#2eac68"
                        strokeWidth="5"
                    />
                    <line
                        x1="75"
                        y1="60"
                        x2="125"
                        y2="60"
                        stroke="#2eac68"
                        strokeWidth="3"
                    />
                    <line
                        x1="75"
                        y1="80"
                        x2="125"
                        y2="80"
                        stroke="#2eac68"
                        strokeWidth="3"
                    />
                    <line
                        x1="75"
                        y1="100"
                        x2="125"
                        y2="100"
                        stroke="#2eac68"
                        strokeWidth="3"
                    />

                    <defs>
                        <linearGradient
                            id="gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <stop
                                offset="0%"
                                style={{ stopColor: "#2eac68", stopOpacity: 1 }}
                            />
                            <stop
                                offset="100%"
                                style={{ stopColor: "#38a169", stopOpacity: 1 }}
                            />
                        </linearGradient>
                    </defs>
                </svg>

                <h1 className="app-name">Expense Reimbursement</h1>

                <div className="login-form">
                    <h1>Welcome Back</h1>
                    {error && <p className="error-message">{error}</p>}
                    <InputField
                        label="Username"
                        type="text"
                        value={username}
                        placeholder="Enter your username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <InputField
                        label="Password"
                        type="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button text="Login" onClick={handleLogin} />
                    <p className="small-text">
                        © 2025 Refund Management System
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
