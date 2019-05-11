import { Request, Response, NextFunction } from "express";
import { Service, IMiddlewareFunction } from "..";

export class PostTaskChatlog extends Service {
  public getRoute(): string {
    return "POST /id/:taskId/chatlog";
  }

  public execute(): IMiddlewareFunction {
    return (_: Request, response: Response, __: NextFunction) => {
      response.sendStatus(404);
    };
  }
}
