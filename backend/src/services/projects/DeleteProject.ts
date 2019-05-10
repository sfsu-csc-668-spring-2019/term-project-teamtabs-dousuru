import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { ProjectManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";

export class DeleteProject extends AuthenticatedService {
  public getRoute(): string {
    return "DELETE /id/:projectId";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { projectId }
      } = request;
      this.validate(projectId, request)
        .then(_ => response.sendStatus(200))
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(projectId: number, request: AuthRequest): Promise<void> {
    if (request.user) {
      return Promise.resolve(
        ProjectManager.deleteProject(request.user.id, projectId)
      );
    } else {
      return Promise.reject();
    }
  }
}
