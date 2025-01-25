import React, { useState, useEffect } from "react";
import "../styles/EmployeePage.css";
import RequestTab from "../components/EmployeePage/RequestTab";
import HistoryTab from "../components/EmployeePage/HistoryTab";
import { getManagerPendingRequests, getAccountManagerPendingRequests } from "../services/requestService";
import { Request } from "../types/Request";
import PendingRequestsTab from "../components/EmployeePage/PendingRequestsTab";

const EmployeePage: React.FC<{ role: string }> = ({ role }) => {
  const [activeTab, setActiveTab] = useState<"requests" | "history" | "pending">("requests");
  const [pendingRequests, setPendingRequests] = useState<Request[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (role === "manager" || role === "account-manager") {
      const fetchPendingRequests = async () => {
        try {
          if (role === "manager") {
            const data = await getManagerPendingRequests();
            setPendingRequests(data);
          } else if (role === "account-manager") {
            const data = await getAccountManagerPendingRequests();
            setPendingRequests(data);
          }
        } catch (error) {
          setErrorMessage("Failed to fetch pending requests. Please try again later.");
        }
      };

      fetchPendingRequests();
    }
  }, [role]);

  return (
    <div className="employee-page">
      <h1>{role === "manager" ? "Manager Dashboard" : role === "account-manager" ? "Account Manager Dashboard" : "Employee Dashboard"}</h1>
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
        {activeTab === "requests" && <RequestTab />}
        {activeTab === "history" && <HistoryTab />}
        {activeTab === "pending" && (
          <PendingRequestsTab
            pendingRequests={pendingRequests}
            errorMessage={errorMessage}
          />
        )}
      </div>
    </div>
  );
};

export default EmployeePage;
