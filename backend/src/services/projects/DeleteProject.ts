import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { ProjectManager, OrganizationManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";
import { OrganizationHandler } from "../../socket/handlers";

export class DeleteProject extends AuthenticatedService {
  public getRoute(): string {
    return "DELETE /:id";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { id, organizationId }
      } = request;
      this.validate(id, request)
        .then(_ => ProjectManager.deleteProject(request.user.id, id))
        .then(_ => OrganizationManager.getOrganization(organizationId))
        .then(data => {
          OrganizationHandler.getInstance().update(organizationId, data);
          response.sendStatus(200);
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
