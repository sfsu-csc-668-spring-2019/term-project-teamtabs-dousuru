import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";

export class PostOrganizationConfiguration implements IService {
  public getRoute(): string {
    return "POST /id/:organizationId/configuration";
  }

  public execute(): IMiddlewareFunction {
    return (_: Request, response: Response, __: NextFunction) => {
      response.sendStatus(404);
    };
  }
}