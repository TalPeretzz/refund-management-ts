import { Request, Response } from "express";
import UserService from "../services/UserService";
import { IUser } from "../types/IUser";

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  /**
   * Retrieves all users
   */
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json({ data: users });
    } catch (error) {
      res.status(500).json({
        message: "Failed to retrieve users",
        error: (error as Error).message,
      });
    }
  }

  /**
   * Creates a new user
   */
  async createUser(req: Request, res: Response): Promise<void> {
    const user: IUser = req.body;

    try {
      // Validate user input
      if (!user.FullName || !user.Email || !user.Role) {
        res
          .status(400)
          .json({ message: "Missing required fields: name, email, or role" });
        return;
      }

      const newUser = await this.userService.createUser(user);
      res
        .status(201)
        .json({ message: "User created successfully", data: newUser });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create user",
        error: (error as Error).message,
      });
    }
  }

  async getAllManagers(req: Request, res: Response): Promise<void> {
    try {
      const managers = await this.userService.getMangers();
      res.status(200).json({ data: managers });
    } catch (error) {
      res.status(500).json({
        message: "Failed to retrieve managers",
        error: (error as Error).message,
      });
    }
  }

  /**
   * Updates an existing user
   */
  async updateUser(req: Request, res: Response): Promise<void> {
    const userId: string = req.params.id;
    const updates: Partial<IUser> = req.body;
    console.log("updates", updates);
    try {
      if (!userId) {
        res.status(400).json({ message: "Missing user ID" });
        return;
      }

      const updatedUser = await this.userService.updateUser(userId, updates);
      res
        .status(200)
        .json({ message: "User updated successfully", data: updatedUser });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update user",
        error: (error as Error).message,
      });
    }
  }

  async getuserByID(req: Request, res: Response): Promise<void> {
    const userId: string = req.params.id;
    try {
      if (!userId) {
        res.status(400).json({ message: "Missing user ID" });
        return;
      }

      const user = await this.userService.getUserById(userId);
      res.status(200).json({ data: user });
    } catch (error) {
      res.status(500).json({
        message: "Failed to retrieve user",
        error: (error as Error).message,
      });
    }
  }
}

export default UserController;
