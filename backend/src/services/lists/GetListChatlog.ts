import { Request, Response, NextFunction } from "express";
import { Service, IMiddlewareFunction } from "..";

export class GetListChatlog extends Service {
  public getRoute(): string {
    return "GET /list/:listId/chatlog";
  }

  public execute(): IMiddlewareFunction {
    return (_: Request, response: Response, __: NextFunction) => {
      response.sendStatus(404);
    };
  }
}
