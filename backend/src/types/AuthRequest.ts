import { Request } from "express";
import { User } from "../entity";

export interface AuthRequest extends Request {
  user?: User;
}
