import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";

export class PostUserSearchContents implements IService {
  public getRoute(): string {
    return "POST /id/:userId/search";
  }

  public execute(): IMiddlewareFunction {
    return (_: Request, response: Response, __: NextFunction) => {
      response.sendStatus(404);
    };
  }
}
