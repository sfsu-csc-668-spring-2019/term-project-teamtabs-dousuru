import express from "express";
import authenticate from "../middleware/authMiddleware";
import { AuthRequest } from "../types/AuthRequest";
import { SecretsService } from "../controllers/SecretsService";
import { UserManager } from "../controllers/UserManager";

const router = express.Router();

router.put("/signup", async (req, res) => {
  // 1. get email and password from body
  console.log(123124125);
  console.log(req.body);
  const { email, password, displayName, userName, icon } = req.body;


  if (!email || !password || !displayName || !userName) {
    return res.status(400);
  }

  console.log( "WORDS EMAIL: " + email);
  // 2. encrypt the password
  const encryptedPassword = await SecretsService.encrypt(password);

  try {
    // 3. save to database
    const { id: userId } = await UserManager.createAccount(
      email,
      encryptedPassword,
      displayName,
      userName,
      icon
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
