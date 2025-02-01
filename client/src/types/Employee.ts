export interface Employee {
    UserId?: string; // Matches the backend's unique identifier
    FullName: string; // Full name of the employee
    Email: string; // Email address of the employee
    Username: string; // Username of the employee
    Role: "employee" | "manager" | "account-manager" | "admin"; // Role of the employee
    IsActive: boolean; // Whether the employee is active
    Password?: string; // Password (only used when creating a new employee)
}
