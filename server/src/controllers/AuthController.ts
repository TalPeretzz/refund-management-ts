import { Request, Response, RequestHandler } from "express";
import AuthService from "../services/AuthService";

class AuthController {
  /**
   * Login endpoint handler.
   */
  static login: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { username, password } = req.body;

    try {
      const { token, role } = await AuthService.authenticate(
        username,
        password
      );
      res.json({ token, role });
    } catch (error) {
      if (
        error instanceof Error &&
        (error.message === "User not found" ||
          error.message === "Invalid credentials")
      ) {
        res.status(401).json({ message: error.message });
      } else {
        res
          .status(500)
          .json({
            message: "An error occurred",
            error: (error as Error).message,
          });
      }
    }
  };
}

export default AuthController;
