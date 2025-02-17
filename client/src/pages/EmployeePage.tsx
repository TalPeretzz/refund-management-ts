import React, { useState } from "react";
import "../styles/EmployeePage.css";
import "../styles/HistoryTab.css";
import "../styles/Modal.css";
import RequestTab from "../components/EmployeePage/RequestTab";
import HistoryTab from "../components/EmployeePage/HistoryTab";
// import {
//     getManagerPendingRequests,
//     getAccountManagerPendingRequests,
// } from "../services/requestService";
// import { Request } from "../types/Request";
import PendingRequestsTab from "../components/EmployeePage/PendingRequestsTab";
import Navbar from "../components/Navbar";

const EmployeePage: React.FC<{ role: string }> = ({ role }) => {
    const [activeTab, setActiveTab] = useState<
        "requests" | "history" | "pending"
    >("requests");

    return (
        <div className="employee-page">
            <Navbar />
            <div style={{ paddingTop: "80px" }}>
                <h1>
                    {role === "manager"
                        ? "Manager Dashboard"
                        : role === "account-manager"
                          ? "Account Manager Dashboard"
                          : "Employee Dashboard"}
                </h1>
                <div className="tabs">
                    <button
                        className={activeTab === "requests" ? "active" : ""}
                        onClick={() => setActiveTab("requests")}
                    >
                        Create & Open Requests
                    </button>
                    <button
                        className={activeTab === "history" ? "active" : ""}
                        onClick={() => setActiveTab("history")}
                    >
                        History
                    </button>
                    {(role === "manager" || role === "account-manager") && (
                        <button
                            className={activeTab === "pending" ? "active" : ""}
                            onClick={() => setActiveTab("pending")}
                        >
                            Pending Requests
                        </button>
                    )}
                </div>
                <div className="tab-content">
                    {activeTab === "requests" && <RequestTab role={role} />}
                    {activeTab === "history" && <HistoryTab role={role} />}
                    {activeTab === "pending" && (
                        <PendingRequestsTab role={role} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeePage;
