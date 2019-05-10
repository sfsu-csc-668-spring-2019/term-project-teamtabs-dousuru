import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { SecretsService } from "../../controllers/SecretsService";
import { UserManager } from "../../controllers";

export class PutUserUpdate implements IService {
  public getRoute(): string {
    return "PUT /update/userId/:id";
  }

  public execute(): IMiddlewareFunction {
    return (
      { body: { displayName, userName, icon, userId } }: Request,
      response: Response,
      _: NextFunction
    ) => {
      this.validate(displayName, userName, icon, userId)
        .then(_ => {
          UserManager.updateAccount(displayName, userName, icon, userId).then(
            results => {
              response.send(results);
            }
          );
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
