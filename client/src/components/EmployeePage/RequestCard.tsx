import React, { useState } from "react";
import { Request } from "../../types/Request";
import "../../styles/RequestCard.css";
import { updateRequestStatus } from "../../services/requestService";

interface RequestCardProps {
    request: Request;
    role: string;
    showApproveReject?: boolean;
}

const RequestCard: React.FC<RequestCardProps> = ({
    request,
    role,
    showApproveReject,
}) => {
    const [currentRequest, setCurrentRequest] = useState<Request>(request);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Pending":
                return "#ff9800"; // Orange
            case "Manager Approved":
                return "#2196F3"; // Blue
            case "Approved":
                return "#4caf50"; // Green
            case "Rejected":
                return "#f44336"; // Red
            default:
                return "#cccccc"; // Gray
        }
    };

    const onApprove = async () => {
        const status = role === "manager" ? "Manager Approved" : "Approved";
        const updatedRequest = await updateRequestStatus(request.id!, status);
        setCurrentRequest(updatedRequest);
    };
    const onReject = async () => {
        const updatedRequest = await updateRequestStatus(
            request.id!,
            "Rejected"
        );
        setCurrentRequest(updatedRequest);
    };

    const shouldShowApproveReject = (
        role: string,
        requestStatus: string,
        showApproveReject: boolean
    ) => {
        if (role === "manager") {
            return (
                showApproveReject &&
                role === "manager" &&
                !["Manager Approved", "Approved", "Rejected"].includes(
                    requestStatus
                )
            );
        }

        if (role === "account-manager") {
            return (
                showApproveReject &&
                role === "account-manager" &&
                !["Approved", "Rejected"].includes(requestStatus)
            );
        }
    };

    return (
        <div
            className="request-card"
            style={{
                borderLeft: `5px solid ${getStatusColor(currentRequest.status)}`,
            }}
        >
            <div className="card-content">
                <h1>
                    {role === "manager" || role === "account-manager"
                        ? currentRequest.employee?.FullName
                        : null}
                </h1>
                <h3>{currentRequest.title}</h3>
                <p>
                    <strong>Description:</strong> {currentRequest.description}
                </p>
                <p>
                    <strong>Status:</strong> {currentRequest.status}
                </p>
                <p>
                    <strong>Date:</strong> {currentRequest.date}
                </p>
                <p>
                    <strong>Amount:</strong> ${currentRequest.amount.toFixed(2)}
                </p>
            </div>
            {showApproveReject &&
                shouldShowApproveReject(
                    role,
                    currentRequest.status,
                    showApproveReject
                ) && (
                    <div className="button-container">
                        <button className="approve-button" onClick={onApprove}>
                            Approve
                        </button>
                        <button className="reject-button" onClick={onReject}>
                            Reject
                        </button>
                    </div>
                )}
        </div>
    );
};

export default RequestCard;
