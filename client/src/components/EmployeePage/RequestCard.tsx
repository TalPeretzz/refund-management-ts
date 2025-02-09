import React from "react";
import { Request } from "../../types/Request";
import "../../styles/RequestCard.css";

interface RequestCardProps {
    request: Request;
    role: string;
    onApprove: () => void;
    onReject: () => void;
}

const RequestCard: React.FC<RequestCardProps> = ({
    request,
    role,
    onApprove,
    onReject,
}) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Pending":
                return "#ff9800"; // Orange
            case "Approved":
                return "#4caf50"; // Green
            case "Rejected":
                return "#f44336"; // Red
            default:
                return "#cccccc"; // Gray
        }
    };

    return (
        <div
            className="request-card"
            style={{
                borderLeft: `5px solid ${getStatusColor(request.status)}`,
            }}
        >
            <div className="card-content">
                <h1>
                    {role === "manager" || role === "account-manager"
                        ? (request?.employeeName ?? "test")
                        : ""}
                </h1>
                <h3>{request.title}</h3>
                <p>
                    <strong>Description:</strong> {request.description}
                </p>
                <p>
                    <strong>Status:</strong> {request.status}
                </p>
                <p>
                    <strong>Date:</strong> {request.date}
                </p>
                <p>
                    <strong>Amount:</strong> ${request.amount}
                </p>
            </div>
            {(role === "manager" || role === "account-manager") && (
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
