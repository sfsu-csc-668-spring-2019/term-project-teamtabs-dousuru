import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { SecretsService } from "../../controllers/SecretsService";
import { UserManager } from "../../controllers";

export class PutUserSignup implements IService {
  public getRoute(): string {
    return "PUT /signup";
  }

  public execute(): IMiddlewareFunction {
    return (
      { body: { email, password, displayName, userName, icon } }: Request,
      response: Response,
      _: NextFunction
    ) => {
      this.validate(email, password, displayName, userName)
        .then(_ => SecretsService.encrypt(password))
        .then(encryptedPassword =>
          UserManager.createAccount(
            email,
            encryptedPassword,
            displayName,
            userName,
            icon
          )
        )
        .then(({ id }) =>
          response.json({ token: SecretsService.createToken(id) })
        )
        .catch(_ => response.sendStatus(500));
    };
  }

  validate(
    email: string,
    password: string,
    displayName: string,
    username: string
  ): Promise<void> {
    if (!email || !password || !displayName || !username) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }
}
