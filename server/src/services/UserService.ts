import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models";
import { IUser } from "../types/IUser";
import { ModelAttributes } from "sequelize";

class UserService {
  constructor() {}

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
    const user = await db.User.findOne({ where: { username } });
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

  async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await db.User.findAll();
      return users.map((user) => user.get({ plain: true })) as IUser[];
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
      console.log("user", user);
      // Use Sequelize's `create` method to insert a new user
      const newUser = await db.User.create({
        FullName: user.FullName,
        Email: user.Email,
        Username: user.Username,
        Password: user.Password,
        Role: user.Role,
        IsActive: user.IsActive ?? true, // Default to true if not provided
      });

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

  static generateToken(user: any) {
    return jwt.sign(
      { id: user.UserId, role: user.Role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );
  }
}

export default UserService;
