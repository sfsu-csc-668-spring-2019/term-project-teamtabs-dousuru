import { Request, Response, NextFunction } from "express";
import { Service, IMiddlewareFunction } from "..";

export class GetProjectConfiguration extends Service {
  public getRoute(): string {
    return "GET /id/:projectId/configuration";
  }

  public execute(): IMiddlewareFunction {
    return (_: Request, response: Response, __: NextFunction) => {
      response.sendStatus(404);
    };
  }
}
