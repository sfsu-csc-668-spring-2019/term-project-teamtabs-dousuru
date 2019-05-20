import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { OrganizationQueries } from "../../queries";
import { AuthRequest } from "../../types/AuthRequest";
import { OrganizationHandler } from "../../socket/handlers";

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
          OrganizationQueries.addOrganizationUser(
            request.user.id,
            id,
            inviteLink
          )
        )
        .then(results => {
          OrganizationHandler.getInstance().update(id, results);
          response.json(results);
        })
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
