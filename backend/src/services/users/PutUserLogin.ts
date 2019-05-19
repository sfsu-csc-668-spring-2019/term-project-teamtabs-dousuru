import { Request, Response, NextFunction } from "express";
import { Service, IMiddlewareFunction } from "..";
import { SecretsService } from "../../controllers/SecretsService";
import { UserManager } from "../../controllers";

export class PutUserLogin extends Service {
  public getRoute(): string {
    return "PUT /login";
  }

  public execute(): IMiddlewareFunction {
    return (
      { body: { identifier: username, password } }: Request,
      response: Response,
      _: NextFunction
    ) => {
      this.validate(username, password)
        .then(_ => {
          SecretsService.encrypt(password).then(encryptedPassword => {
            UserManager.getUserInformationSignIn(username)
              .then(user => {
                if (!user) Promise.reject();
                if (encryptedPassword == user.password)
                  Promise.resolve(SecretsService.createToken(user.id));
              })
              .then(token => response.json({ token }));
          });
        })
        .catch(_ => response.sendStatus(500));
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
