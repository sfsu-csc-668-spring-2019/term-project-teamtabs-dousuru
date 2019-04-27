import express from "express";
import authenticate from "../authMiddleware";
import { AuthRequest } from "../AuthRequest";
import { SecretsService } from "../SecretsService";
import { UserManager } from "../UserManager";

const router = express.Router();

router.put("/signup", async (req, res) => {
  // 1. get email and password from body
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400);
  }
  // 2. encrypt the password
  const encryptedPassword = await SecretsService.encrypt(password);

  try {
    // 3. save to database
    const { id: userId } = await UserManager.createAccount(
      email,
      encryptedPassword
    );
    // 4. generate token
    const token = SecretsService.createToken(userId);

    // 5. respond with token
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

router.get("/auth_valid", authenticate, (req: AuthRequest, res) => {
  const user = req.user;
  res.send(!!user);
});

export default router;
