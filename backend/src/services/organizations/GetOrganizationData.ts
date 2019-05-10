import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { OrganizationManager } from "../../controllers";
import { Organization } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";

export class GetOrganizationData extends AuthenticatedService {
  public getRoute(): string {
    return "GET /id/:organizationId";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { organizationId }
      } = request;
      this.validate(request, organizationId)
        .then(response.json)
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(
    request: AuthRequest,
    organizationId: number
  ): Promise<Organization> {
    if (request.user) {
      OrganizationManager.userBelongsToOrganization(
        request.user.id,
        organizationId
      ).then(userIsMember => {
        if (userIsMember) {
          return Promise.resolve(
            OrganizationManager.getOrganization(request.user.id, organizationId)
          );
        } else {
          return Promise.reject();
        }
      });
    } else {
      return Promise.reject();
    }
  }
}
