import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";

export class GetTaskData implements IService {
  public getRoute(): string {
    return "GET /id/:taskId";
  }

  public execute(): IMiddlewareFunction {
    return (_: Request, response: Response, __: NextFunction) => {
      response.sendStatus(404);
    };
  }
}
