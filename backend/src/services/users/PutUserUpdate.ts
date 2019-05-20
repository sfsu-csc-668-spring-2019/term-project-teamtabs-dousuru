import { Request, Response, NextFunction } from "express";
import { Service, IMiddlewareFunction } from "..";
import { UserQueries } from "../../queries";

export class PutUserUpdate extends Service {
  public getRoute(): string {
    return "PUT /update/userId/:id";
  }

  public execute(): IMiddlewareFunction {
    return (
      { body: { displayName, username, icon, id } }: Request,
      response: Response,
      _: NextFunction
    ) => {
      this.validate(displayName, username, icon, id)
        .then(_ => {
          UserQueries.updateAccount(displayName, icon, id).then(results => {
            response.send(results);
          });
        })
        .catch(_ => response.sendStatus(500));
    };
  }

  validate(
    displayName: string,
    username: string,
    icon: string,
    userId: number
  ): Promise<any> {
    if (!displayName || !username || !icon || !userId) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }
}
