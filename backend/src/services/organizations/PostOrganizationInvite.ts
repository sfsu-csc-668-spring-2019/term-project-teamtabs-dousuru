import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { OrganizationManager, UserManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";

export class PostOrganizationInvite extends AuthenticatedService {
  public getRoute(): string {
    return "POST /inviteLink/:id";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { id }
      } = request;
      this.validate(id, request)
        .then(_ => this.checkPermission(id, request))
        .then(_ => OrganizationManager.getInviteLink(request.user.id, id))
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
    return UserManager.checkProjectInvite(request.user.id, id).then(results => {
      if (results) return Promise.resolve();
      return Promise.reject();
    });
  }
}
