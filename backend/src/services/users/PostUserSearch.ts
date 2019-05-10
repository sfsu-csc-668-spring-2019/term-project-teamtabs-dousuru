import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { UserManager } from "../../controllers";
import { User } from "../../entity";

export class PostUserSearch implements IService {
  public getRoute(): string {
    return "POST /search";
  }

  public execute(): IMiddlewareFunction {
    return (
      { body: { displayName } }: Request,
      response: Response,
      __: NextFunction
    ) => {
      this.validate(displayName)
        .then(response.json)
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(displayName: string): Promise<User[]> {
    return Promise.resolve(UserManager.getUsers(displayName));
  }
}
