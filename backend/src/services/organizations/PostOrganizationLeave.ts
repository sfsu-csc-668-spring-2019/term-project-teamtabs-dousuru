import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { OrganizationManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";
import { Organization } from "../../entity";

export class PostOrganizationLeave extends AuthenticatedService {
  public getRoute(): string {
    return "POST /id/:organizationId/leave";
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

  public validate(
    organizationId: number,
    request: AuthRequest
  ): Promise<Organization> {
    if (request.user) {
      return Promise.resolve(
        OrganizationManager.removeOrganizationUser(
          organizationId,
          request.user.id
        )
      );
    } else {
      return Promise.reject();
    }
  }
}
