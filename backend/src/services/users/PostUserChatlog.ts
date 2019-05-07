import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";

export class PostUserChatlog implements IService {
  public getRoute(): string {
    return "POST /id/:userId/chatlog/id/:chatId";
  }

  public execute(): IMiddlewareFunction {
    return (_: Request, response: Response, __: NextFunction) => {
      response.sendStatus(404);
    };
  }
}
