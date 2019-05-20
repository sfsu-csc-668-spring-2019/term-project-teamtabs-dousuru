import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { ProjectQueries, OrganizationQueries } from "../../queries";
import { AuthRequest } from "../../types/AuthRequest";
import { OrganizationHandler } from "../../socket/handlers";

export class DeleteProject extends AuthenticatedService {
  public getRoute(): string {
    return "DELETE /:id";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { id },
        user
      } = request;
      this.validate(id, request)
        .then(_ => ProjectQueries.getProject(id))
        .then(project => {
          const organizationId = project.baseOrganization.id;
          ProjectQueries.deleteProject(user.id, id)
            .then(_ =>
              OrganizationQueries.getOrganizationProjects(
                user.id,
                organizationId
              )
            )
            .then(data => {
              OrganizationHandler.getInstance().updateProjects(
                organizationId.toString(),
                data
              );
              response.sendStatus(200);
            });
        })
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(id: number, request: AuthRequest): Promise<void> {
    if (!request.user || !id) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }
}
