import { Request, Response, NextFunction } from "express";
import { IMiddlewareFunction, AuthenticatedService } from "..";
import { User } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";
import { UserManager } from "../../controllers/UserManager";

export class GetListsByProject extends AuthenticatedService {
  public getRoute(): string {
    return "GET /organizationProjects/:id";
  }

  public authenticatedExecute(): IMiddlewareFunction {
    return (request: Request, response: Response, _: NextFunction) => {
      const {
        params: { id }
      } = request;
      this.validate(request)
        .then(_ => UserManager.getProjectLists(id))
        .then(lists => response.json(lists))
        .catch(_ => {
          response.sendStatus(400);
        });
    };
  }

  public validate(request: AuthRequest): Promise<User> {
    if (request.user) {
      return Promise.resolve(request.user);
    } else {
      return Promise.reject();
    }
  }
}
