import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { UserManager } from "../../controllers";
import { User } from "../../entity";

export class GetUserSearch implements IService {
  public getRoute(): string {
    return "GET /search";
  }

  public execute(): IMiddlewareFunction {
    return (
      { params: { displayName } }: Request,
      response: Response,
      __: NextFunction
    ) => {
      this.validate(displayName)
        .then(response.json)
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(displayName: string): Promise<User[]> {
    return Promise.resolve(UserManager.GetUsers(displayName));
  }
}
