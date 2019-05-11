import { Request, Response, NextFunction } from "express";
import { Service, IMiddlewareFunction } from "..";

export class GetListNotification extends Service {
  public getRoute(): string {
    return "GET /list/:listId/notification";
  }

  public execute(): IMiddlewareFunction {
    return (_: Request, response: Response, __: NextFunction) => {
      response.sendStatus(404);
    };
  }
}
