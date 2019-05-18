import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { OrganizationManager, UserManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";
import { resolve } from "path";

export class DeleteOrganization extends AuthenticatedService {
  public getRoute(): string {
    return "DELETE /:id";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { id }
      } = request;
      this.validate(id, request)
        .then(_ => this.checkPermission(id, request))
        .then(_ => OrganizationManager.deleteOrganization(request.user.id, id))
        .then(results => response.json(results))
        .then(_ => response.sendStatus(200))
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(id: number, request: AuthRequest): Promise<any> {
    if (!request.user) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }

  public checkPermission(id: number, request: AuthRequest): Promise<any> {
    return UserManager.checkOrganizationManage(request.user.id, id).then(
      results => {
        if (results) return Promise.resolve();
        return Promise.reject();
      }
    );
  }
}
