import { Request, Response, NextFunction } from "express";
import { Service, IMiddlewareFunction } from "..";

export class GetListCreate extends Service {
  public getRoute(): string {
    return "GET /create";
  }

  public execute(): IMiddlewareFunction {
    return (_: Request, response: Response, __: NextFunction) => {
      response.sendStatus(404);
    };
  }
}
