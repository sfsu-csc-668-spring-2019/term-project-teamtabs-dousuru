import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { OrganizationManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";

export class DeleteOrganization extends AuthenticatedService {
  public getRoute(): string {
    return "DELETE /id/:organizationId";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { organizationId }
      } = request;
      this.validate(organizationId, request)
        .then(_ => response.sendStatus(200))
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(organizationId: number, request: AuthRequest): Promise<void> {
    if (request.user) {
      return Promise.resolve(
        OrganizationManager.deleteOrganization(request.user.id, organizationId)
      );
    } else {
      return Promise.reject();
    }
  }
}
