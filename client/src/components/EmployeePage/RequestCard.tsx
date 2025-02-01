import React from "react";
import { Request } from "../../types/Request";

interface RequestCardProps {
    request: Request;
}

const RequestCard: React.FC<RequestCardProps> = ({ request }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Pending":
                return "orange";
            case "Approved":
                return "green";
            case "Rejected":
                return "red";
            case "Waiting for Account":
                return "blue";
            default:
                return "gray";
        }
    };

    return (
        <div
            className="request-card"
            style={{
                borderLeft: `5px solid ${getStatusColor(request.status)}`,
            }}
        >
            <h3>{request.title}</h3>
            <p>{request.description}</p>
            <p>
                <strong>Status:</strong> {request.status}
            </p>
            <p>
                <strong>Date:</strong>{" "}
                {new Date(request.date).toLocaleDateString()}
            </p>
        </div>
    );
};

export default RequestCard;
