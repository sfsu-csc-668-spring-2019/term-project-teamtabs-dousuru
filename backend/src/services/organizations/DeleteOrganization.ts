import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import {
  OrganizationQueries,
  UserQueries,
  PermissionQueries
} from "../../queries";
import { AuthRequest } from "../../types/AuthRequest";
import { UserHandler } from "../../socket/handlers";
import { Organization, User } from "../../entity";

export class DeleteOrganization extends AuthenticatedService {
  public getRoute(): string {
    return "DELETE /:id";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (
      { params: { id }, user }: AuthRequest,
      response: Response,
      __: NextFunction
    ) => {
      this.validate(user)
        .then(_ => this.checkPermission(user, id))
        .then(_ => OrganizationQueries.deleteOrganization(user.id, id))
        .then(() => response.sendStatus(200))
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(user: User): Promise<void> {
    if (!user) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }

  public checkPermission(user: User, id: number): Promise<any> {
    return PermissionQueries.checkOrganizationManage(user.id, id).then(
      results => {
        if (results) return Promise.resolve();
        return Promise.reject();
      }
    );
  }
}
