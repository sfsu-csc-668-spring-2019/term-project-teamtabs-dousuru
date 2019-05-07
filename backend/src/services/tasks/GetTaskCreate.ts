import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";

export class GetTaskCreate implements IService {
  public getRoute(): string {
    return "GET /create";
  }

  public execute(): IMiddlewareFunction {
    return (_: Request, response: Response, __: NextFunction) => {
      response.sendStatus(404);
    };
  }
}
