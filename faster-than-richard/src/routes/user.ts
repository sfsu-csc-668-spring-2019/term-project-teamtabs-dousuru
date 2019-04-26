import express from "express";
import { getDatabaseConnection } from "../db";
import { User } from "../models/User";

const router = express.Router();

router.put("/signup", async (req, res) => {
  const conn = await getDatabaseConnection();

  let user = new User();
  user.email = "test@test.com";
  const userObj = await conn.manager.save(user);
  res.json(userObj);
});

export default router;
