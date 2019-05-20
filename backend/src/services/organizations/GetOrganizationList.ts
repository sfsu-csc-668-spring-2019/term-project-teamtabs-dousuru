import { Request, Response, NextFunction } from "express";
import { IMiddlewareFunction, AuthenticatedService } from "..";
import { User } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";
import { UserQueries } from "../../queries/UserQueries";

export class GetOrganizationList extends AuthenticatedService {
  public getRoute(): string {
    return "GET /list";
  }

  public authenticatedExecute(): IMiddlewareFunction {
    return (request: Request, response: Response, _: NextFunction) => {
      this.validate(request)
        .then(user => UserQueries.getOrganizations(user.id))
        .then(orgs => response.json(orgs))
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
