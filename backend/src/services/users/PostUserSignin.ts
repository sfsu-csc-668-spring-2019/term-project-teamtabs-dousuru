import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { SecretsService } from "../../controllers/SecretsService";
import { UserManager } from "../../controllers";
import { promises } from "fs";

export class PutUserSignin implements IService {
  public getRoute(): string {
    return "Post /signin/:userId";
  }

  public execute(): IMiddlewareFunction {
    return (
      { body: { userName, password } }: Request,
      response: Response,
      _: NextFunction
    ) => {
      this.validate(userName, password).then(_ => {
        SecretsService.encrypt(password).then(encryptedPassword => {
          UserManager.getUserInformationSignIn(userName)
            .then(user => {
              if (!user) return Promise.reject;
              if (encryptedPassword == user.password)
                return SecretsService.createToken(user.id);
            })
            .catch(_ => {
              response.sendStatus(500);
            });
        });
      });
    };
  }

  validate(userName: string, password: string): Promise<void> {
    if (!userName || !password) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }
}