import { Router } from "./Router";
import { Request, Response } from "express";

export class ProjectRouter extends Router {
  protected setServices(): void {
    this.services = new Map();
    this.services.set("GET /create", this.getProjectCreate);
    this.services.set("GET /id/:projectId", this.getProjectPage);
    this.services.set("GET /id/:projectId/chatlog", this.getProjectChatlog);
    this.services.set(
      "GET /id/:projectId/configuration",
      this.getProjectConfiguration
    );
    this.services.set(
      "GET /id/:projectId/notification",
      this.getProjectNotification
    );
    this.services.set("POST /create", this.postProjectCreate);
    this.services.set("POST /id/:projectId/chatlog", this.postProjectChatlog);
    this.services.set(
      "POST /id/:projectId/chatlog/search",
      this.postProjectChatlogSearch
    );
    this.services.set(
      "POST /id/:projectId/configuration",
      this.postProjectConfiguration
    );
    this.services.set("POST /id/:projectId/delete", this.postProjectDelete);
    this.services.set(
      "POST /id/:projectId/notification",
      this.postProjectNotification
    );
    this.services.set("POST /id/:projectId/search", this.postProjectSearch);
  }

  private getProjectCreate(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private getProjectPage(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private getProjectChatlog(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private getProjectConfiguration(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private getProjectNotification(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private postProjectCreate(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private postProjectChatlog(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private postProjectChatlogSearch(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private postProjectConfiguration(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private postProjectDelete(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private postProjectNotification(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private postProjectSearch(_: Request, res: Response): void {
    res.sendStatus(404);
  }
}
