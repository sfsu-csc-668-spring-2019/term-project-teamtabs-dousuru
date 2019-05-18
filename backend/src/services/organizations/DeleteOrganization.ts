import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { OrganizationManager, UserManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";

export class DeleteOrganization extends AuthenticatedService {
  public getRoute(): string {
    return "DELETE /:id";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { organizationId }
      } = request;
      this.validate(organizationId, request)
        .then(_ =>
          OrganizationManager.deleteOrganization(
            request.user.id,
            organizationId
          )
        )
        .then(_ => response.sendStatus(200))
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(organizationId: number, request: AuthRequest): Promise<any> {
    if (!request.user) {
      return Promise.reject();
    } else {
      UserManager.checkOrganizationManage(request.user.id, organizationId).then(
        results => {
          if (results) return Promise.resolve();
          return Promise.reject();
        }
      );
    }
  }
}
