import { Request, Response, NextFunction } from "express";
import { Service, IMiddlewareFunction } from "..";
import { SecretsService } from "../../controllers/SecretsService";
import { UserManager } from "../../controllers";

export class PutUserSignin extends Service {
  public getRoute(): string {
    return "Post /signin";
  }

  public execute(): IMiddlewareFunction {
    return (
      { body: { username, password } }: Request,
      response: Response,
      _: NextFunction
    ) => {
      this.validate(username, password).then(_ => {
        SecretsService.encrypt(password).then(encryptedPassword => {
          UserManager.getUserInformationSignIn(username)
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

  validate(username: string, password: string): Promise<void> {
    if (!username || !password) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }
}
