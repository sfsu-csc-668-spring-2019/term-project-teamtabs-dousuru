import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getDatabaseConnection } from "../db";
import { User } from "../models/User";
import authenticate from "../authMiddleware";
import { AuthRequest } from "../AuthRequest";

const router = express.Router();

async function encrypt(password: string): Promise<string> {
  const encrypted = await bcrypt.hash(password, 5);
  return encrypted;
}

router.put("/signup", async (req, res) => {
  // 1. get email and password from body
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400);
  }
  // 2. encrypt the password
  const encryptedPassword = await encrypt(password);

  // 3. save to database
  const conn = await getDatabaseConnection();
  let user = new User();
  user.email = email;
  user.password = encryptedPassword;
  const userObj = await conn.manager.save(user);
  const userId = userObj.id;

  // 4. generate token
  const token = jwt.sign({ userId }, process.env.APP_SECRET);

  // 5. respond with token
  res.json({ token });
});

router.get("/auth_valid", authenticate, (req: AuthRequest, res) => {
  const user = req.user;
  res.send(!!user);
});

export default router;
