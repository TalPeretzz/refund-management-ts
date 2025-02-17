import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { createRequest } from "../../services/requestService";
import { RequestPayload } from "../../types/Request";
import Logger from "../../utils/logger";

interface CreateRequestFormProps {
    onSubmit: () => void;
}

const CreateRequestForm: React.FC<CreateRequestFormProps> = ({ onSubmit }) => {
    const { user } = useAuth();
    const [newRequestTitle, setNewRequestTitle] = useState("");
    const [newRequestDescription, setNewRequestDescription] = useState("");
    const [newRequestAmount, setNewRequestAmount] = useState<number | "">("");
    const [attachment, setAttachment] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Function to handle file upload and convert to Base64
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setErrorMessage("File size must be less than 5MB.");
            return;
        }
        setAttachment(file);
        setErrorMessage("");

        // const reader = new FileReader();
        // reader.onloadend = () => {
        //     setAttachment(reader.result as string);
        //     setErrorMessage("");
        // };
        // reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user?.id || newRequestAmount === "") {
            setErrorMessage("All fields are required.");
            return;
        }

        const requestPayload: RequestPayload = {
            title: newRequestTitle,
            description: newRequestDescription,
            amount: Number(newRequestAmount),
            attachment: attachment,
            employeeId: user.id,
        };

        try {
            setLoading(true);
            await createRequest(requestPayload);
            onSubmit();

            // Reset form
            setNewRequestTitle("");
            setNewRequestDescription("");
            setNewRequestAmount("");
            setAttachment(null);
            setErrorMessage("");
        } catch (error) {
            Logger.error("Failed to submit request. Please try again.", error);
            setErrorMessage("Failed to submit request. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="create-request-form">
            <h2>Create New Request</h2>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <label>
                Title:
                <input
                    type="text"
                    value={newRequestTitle}
                    onChange={(e) => setNewRequestTitle(e.target.value)}
                    required
                />
            </label>

            <label>
                Description:
                <textarea
                    value={newRequestDescription}
                    onChange={(e) => setNewRequestDescription(e.target.value)}
                    rows={3}
                    required
                />
            </label>

            <label>
                Amount:
                <input
                    type="number"
                    value={newRequestAmount}
                    onChange={(e) =>
                        setNewRequestAmount(Number(e.target.value))
                    }
                    required
                />
            </label>

            <label>
                Attachments:
                <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                />
                {attachment && <p>File attached ✅</p>}
            </label>

            <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
            </button>
        </form>
    );
};

export default CreateRequestForm;
