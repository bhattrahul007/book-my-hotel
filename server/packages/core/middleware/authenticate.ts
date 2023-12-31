import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const authenticateRequestToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["auth_token"];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      req.userId = (decoded as JwtPayload).userId;
      return next();
    } catch (error) {
      console.log(error);
    }
  }
  return res.status(401).json({ message: "unauthorized" });
};
