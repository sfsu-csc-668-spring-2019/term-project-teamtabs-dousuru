import { Response, NextFunction } from "express";
import { IMiddlewareFunction, AuthenticatedService } from "..";
import { User } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";
import { OrganizationQueries } from "../../queries";
import { OrganizationHandler, ProjectHandler } from "../../socket/handlers";

export class GetProjectsByOrganization extends AuthenticatedService {
  public getRoute(): string {
    return "GET /organizationProjects/:id";
  }

  public authenticatedExecute(): IMiddlewareFunction {
    return (
      { params: { id }, user }: AuthRequest,
      response: Response,
      _: NextFunction
    ) => {
      this.validate(user)
        .then(user => OrganizationQueries.getOrganizationProjects(user.id, id))
        .then(projs => {
          OrganizationHandler.getInstance().join(
            id,
            user.id.toString(),
            user.username
          );
          projs.forEach(proj =>
            ProjectHandler.getInstance().join(
              proj.id.toString(),
              user.id.toString(),
              user.username
            )
          );
          response.json(projs);
        })
        .catch(_ => {
          response.sendStatus(400);
        });
    };
  }

  public validate(user: User): Promise<User> {
    if (user) {
      return Promise.resolve(user);
    } else {
      return Promise.reject();
    }
  }
}
