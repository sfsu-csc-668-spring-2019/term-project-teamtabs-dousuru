import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { OrganizationManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";

export class PostOrganizationSearch extends AuthenticatedService {
  public getRoute(): string {
    return "POST /id/:organizationId/search";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        body: { name },
        params: { organizationId }
      } = request;
      this.validate(organizationId, name, request)
        .then(response.json)
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(
    organizationId: number,
    name: string,
    request: AuthRequest
  ): Promise<JSON> {
    if (request.user) {
      OrganizationManager.userBelongsToOrganization(
        request.user.id,
        organizationId
      ).then(userIsMember => {
        if (userIsMember) {
          return Promise.resolve(
            OrganizationManager.getContentsByName(
              request.user.id,
              organizationId,
              name
            )
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
