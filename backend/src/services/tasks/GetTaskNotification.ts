import { Request, Response, NextFunction } from "express";
import { Service, IMiddlewareFunction } from "..";

export class GetTaskNotification extends Service {
  public getRoute(): string {
    return "GET /id/:taskId/notification";
  }

  public execute(): IMiddlewareFunction {
    return (_: Request, response: Response, __: NextFunction) => {
      response.sendStatus(404);
    };
  }
}
