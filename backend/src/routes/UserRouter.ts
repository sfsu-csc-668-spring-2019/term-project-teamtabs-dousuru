import { Router } from "./Router";
import { SecretsService } from "../controllers/SecretsService";
import { UserManager } from "../controllers/UserManager";
import authenticate from "../middleware/authMiddleware";
import { Request, Response } from "express";
import { AuthRequest } from "../types/AuthRequest";

export class UserRouter extends Router {
  protected setServices(): void {
    this.services = new Map();
    this.services.set("PUT /signup", this.signUp);
    this.services.set("GET /auth_valid", this.authValid);
  }

  private async signUp(req: Request, res: Response): Promise<void> {
    const { email, password, displayName, userName, icon } = req.body;
    if (!email || !password || !displayName || !userName) {
      res.status(400);
      return;
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
  }

  private authValid(req: Request, res: Response): void {
    authenticate(req, res, (req: AuthRequest, res: Response) => {
      res.send(!!req.user);
    });
  }
}
