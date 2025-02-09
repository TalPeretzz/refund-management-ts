import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models";
import { IManager, IUser } from "../types/IUser";
import Logger from "../utils/logget";

class UserService {
  private users: IUser[] = [];
  constructor() {
    this.initializeUsers();
  }

  private async initializeUsers() {
    this.users = await this.getAllUsers();
  }

  /**
   * Authenticate a user and return a JWT token.
   * @param username - The username provided by the user.
   * @param password - The password provided by the user.
   * @returns The authentication token and the user's role.
   */
  static async login(
    username: string,
    password: string
  ): Promise<{ token: string; role: string }> {
    const user = await db.User.findOne({ where: { Username: username } });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.Password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.UserId, role: user.Role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    return { token, role: user.Role };
  }

  /**
   * Retrieves all users from the database.
   * @returns An array of IUser objects.
   * @throws An error if the retrieval fails.
   */

  async getAllUsers(managerId?: string): Promise<IUser[]> {
    try {
      /*
      {
        include: {
          model: db.EmployeeManager,
          as: "Employees",
          where: managerId ? { managerId } : undefined,
          required: false,
        },
      }
         */
      const users = await db.User.findAll();
      this.users = users.map((user) => user.get({ plain: true })) as IUser[];
      return this.users;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to retrieve users: ${error.message}`);
      } else {
        throw new Error("Failed to retrieve users: Unknown error");
      }
    }
  }

  /**
   * Creates a new user in the database.
   * @param user - The user object containing user details (without the UserId, which is auto-generated).
   * @returns The created user as an IUser object.
   * @throws An error if the user creation fails.
   */
  async createUser(user: Omit<IUser, "UserId">): Promise<IUser> {
    try {
      const newUser = await db.User.create({
        FullName: user.FullName,
        Email: user.Email,
        Username: user.Username,
        Password: user.Password,
        Role: user.Role,
        IsActive: user.IsActive ?? true,
      });

      this.assignManager(newUser.UserId!, user.ManagerId!);

      // Convert Sequelize instance to plain object
      return newUser.get({ plain: true }) as IUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create user: ${error.message}`);
      } else {
        throw new Error("Failed to create user: Unknown error");
      }
    }
  }

  /**
   * Updates a user in the database.
   * @param userId - The ID of the user to update.
   * @param updates - Partial user object with fields to update.
   * @returns The updated user object.
   * @throws An error if the user is not found or the update fails.
   */
  async updateUser(userId: string, updates: Partial<IUser>): Promise<IUser> {
    try {
      // Find the user by ID
      const user = await db.User.findByPk(userId);

      if (!user) {
        throw new Error(`User with ID ${userId} not found.`);
      }

      // Update the user with new fields
      const updatedUser = await user.update(updates);
      if (updates.ManagerId) this.assignManager(userId, updates.ManagerId!);

      // Return the updated user as an IUser object
      return updatedUser.get() as IUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update user: ${error.message}`);
      } else {
        throw new Error("Failed to update user: Unknown error");
      }
    }
  }

  /**
   * get all managers
   * @returns An array of IUser objects.
   * @throws An error if the retrieval fails.
   */
  async getMangers(): Promise<IManager[]> {
    try {
      const manager = this.users
        .filter((user) => user.Role === "manager" && user.UserId !== undefined)
        .map((user) => ({ FullName: user.FullName, UserId: user.UserId! }));
      return manager;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to retrieve managers: ${error.message}`);
      } else {
        throw new Error("Failed to retrieve managers: Unknown error");
      }
    }
  }

  async assignManager(employeeId: string, managerId: string) {
    try {
      return await db.EmployeeManager.create({
        employeeId,
        managerId,
      });
    } catch (error) {
      if (error instanceof Error) {
        Logger.error(`Failed to assign manager: ${error.message}`);
      } else {
        Logger.error("Failed to assign manager: Unknown error");
      }
      throw new Error(`Failed to assign manager`);
    }
  }

  static generateToken(user: any) {
    return jwt.sign(
      { id: user.UserId, role: user.Role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );
  }
}

export default UserService;
