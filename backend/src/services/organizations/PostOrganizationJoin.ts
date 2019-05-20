import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { OrganizationQueries } from "../../queries";
import { AuthRequest } from "../../types/AuthRequest";
import { OrganizationHandler } from "../../socket/handlers";
import { SecretsService } from "../../middleware/SecretsService";

export class PostOrganizationJoin extends AuthenticatedService {
  public getRoute(): string {
    return "POST /join/:inviteLink";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { inviteLink }
      } = request;
      this.validate(inviteLink, request)
        .then(() => SecretsService.getOrganizationFromInvite(inviteLink))
        .then(org =>
          OrganizationQueries.addOrganizationUser(org.id, request.user.id)
        )
        .then(org => {
          response.json(org);
        })
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(inviteLink: string, request: AuthRequest): Promise<any> {
    if (!request.user || !inviteLink) {
      return Promise.reject();
    }
    return Promise.resolve();
  }
}
