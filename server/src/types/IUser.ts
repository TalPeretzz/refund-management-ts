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

export interface IEmployee {
  UserId?: string;
  FullName: string;
  Email: string;
  Role: "employee" | "manager" | "account-manager" | "admin";
  IsActive?: boolean;
  ManagerId?: string;
}

export const transformUser = (data: any): IUser => {
  return {
    UserId: data.UserId,
    FullName: data.FullName,
    Email: data.Email,
    Username: data.Username,
    Password: data.Password,
    Role: data.Role,
    IsActive: data.IsActive,
    ManagerId:
      data.Manager && data.Manager.ManagerUser
        ? data.Manager.ManagerUser.UserId
        : null,
  };
};
