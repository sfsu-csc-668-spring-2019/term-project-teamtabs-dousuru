import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { OrganizationManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";

export class PostOrganizationInvite extends AuthenticatedService {
  public getRoute(): string {
    return "POST /id/:organizationId/invite";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { organizationId }
      } = request;
      this.validate(organizationId, request)
        .then(inviteLink => response.json({ inviteLink }))
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(
    organizationId: number,
    request: AuthRequest
  ): Promise<string> {
    if (request.user) {
      return Promise.resolve(
        OrganizationManager.getInviteLink(request.user.id, organizationId)
      );
    } else {
      return Promise.reject();
    }
  }
}
