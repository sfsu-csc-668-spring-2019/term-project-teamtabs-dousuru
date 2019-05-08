import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";

export class PostUserChatlogSearch implements IService {
  public getRoute(): string {
    return "POST /id/:userId/chatlog/id/:chatId/search";
  }

  public execute(): IMiddlewareFunction {
    return (_: Request, response: Response, __: NextFunction) => {
      response.sendStatus(404);
    };
  }
}
