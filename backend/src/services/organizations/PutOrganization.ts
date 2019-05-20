import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { OrganizationQueries, UserQueries } from "../../queries";
import { User } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";
import { UserHandler, OrganizationHandler } from "../../socket/handlers";

export class PutOrganization extends AuthenticatedService {
  public getRoute(): string {
    return "PUT /";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (
      { body: { name, description, icon }, user }: AuthRequest,
      response: Response,
      __: NextFunction
    ) => {
      this.validate(name, description, icon, user)
        .then(user =>
          OrganizationQueries.createOrganization(
            name,
            description,
            icon,
            user.id
          )
        )
        .then(org => {
          OrganizationHandler.getInstance().join(
            org.id.toString(),
            user.id.toString(),
            user.username
          );
          response.json(org);
        })
        .then(_ => UserQueries.getOrganizations(user.id))
        .then(data =>
          UserHandler.getInstance().update(
            user.id.toString(),
            "dashboard",
            data
          )
        )
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(
    name: string,
    description: string,
    icon: string,
    user: User
  ): Promise<User> {
    if (user && name && description && icon) {
      return Promise.resolve(user);
    } else {
      return Promise.reject();
    }
  }
}
