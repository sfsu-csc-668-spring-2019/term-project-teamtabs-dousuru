import { Router } from "./Router";
import { Request, Response } from "express";

export class OrganizationRouter extends Router {
  protected setServices(): void {
    this.services = new Map();
    this.services.set("GET /create", this.getOrganizationCreate);
    this.services.set("GET /id/:organizationId", this.getOrganizationPage);
    this.services.set(
      "GET /id/:organizationId/chatlog",
      this.getOrganizationChatlog
    );
    this.services.set(
      "GET /id/:organizationId/configuration",
      this.getOrganizationConfiguration
    );
    this.services.set(
      "GET /id/:organizationId/notification",
      this.getOrganizationNotification
    );
    this.services.set("POST /create", this.postOrganizationCreate);
    this.services.set(
      "POST /id/:organizationId/chatlog",
      this.postOrganizationChatlog
    );
    this.services.set(
      "POST /id/:organizationId/chatlog/search",
      this.postOrganizationChatlogSearch
    );
    this.services.set(
      "POST /id/:organizationId/configuration",
      this.postOrganizationConfiguration
    );
    this.services.set(
      "POST /id/:organizationId/delete",
      this.postOrganizationDelete
    );
    this.services.set(
      "POST /id/:organizationId/notification",
      this.postOrganizationNotification
    );
    this.services.set(
      "POST /id/:organizationId/invite",
      this.postOrganizationInvite
    );
    this.services.set(
      "POST /id/:organizationId/join",
      this.postOrganizationJoin
    );
    this.services.set("POST /id/:organizationId/log", this.postOrganizationLog);
    this.services.set(
      "POST /id/:organizationId/search",
      this.postOrganizationSearch
    );
  }

  private getOrganizationCreate(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private getOrganizationPage(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private getOrganizationChatlog(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private getOrganizationConfiguration(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private getOrganizationNotification(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private postOrganizationCreate(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private postOrganizationChatlog(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private postOrganizationChatlogSearch(_: Request, res: Response): void {
    res.sendStatus(404);
  }

  private postOrganizationConfiguration(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private postOrganizationDelete(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private postOrganizationNotification(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private postOrganizationInvite(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private postOrganizationJoin(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private postOrganizationLog(_: Request, res: Response): void {
    res.sendStatus(404);
  }
  private postOrganizationSearch(_: Request, res: Response): void {
    res.sendStatus(404);
  }
}
