import { Request, Response, NextFunction } from "express";
import { Service, IMiddlewareFunction } from "..";

export class PostOrganizationConfiguration extends Service {
  public getRoute(): string {
    return "POST /id/:organizationId/configuration";
  }

  public execute(): IMiddlewareFunction {
    return (_: Request, response: Response, __: NextFunction) => {
      response.sendStatus(404);
    };
  }
}
