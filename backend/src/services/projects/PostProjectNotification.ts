import { Request, Response, NextFunction } from "express";
import { Service, IMiddlewareFunction } from "..";

export class PostProjectNotification implements Service {
  public getRoute(): string {
    return "POST /id/:projectId/notification";
  }

  public execute(): IMiddlewareFunction {
    return (_: Request, response: Response, __: NextFunction) => {
      response.sendStatus(404);
    };
  }
}
