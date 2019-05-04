import { Router } from "./Router";
import { Request, Response } from "express";

export class ListRouter extends Router {
  protected setServices(): void {
    this.services = new Map();
    this.services.set("GET /create", this.getListCreate);
    this.services.set("GET /id/:listId", this.getListPage);
    this.services.set("GET /id/:listId/chatlog", this.getListChatlog);
    this.services.set(
      "GET /id/:listId/configuration",
      this.getListConfiguration
    );
    this.services.set("GET /id/:listId/notification", this.getListNotification);
    this.services.set("POST /create", this.postListCreate);
    this.services.set("POST /id/:listId/chatlog", this.postListChatlog);
    this.services.set(
      "POST /id/:listId/chatlog/search",
      this.postListChatlogSearch
    );
    this.services.set(
      "POST /id/:listId/configuration",
      this.postListConfiguration
    );
    this.services.set("POST /id/:listId/delete", this.postListDelete);
    this.services.set(
      "POST /id/:listId/notification",
      this.postListNotification
    );
    this.services.set("POST /id/:listId/search", this.postListSearch);
  }

  private getListCreate(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private getListPage(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private getListChatlog(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private getListConfiguration(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private getListNotification(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private postListCreate(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private postListChatlog(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private postListChatlogSearch(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private postListConfiguration(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private postListDelete(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private postListNotification(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private postListSearch(_: Request, res: Response): void {
    res.sendStatus(404);
  }
}
