import { Request, Response, NextFunction } from "express";
import { Service, IMiddlewareFunction } from "..";

export class PostTaskConfiguration extends Service {
  public getRoute(): string {
    return "POST /id/:taskId/configuration";
  }

  public execute(): IMiddlewareFunction {
    return (_: Request, response: Response, __: NextFunction) => {
      response.sendStatus(404);
    };
  }
}
