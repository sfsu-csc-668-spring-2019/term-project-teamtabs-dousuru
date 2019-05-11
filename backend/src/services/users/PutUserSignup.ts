import { Request, Response, NextFunction } from "express";
import { Service, IMiddlewareFunction } from "..";
import { SecretsService } from "../../controllers/SecretsService";
import { UserManager } from "../../controllers";

export class PutUserSignup extends Service {
  public getRoute(): string {
    return "PUT /signup";
  }

  public execute(): IMiddlewareFunction {
    return (
      { body: { email, password, userName, icon } }: Request,
      response: Response,
      _: NextFunction
    ) => {
      this.validate(email, password, userName)
        .then(_ => SecretsService.encrypt(password))
        .then(encryptedPassword =>
          UserManager.createAccount(email, encryptedPassword, userName, icon)
        )
        .then(({ id }) =>
          response.json({ token: SecretsService.createToken(id) })
        )
        .catch(_ => response.sendStatus(500));
    };
  }

  validate(email: string, password: string, userName: string): Promise<void> {
    if (!email || !password || !userName) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }
}
