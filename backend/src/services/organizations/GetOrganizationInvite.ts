import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { OrganizationQueries, PermissionQueries } from "../../queries";
import { AuthRequest } from "../../types/AuthRequest";

export class GetOrganizationInvite extends AuthenticatedService {
  public getRoute(): string {
    return "GET /inviteLink/:id";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { id }
      } = request;
      this.validate(id, request)
        .then(_ => OrganizationQueries.getInviteLink(id))
        .then(inviteLink => response.json(inviteLink))
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(id: number, request: AuthRequest): Promise<any> {
    if (!request.user || !id) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }

  public checkPermission(id: number, request: AuthRequest): Promise<any> {
    return PermissionQueries.checkProjectInvite(request.user.id, id).then(
      results => {
        if (results) return Promise.resolve();
        return Promise.reject();
      }
    );
  }
}
