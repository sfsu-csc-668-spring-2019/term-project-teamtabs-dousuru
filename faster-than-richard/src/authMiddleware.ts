import { Response, NextFunction } from "express";
import { AuthRequest } from "./AuthRequest";
import jwt from "jsonwebtoken";
import { User } from "./models";

interface TokenObject {
  userId: number;
}

export default async function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.body.authToken;
  if (!token) {
    return next();
  }
  try {
    // 1. get user id
    const payload = jwt.verify(token, process.env.APP_SECRET) as TokenObject;
    const userId = payload.userId;

    // 2. get user from database
    req.user = await User.findOne(userId);
  } finally {
    next();
  }
}
