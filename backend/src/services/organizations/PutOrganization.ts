import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { OrganizationManager } from "../../controllers";
import { Organization, User } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";

export class PutOrganization extends AuthenticatedService {
  public getRoute(): string {
    return "PUT /";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        body: { name, description, icon }
      } = request;
      this.validate(name, description, icon, request)
        .then(user =>
          OrganizationManager.createOrganization(
            name,
            description,
            icon,
            user.id
          )
        )
        .then(org => response.json(org))
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(
    name: string,
    description: string,
    icon: string,
    request: AuthRequest
  ): Promise<User> {
    if (request.user && name && description && icon) {
      return Promise.resolve(request.user);
    } else {
      return Promise.reject();
    }
  }
}
