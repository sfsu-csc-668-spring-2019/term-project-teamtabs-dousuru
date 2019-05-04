import { Router } from "./Router";
import { Request, Response } from "express";

export class TaskRouter extends Router {
  protected setServices(): void {
    this.services = new Map();
    this.services.set("GET /create", this.getTaskCreate);
    this.services.set("GET /id/:taskId", this.getTaskPage);
    this.services.set("GET /id/:taskId/chatlog", this.getTaskChatlog);
    this.services.set(
      "GET /id/:taskId/configuration",
      this.getTaskConfiguration
    );
    this.services.set("GET /id:taskId/notification", this.getTaskNotification);
    this.services.set("POST /create", this.postTaskCreate);
    this.services.set("POST /id/:taskId/chatlog", this.postTaskChatlog);
    this.services.set(
      "POST /id/:taskId/chatlog/search",
      this.postTaskChatlogSearch
    );
    this.services.set(
      "POST /id/:taskId/configuration",
      this.postTaskConfiguration
    );
    this.services.set("POST /id/:taskId/delete", this.postTaskDelete);
    this.services.set(
      "POST /id/:taskId/notification",
      this.postTaskNotification
    );
  }

  private getTaskCreate(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private getTaskPage(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private getTaskChatlog(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private getTaskConfiguration(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private getTaskNotification(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private postTaskCreate(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private postTaskChatlog(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private postTaskChatlogSearch(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private postTaskConfiguration(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private postTaskDelete(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private postTaskNotification(_: Request, res: Response): void {
    res.sendStatus(404);
  }
}
