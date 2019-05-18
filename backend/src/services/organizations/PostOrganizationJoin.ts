import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { OrganizationManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";
import { Organization } from "../../entity";
import { promises } from "fs";

export class PostOrganizationJoin extends AuthenticatedService {
  public getRoute(): string {
    return "POST /join/:id/:inviteLink";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { id, inviteLink }
      } = request;
      this.validate(id, inviteLink, request)
        .then(_ =>
          OrganizationManager.addOrganizationUser(
            request.user.id,
            id,
            inviteLink
          )
        )
        .then(results => response.json(results))
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(
    id: number,
    inviteLink: string,
    request: AuthRequest
  ): Promise<any> {
    if (!request.user || !id || !inviteLink) {
      return Promise.reject();
    }
    return Promise.resolve();
  }
}
