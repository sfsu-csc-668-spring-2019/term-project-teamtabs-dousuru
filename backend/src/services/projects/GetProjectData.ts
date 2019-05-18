import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { UserManager, ProjectManager } from "../../controllers";
import { Project } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";

export class GetProjectData extends AuthenticatedService {
  public getRoute(): string {
    return "GET /id/:projectId";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { projectId }
      } = request;
      (request: AuthRequest, response: Response) =>
        this.validate(request, projectId)
          .then(response.json)
          .catch(_ => response.sendStatus(500));
    };
  }

  public validate(request: AuthRequest, projectId: number): Promise<Project> {
    if (request.user) {
      UserManager.checkProjectPermission(request.user.id, projectId).then(
        userCanAccess => {
          if (userCanAccess) {
            return Promise.resolve(ProjectManager.getProject(projectId));
          } else {
            return Promise.reject();
          }
        }
      );
    } else {
      return Promise.reject();
    }
  }
}
