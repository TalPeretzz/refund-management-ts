import React from "react";

interface EmployeeSearchProps {
    onSearch: (query: string) => void;
}

const EmployeeSearch: React.FC<EmployeeSearchProps> = ({ onSearch }) => {
    return (
        <div className="employee-search">
            <input
                type="text"
                placeholder="Search for an employee..."
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
};

export default EmployeeSearch;
