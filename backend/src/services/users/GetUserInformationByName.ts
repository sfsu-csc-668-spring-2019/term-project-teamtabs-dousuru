import { Request, Response, NextFunction } from "express";
import { Service, IMiddlewareFunction } from "..";
import { UserQueries } from "../../queries";

export class GetUserInformationByName extends Service {
  public getRoute(): string {
    return "GET /displayName/:displayName";
  }

  public execute(): IMiddlewareFunction {
    return (
      { params: { displayName } }: Request,
      response: Response,
      __: NextFunction
    ) => {
      Promise.resolve(UserQueries.getUserInformation(displayName))
        .then(response.json)
        .catch(_ => response.sendStatus(500));
    };
  }
}
