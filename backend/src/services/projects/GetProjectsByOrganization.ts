import { Request, Response, NextFunction } from "express";
import { IMiddlewareFunction, AuthenticatedService } from "..";
import { User } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";
import { UserManager } from "../../controllers/UserManager";
import { OrganizationManager } from "../../controllers/OrganizationManager";

export class GetProjectsByOrganization extends AuthenticatedService {
  public getRoute(): string {
    return "GET /organizationProjects/:id";
  }

  public authenticatedExecute(): IMiddlewareFunction {
    return (request: Request, response: Response, _: NextFunction) => {
      const {
        params: { id }
      } = request;
      this.validate(request)
        .then(user => UserManager.getOrganizationProjects(user.id, id))
        .then(projs => {
          console.log(projs);
          response.json(projs);
        })
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
