import { Request, Response, NextFunction } from "express";
import { Service, IMiddlewareFunction } from "..";
import { UserManager } from "../../controllers";

export class PutUserUpdate extends Service {
  public getRoute(): string {
    return "PUT /update/userId/:id";
  }

  public execute(): IMiddlewareFunction {
    return (
      { body: { displayName, userName, icon, id } }: Request,
      response: Response,
      _: NextFunction
    ) => {
      this.validate(displayName, userName, icon, id)
        .then(_ => {
          UserManager.updateAccount(displayName, icon, id).then(results => {
            response.send(results);
          });
        })
        .catch(_ => response.sendStatus(500));
    };
  }

  validate(
    displayName: string,
    userName: string,
    icon: string,
    userId: number
  ): Promise<any> {
    if (!displayName || !userName || !icon || !userId) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }
}
