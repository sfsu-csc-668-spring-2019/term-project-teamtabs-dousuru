import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { UserManager } from "../../controllers";
import { User } from "../../entity";

export class GetUserInformationByName implements IService {
  public getRoute(): string {
    return "GET /displayName/:displayName";
  }

  public execute(): IMiddlewareFunction {
    return (
      { params: { displayName } }: Request,
      response: Response,
      __: NextFunction
    ) => {
      Promise.resolve(UserManager.getUserInformation(displayName))
        .then(response.json)
        .catch(_ => response.sendStatus(500));
    };
  }
}
