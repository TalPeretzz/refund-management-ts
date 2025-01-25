import React, { useState } from "react";
import RequestCard from "./RequestCard";
import { Request } from "../../types/Request";

const RequestTab: React.FC = () => {
    const [requests, setRequests] = useState<Request[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [newRequestTitle, setNewRequestTitle] = useState("");
    const [newRequestDescription, setNewRequestDescription] = useState("");

    const handleCreateRequest = () => {
        const newRequest: Request = {
            id: requests.length + 1,
            title: newRequestTitle,
            description: newRequestDescription,
            employeeId: requests.length + 1,
            managerId: 1,
            status: "Pending",
            date: new Date().toISOString(),
        };
        setRequests((prev) => [...prev, newRequest]);
        setModalOpen(false);
        setNewRequestTitle("");
        setNewRequestDescription("");
    };

    return (
        <div className="request-tab">
            <button onClick={() => setModalOpen(true)}>
                Create New Request
            </button>
            <h2>Open Requests</h2>
            <div className="request-list">
                {requests.map((request) => (
                    <RequestCard key={request.id} request={request} />
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
        </div>
    );
};

export default RequestTab;
