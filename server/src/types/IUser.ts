export interface IUser {
  UserId?: string; // Optional because it's auto-generated
  FullName: string;
  Email: string;
  Username: string;
  Password: string;
  Role: "employee" | "manager" | "account-manager" | "admin";
  IsActive?: boolean; // Default value is true
  ManagerId?: string;
}

export interface IManager {
  UserId: string;
  FullName: string;
}
