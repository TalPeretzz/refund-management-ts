import React, { useEffect, useRef, useState } from "react";
import RequestCard from "./RequestCard";
import { Request } from "../../types/Request";
import {
    getAccountManagerPendingRequests,
    getManagerPendingRequests,
} from "../../services/requestService";
import Logger from "../../utils/logger";

interface PendingRequestsTabProps {
    role: string;
}

const PendingRequestsTab: React.FC<PendingRequestsTabProps> = ({ role }) => {
    const [pendingRequests, setPendingRequests] = useState<Request[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;

        hasFetched.current = true;

        if (role === "manager" || role === "account-manager") {
            const fetchPendingRequests = async () => {
                try {
                    if (role === "manager") {
                        const data = await getManagerPendingRequests();
                        setPendingRequests(data);
                        setLoading(false);
                    } else if (role === "account-manager") {
                        const data = await getAccountManagerPendingRequests();
                        setPendingRequests(data);
                        setLoading(false);
                    }
                } catch (error) {
                    Logger.error("Failed to fetch pending requests:", error);
                    setError(
                        "Failed to fetch pending requests. Please try again later."
                    );
                } finally {
                    setLoading(false);
                }
            };

            fetchPendingRequests();
        }
    }, [role]);

    return (
        <div className="pending-requests">
            <h2>Pending Requests</h2>
            {loading && <p>Loading requests...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {pendingRequests.length === 0 ? (
                <p>No pending requests at the moment.</p>
            ) : (
                pendingRequests.map((request) => (
                    <RequestCard
                        key={request.id}
                        role={role}
                        request={request}
                        showApproveReject={true}
                    />
                ))
            )}
        </div>
    );
};

export default PendingRequestsTab;
