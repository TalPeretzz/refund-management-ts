import React, { useState } from "react";
import RequestCard from "./RequestCard";
import { Request } from "../../types/Request";
import { getHistoryRequests } from "../../services/requestService";
import Logger from "../../utils/logger";

interface roleProps {
    role: string;
}

const HistoryTab: React.FC<roleProps> = ({ role }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [requests, setRequests] = useState<Request[]>([]);
    const [errorMessage, setErrorMessage] = useState("");

    const validateDates = () => {
        if (startDate && endDate) {
            if (new Date(startDate) > new Date(endDate)) {
                setErrorMessage("Start Date cannot be later than End Date.");
                return false;
            } else {
                setErrorMessage("");
                return true;
            }
        }
        return true;
    };

    const handleSearch = async () => {
        if (validateDates() && startDate && endDate) {
            try {
                const data = await getHistoryRequests(startDate, endDate);
                setRequests(data);
                setErrorMessage(""); // Clear error messages
            } catch (error) {
                Logger.error(
                    "Failed to fetch history. Please try again later.",
                    error
                );
                setErrorMessage(
                    "Failed to fetch history. Please try again later."
                );
            }
        } else {
            setErrorMessage("Please select both Start Date and End Date.");
        }
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        setStartDate(selectedDate);
        if (endDate && new Date(selectedDate) > new Date(endDate)) {
            setErrorMessage("Start Date cannot be later than End Date.");
        } else {
            setErrorMessage("");
        }
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        setEndDate(selectedDate);
        if (startDate && new Date(startDate) > new Date(selectedDate)) {
            setErrorMessage("End Date cannot be earlier than Start Date.");
        } else {
            setErrorMessage("");
        }
    };

    const isTimeFrameEntered = () => {
        return startDate && endDate;
    };

    const handleApprove = () => {
        alert("Request Approved!");
        // Add your approval logic here
    };

    const handleReject = () => {
        alert("Request Rejected!");
        // Add your rejection logic here
    };

    return (
        <div className="history-tab">
            <div className="date-filters">
                <label>
                    Start Date:
                    <input
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        max={endDate || ""}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        min={startDate || ""}
                    />
                </label>
                <button className="search-button" onClick={handleSearch}>
                    Search
                </button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="request-list">
                {requests.length === 0 && !isTimeFrameEntered ? (
                    <p>No historical requests for the selected time frame.</p>
                ) : (
                    requests.map((request) => (
                        <RequestCard
                            key={request.id}
                            role={role}
                            request={request}
                            onApprove={handleApprove}
                            onReject={handleReject}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default HistoryTab;
