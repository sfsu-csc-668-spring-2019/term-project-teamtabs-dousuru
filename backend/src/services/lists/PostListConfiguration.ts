import { Request, Response, NextFunction } from "express";
import { Service, IMiddlewareFunction } from "..";

export class PostListConfiguration extends Service {
  public getRoute(): string {
    return "POST /list/:listId/configuration";
  }

  public execute(): IMiddlewareFunction {
    return (_: Request, response: Response, __: NextFunction) => {
      response.sendStatus(404);
    };
  }
}
