import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { UserManager, OrganizationManager } from "../../controllers";
import { Organization } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";

export class GetOrganizationData extends AuthenticatedService {
  public getRoute(): string {
    return "GET /:id";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { id }
      } = request;
      this.validate(request, id)
        .then(_ => OrganizationManager.getOrganization(id))
        .then(organization => response.json(organization))
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(request: AuthRequest, id: number): Promise<any> {
    if (!request.user || !id) {
      return Promise.reject();
    } else {
      UserManager.checkOrganizationPermission(request.user.id, id).then(
        results => {
          if (results) return Promise.resolve();
          return Promise.reject();
        }
      );
    }
  }
}
