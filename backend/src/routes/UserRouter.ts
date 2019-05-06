import { Router } from "./Router";
import { SecretsService } from "../controllers/SecretsService";
import { UserManager } from "../controllers/UserManager";
import authenticate from "../middleware/authMiddleware";
import { Request, Response } from "express";
import { AuthRequest } from "../types/AuthRequest";

export class UserRouter extends Router {
  protected setServices(): void {
    this.services = new Map();
    this.services.set("GET /auth_valid", this.getAuthValid);
    this.services.set("GET /search", this.getUserSearch);
    this.services.set("GET /id/:userId", this.getUserPage);
    this.services.set(
      "GET /id/:userId/configuration",
      this.getUserConfiguration
    );
    this.services.set("GET /id/:userId/notification", this.getUserNotification);
    this.services.set(
      "GET /id/:userId/chatlog/id/:chatId",
      this.getUserChatlog
    );
    this.services.set("POST /search", this.postUserSearch);
    this.services.set(
      "POST /id/:userId/configuration",
      this.postUserConfiguration
    );
    this.services.set(
      "POST /id/:userId/notification",
      this.postUserNotification
    );
    this.services.set(
      "POST /id/:userId/chatlog/id/:chatId",
      this.postUserChatlog
    );
    this.services.set(
      "POST /id/:userId/chatlog/id/:chatId/search",
      this.postUserChatlogSearch
    );
    this.services.set("POST /id/:userId/search", this.postUserSearchContents);
    this.services.set("PUT /signup", this.putUserSignup);
  }

  private getAuthValid(req: Request, res: Response): void {
    authenticate(req, res, (req: AuthRequest, res: Response) => {
      res.send(!!req.user);
    });
  }

  private getUserSearch(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private getUserPage(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private getUserConfiguration(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private getUserNotification(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private getUserChatlog(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private postUserSearch(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private postUserConfiguration(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private postUserNotification(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private postUserChatlog(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private postUserChatlogSearch(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private postUserSearchContents(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private async putUserSignup(req: Request, res: Response): Promise<void> {
    const { email, password, displayName, userName, icon } = req.body;
    if (!email || !password || !displayName || !userName) {
      res.sendStatus(400);
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
      res.sendStatus(500);
    }
  }
}
