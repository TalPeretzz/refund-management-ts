import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface UserPayload extends JwtPayload {
  id: string;
  username: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}

export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Access denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT error:", error);
    res.status(403).json({ message: "Invalid token" });
    return;
  }
};
