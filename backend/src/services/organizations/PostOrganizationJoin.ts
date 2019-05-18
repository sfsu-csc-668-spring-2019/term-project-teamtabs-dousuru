import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { OrganizationManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";
import { Organization } from "../../entity";

export class PostOrganizationJoin extends AuthenticatedService {
  public getRoute(): string {
    return "POST /id/:organizationId/join/:inviteLink";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { organizationId, inviteLink }
      } = request;
      this.validate(organizationId, inviteLink, request)
        .then(response.json)
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(
    organizationId: number,
    inviteLink: string,
    request: AuthRequest
  ): Promise<Organization> {
    if (request.user) {
      return Promise.resolve(
        OrganizationManager.addOrganizationUser(
          request.user.id,
          organizationId,
          inviteLink
        )
      );
    } else {
      return Promise.reject();
    }
  }
}
