import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { OrganizationQueries, PermissionQueries } from "../../queries";
import { AuthRequest } from "../../types/AuthRequest";

export class PostOrganizationSearch extends AuthenticatedService {
  public getRoute(): string {
    return "POST /search/:id";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        body: { name },
        params: { id }
      } = request;
      this.validate(id, name, request)
        .then(_ => this.checkPermission(request, id))
        .then(_ =>
          OrganizationQueries.getContentsByName(request.user.id, id, name)
        )
        .then(results => response.json(results))
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(
    id: number,
    name: string,
    request: AuthRequest
  ): Promise<any> {
    if (!request.user || !name) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }

  public checkPermission(request: AuthRequest, id: number): Promise<any> {
    return PermissionQueries.checkOrganizationPermission(
      request.user.id,
      id
    ).then(results => {
      if (results) return Promise.resolve();
      return Promise.reject();
    });
  }
}
