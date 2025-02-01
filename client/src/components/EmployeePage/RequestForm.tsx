import React, { useState } from "react";

interface CreateRequestFormProps {
    handleCreateRequest: (request: {
        id: string;
        title: string;
        description: string;
        status: string;
        employeeId: string;
    }) => void;
    onSubmit: () => void;
}

const CreateRequestForm: React.FC<CreateRequestFormProps> = ({
    handleCreateRequest,
}) => {
    const [newRequestTitle, setNewRequestTitle] = useState("");
    const [newRequestDescription, setNewRequestDescription] = useState("");
    const [newRequestStatus, setNewRequestStatus] = useState("");
    const [newRequestEmployeeId, setNewRequestEmployeeId] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newRequest = {
            id: crypto.randomUUID(),
            title: newRequestTitle,
            description: newRequestDescription,
            status: newRequestStatus,
            employeeId: newRequestEmployeeId,
        };

        handleCreateRequest(newRequest);

        // Reset form fields
        setNewRequestTitle("");
        setNewRequestDescription("");
        setNewRequestStatus("");
        setNewRequestEmployeeId("");
    };

    return (
        <form onSubmit={handleSubmit} className="create-request-form">
            <h2>Create New Request</h2>

            <label>
                Title:
                <input
                    type="text"
                    name="title"
                    value={newRequestTitle}
                    onChange={(e) => setNewRequestTitle(e.target.value)}
                    placeholder="Enter request title"
                    required
                />
            </label>

            <label>
                Description:
                <textarea
                    name="description"
                    value={newRequestDescription}
                    onChange={(e) => setNewRequestDescription(e.target.value)}
                    placeholder="Enter request description"
                    rows={3}
                    required
                />
            </label>

            <label>
                amount:
                <input
                    type="text"
                    name="status"
                    value={newRequestStatus}
                    onChange={(e) => setNewRequestStatus(e.target.value)}
                    placeholder="Enter request status"
                    required
                />
            </label>

            <label>
                Employee ID:
                <input
                    type="text"
                    name="employeeId"
                    value={newRequestEmployeeId}
                    onChange={(e) => setNewRequestEmployeeId(e.target.value)}
                    placeholder="Enter employee ID"
                    required
                />
            </label>

            <button type="submit">Submit</button>
        </form>
    );
};

export default CreateRequestForm;
