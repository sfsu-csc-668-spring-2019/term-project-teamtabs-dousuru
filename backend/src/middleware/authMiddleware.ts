import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/AuthRequest";
import { SecretsService } from "../controllers/SecretsService";
import { User } from "../entity";

export default async function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  let token = req.header("Authorization");
  if (!token) {
    return next();
  }
  try {
    // 1. get user id
    const payload = SecretsService.verifyToken(token);
    const userId = payload.userId;

    // 2. get user from database
    req.user = await User.findOne(userId);
  } catch (err) {
    console.error("Invalid auth token");
  } finally {
    next();
  }
}
