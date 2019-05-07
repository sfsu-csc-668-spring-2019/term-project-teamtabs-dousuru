import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";

export class PostProjectConfiguration implements IService {
  public getRoute(): string {
    return "POST /id/:projectId/configuration";
  }

  public execute(): IMiddlewareFunction {
    return (_: Request, response: Response, __: NextFunction) => {
      response.sendStatus(404);
    };
  }
}
