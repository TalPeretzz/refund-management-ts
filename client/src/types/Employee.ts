export interface Employee {
  id: number; // Unique identifier
  username: string; // Username of the employee
  fullName: string; // Full name of the employee
  role: string; // Role (e.g., Manager, Employee, etc.)
  manager: string; // Name of the manager
  email: string; // Email address
  password?: string; // Password (only required for new employees)
}
