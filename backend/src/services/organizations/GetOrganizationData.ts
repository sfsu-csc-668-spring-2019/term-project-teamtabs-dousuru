import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { OrganizationQueries, PermissionQueries } from "../../queries";
import { User } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";
import { OrganizationHandler } from "../../socket/handlers";

export class GetOrganizationData extends AuthenticatedService {
  public getRoute(): string {
    return "GET /:id";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (
      { params: { id }, user }: AuthRequest,
      response: Response,
      __: NextFunction
    ) => {
      this.validate(user)
        .then(_ => this.checkPermission(user, id))
        .then(_ => OrganizationQueries.getOrganization(id))
        .then(organization => {
          OrganizationHandler.getInstance().join(
            id,
            user.id.toString(),
            user.username
          );
          response.json(organization);
        })
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(user: User): Promise<any> {
    if (!user) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }

  public checkPermission(user: User, id: number): Promise<any> {
    return PermissionQueries.checkOrganizationPermission(user.id, id).then(
      results => {
        if (results) return Promise.resolve();
        return Promise.reject();
      }
    );
  }
}
