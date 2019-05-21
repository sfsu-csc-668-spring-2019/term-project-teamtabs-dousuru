import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { ProjectQueries, OrganizationQueries } from "../../queries";
import { AuthRequest } from "../../types/AuthRequest";
import { OrganizationHandler } from "../../socket/handlers";

export class DeleteProject extends AuthenticatedService {
  public getRoute(): string {
    return "DELETE /:id";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { id },
        user
      } = request;
      this.validate(id, request)
        .then(() => ProjectQueries.deleteProject(user.id, id))
        .then(() => response.sendStatus(200))
        .catch(err => {
          console.error(err);
          response.sendStatus(500);
        });
    };
  }

  public validate(id: number, request: AuthRequest): Promise<void> {
    if (!request.user || !id) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }
}
