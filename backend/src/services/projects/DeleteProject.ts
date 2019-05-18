import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { ProjectManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";

export class DeleteProject extends AuthenticatedService {
  public getRoute(): string {
    return "DELETE /:id";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { id }
      } = request;
      this.validate(id, request)
        .then(_ => ProjectManager.deleteProject(request.user.id, id))
        .then(_ => response.sendStatus(200))
        .catch(_ => response.sendStatus(500));
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
