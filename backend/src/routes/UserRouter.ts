import { Router } from "./Router";
import { SecretsService } from "../controllers/SecretsService";
import { UserManager } from "../controllers/UserManager";
import authenticate from "../middleware/authMiddleware";
import { Request, Response } from "express";
import { AuthRequest } from "../types/AuthRequest";

export class UserRouter extends Router {
  protected setServices(): void {
    this.services = new Map();
    this.services.set("PUT /signup", async (req: any, res: any) => {
      const { email, password, displayName, userName, icon } = req.body;

      if (!email || !password || !displayName || !userName) {
        return res.status(400);
      }
      const encryptedPassword = await SecretsService.encrypt(password);

      try {
        const { id: userId } = await UserManager.createAccount(
          email,
          encryptedPassword,
          displayName,
          userName,
          icon
        );
        res.json({ token: SecretsService.createToken(userId) });
      } catch (err) {
        console.log(err);
        res.status(500);
      }
    });
    this.services.set("GET /auth_valid", (req: Request, res: Response) => {
      authenticate(req, res, (req: AuthRequest, res: Response) => {
        const user = req.user;
        res.send(!!user);
      });
    });
  }
}
