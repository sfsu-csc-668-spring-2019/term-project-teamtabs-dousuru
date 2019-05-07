import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";

export class GetUserData implements IService {
  public getRoute(): string {
    return "GET /id/:userId";
  }

  public execute(): IMiddlewareFunction {
    return (_: Request, response: Response, __: NextFunction) => {
      response.sendStatus(404);
    };
  }
}
