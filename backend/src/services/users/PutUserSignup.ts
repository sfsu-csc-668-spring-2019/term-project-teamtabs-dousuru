import { Request, Response, NextFunction } from "express";
import { Service, IMiddlewareFunction } from "..";
import { SecretsService } from "../../middleware/SecretsService";
import { UserQueries } from "../../queries";

export class PutUserSignup extends Service {
  public getRoute(): string {
    return "PUT /signup";
  }

  public execute(): IMiddlewareFunction {
    return (
      { body: { email, password, username, icon } }: Request,
      response: Response,
      _: NextFunction
    ) => {
      this.validate(email, password, username)
        .then(_ => SecretsService.encrypt(password))
        .then(encryptedPassword =>
          UserQueries.createAccount(email, encryptedPassword, username, icon)
        )
        .then(({ id }) =>
          response.json({ token: SecretsService.createToken(id) })
        )
        .catch(_ => response.sendStatus(500));
    };
  }

  validate(email: string, password: string, username: string): Promise<void> {
    if (!email || !password || !username) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }
}
