import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models";

class AuthService {
  /**
   * Authenticate a user and return a JWT token.
   * @param username - The username provided by the user.
   * @param password - The password provided by the user.
   * @returns The authentication token and the user's role.
   */
  static async authenticate(
    username: string,
    password: string
  ): Promise<{ token: string; role: string }> {
    const user = await db.User.findOne({ where: { username } });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    return { token, role: user.role };
  }
}

export default AuthService;
