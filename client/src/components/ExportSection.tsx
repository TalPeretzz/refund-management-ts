import React, { useState } from "react";
import { exportToCSV, exportToExcel, exportToPDF } from "../utils/exportUtils";

interface ExportSectionProps {
    requests: any;
}

const ExportSection: React.FC<ExportSectionProps> = ({ requests }) => {
    const [exportType, setExportType] = useState("csv");

    const handleExport = () => {
        switch (exportType) {
            case "csv":
                exportToCSV(requests, "history_requests");
                break;
            case "pdf":
                exportToPDF(requests, "history_requests");
                break;
            case "excel":
                exportToExcel(requests, "history_requests");
                break;
        }
    };

    return (
        <div className="export-section">
            <label>
                Export As:
                <select
                    value={exportType}
                    onChange={(e) => setExportType(e.target.value)}
                >
                    <option value="csv">CSV</option>
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                </select>
            </label>
            <button className="export-button" onClick={handleExport}>
                Export
            </button>
        </div>
    );
};

export default ExportSection;
