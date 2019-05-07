import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";

export class GetTaskConfiguration implements IService {
  public getRoute(): string {
    return "GET /id/:taskId/configuration";
  }

  public execute(): IMiddlewareFunction {
    return (_: Request, response: Response, __: NextFunction) => {
      response.sendStatus(404);
    };
  }
}
