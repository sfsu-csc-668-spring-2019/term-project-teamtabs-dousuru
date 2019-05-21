import { Request, Response, NextFunction } from "express";
import { Service, IMiddlewareFunction } from "..";
import { UserQueries } from "../../queries";
import { User } from "../../entity";

export class GetUserData extends Service {
  public getRoute(): string {
    return "GET /id/:userId";
  }

  public execute(): IMiddlewareFunction {
    return (
      { params: { userId } }: Request,
      response: Response,
      __: NextFunction
    ) => {
      UserQueries.getUserInformationById(userId)
        .then(results => {
          response.json(results);
        })
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(userId: number): Promise<User> {
    return Promise.resolve(UserQueries.getUserInformationById(userId));
  }
}
