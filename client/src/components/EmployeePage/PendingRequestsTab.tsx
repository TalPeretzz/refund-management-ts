import React from "react";
import RequestCard from "./RequestCard";
import { Request } from "../../types/Request";

interface PendingRequestsTabProps {
    pendingRequests: Request[];
    errorMessage: string;
}

const PendingRequestsTab: React.FC<PendingRequestsTabProps> = ({
    pendingRequests,
    errorMessage,
}) => {
    return (
        <div className="pending-requests">
            <h2>Pending Requests</h2>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {pendingRequests.length === 0 ? (
                <p>No pending requests at the moment.</p>
            ) : (
                pendingRequests.map((request) => (
                    <RequestCard key={request.id} request={request} />
                ))
            )}
        </div>
    );
};

export default PendingRequestsTab;
