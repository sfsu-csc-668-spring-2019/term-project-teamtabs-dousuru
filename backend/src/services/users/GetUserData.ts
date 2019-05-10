import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { UserManager } from "../../controllers";
import { User } from "../../entity";

export class GetUserData implements IService {
  public getRoute(): string {
    return "GET /id/:userId";
  }

  public execute(): IMiddlewareFunction {
    return (
      { params: { userId } }: Request,
      response: Response,
      __: NextFunction
    ) => {
      UserManager.getUserInformationById(userId)
        .then(results => {
          response.json(results);
        })
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(userId: number): Promise<User> {
    return Promise.resolve(UserManager.getUserInformationById(userId));
  }
}
