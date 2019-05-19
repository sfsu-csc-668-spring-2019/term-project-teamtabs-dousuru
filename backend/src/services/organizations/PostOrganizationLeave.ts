import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { OrganizationManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";
import { OrganizationHandler } from "../../socket/handlers";

export class PostOrganizationLeave extends AuthenticatedService {
  public getRoute(): string {
    return "POST /leave/:id";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { id }
      } = request;
      this.validate(id, request)
        .then(_ =>
          OrganizationManager.removeOrganizationUser(id, request.user.id)
        )
        .then(result => {
          OrganizationHandler.getInstance().update(id, result);
          response.sendStatus(200);
        })
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(id: number, request: AuthRequest): Promise<any> {
    if (!request.user || !id) {
      return Promise.reject();
    }
    return Promise.resolve();
  }
}
