import { Request, Response, NextFunction } from "express";
import { Service, IMiddlewareFunction } from "..";
import { SecretsService } from "../../middleware/SecretsService";
import { UserQueries } from "../../queries";

export class PutUserLogin extends Service {
  public getRoute(): string {
    return "PUT /login";
  }

  public execute(): IMiddlewareFunction {
    return (
      { body: { identifier, password } }: Request,
      response: Response,
      _: NextFunction
    ) => {
      this.validate(identifier, password)
        .then(_ =>
          UserQueries.getUserInformationByLogin(identifier).then(user => {
            if (!user) {
              Promise.reject();
            }
            Promise.resolve(
              SecretsService.compare(password, user.password)
            ).then(isEqual => {
              if (isEqual) {
                response.json({ token: SecretsService.createToken(user.id) });
              } else {
                Promise.reject();
              }
            });
          })
        )
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
