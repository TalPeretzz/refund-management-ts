import React, { useCallback, useEffect, useState } from "react";
import RequestCard from "./RequestCard";
import { Request } from "../../types/Request";
import Modal from "../Modal";
import CreateRequestForm from "./RequestForm";
import { getRequests } from "../../services/requestService";
import Logger from "../../utils/logger";

interface RequestTabProps {
    role: string;
}

const RequestTab: React.FC<RequestTabProps> = ({ role }) => {
    const [requests, setRequests] = useState<Request[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchRequests = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getRequests();
            setRequests(data);
        } catch (err) {
            Logger.error("Error fetching requests:", err);
            setError("Failed to load requests.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const handleCreateRequest = async () => {
        await fetchRequests();
        setModalOpen(false);
    };

    return (
        <div className="request-tab">
            <button
                className="create-request-button"
                onClick={() => setModalOpen(true)}
            >
                Create New Request
            </button>
            <h2>Open Requests</h2>
            {loading && <p>Loading requests...</p>}
            {error && <p className="error-message">{error}</p>}
            <div className="request-list">
                {requests.map((request) => (
                    <RequestCard
                        key={request.id}
                        request={request}
                        role={role}
                        showApproveReject={false}
                    />
                ))}
            </div>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                    <CreateRequestForm onSubmit={handleCreateRequest} />
                </Modal>
            )}
        </div>
    );
};

export default RequestTab;
