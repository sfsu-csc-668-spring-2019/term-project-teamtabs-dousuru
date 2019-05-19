import { Response, NextFunction } from "express";
import { IMiddlewareFunction, AuthenticatedService } from "..";
import { User } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";
import { UserManager } from "../../controllers/UserManager";

export class GetListByProject extends AuthenticatedService {
  public getRoute(): string {
    return "GET /projectLists/:id";
  }

  public authenticatedExecute(): IMiddlewareFunction {
    return (
      { params: { id }, user }: AuthRequest,
      response: Response,
      _: NextFunction
    ) => {
      this.validate(user, id)
        .then(_ => UserManager.getProjectLists(id))
        .then(projs => {
          response.json(projs);
        })
        .catch(_ => {
          response.sendStatus(400);
        });
    };
  }

  public validate(user: User, id: number): Promise<User> {
    if (!user || !id) {
      return Promise.reject();
    }
    return Promise.resolve(user);
  }
}
