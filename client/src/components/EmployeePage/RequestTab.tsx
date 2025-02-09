import React, { useEffect, useState } from "react";
import RequestCard from "./RequestCard";
import { Request } from "../../types/Request";
import Modal from "../Modal";
import CreateRequestForm from "./RequestForm";
import { getRequests } from "../../services/requestService";

interface RequestTabProps {
    role: string;
}

const RequestTab: React.FC<RequestTabProps> = ({ role }) => {
    const [requests, setRequests] = useState<Request[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [newRequestTitle, setNewRequestTitle] = useState("");
    const [newRequestDescription, setNewRequestDescription] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const data = await getRequests();
                setRequests(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load requests.");
                console.error("Error fetching requests:", err);
            } finally {
                // setError("No pending requests");
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    const handleApprove = () => {
        alert("Request Approved!");
        // Add your approval logic here
    };

    const handleReject = () => {
        alert("Request Rejected!");
        // Add your rejection logic here
    };

    const handleCreateRequest = () => {
        const newRequest: Request = {
            title: newRequestTitle,
            description: newRequestDescription,
            status: "Pending",
            date: new Date().toISOString(),
            amount: 0,
        };
        setRequests((prev) => [...prev, newRequest]);
        setModalOpen(false);
        setNewRequestTitle("");
        setNewRequestDescription("");
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
                        onApprove={handleApprove}
                        onReject={handleReject}
                    />
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button
                            className="modal-close"
                            onClick={() => setModalOpen(false)}
                        >
                            &times;
                        </button>
                        <h2>Create New Request</h2>
                        <label>
                            Title:
                            <input
                                type="text"
                                value={newRequestTitle}
                                onChange={(e) =>
                                    setNewRequestTitle(e.target.value)
                                }
                                placeholder="Enter request title"
                            />
                        </label>
                        <label>
                            Description:
                            <textarea
                                value={newRequestDescription}
                                onChange={(e) =>
                                    setNewRequestDescription(e.target.value)
                                }
                                placeholder="Enter request description"
                                rows={3}
                            />
                        </label>
                        <button onClick={handleCreateRequest}>Submit</button>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                    <CreateRequestForm onSubmit={handleCreateRequest} />
                </Modal>
            )}
        </div>
    );
};

export default RequestTab;
