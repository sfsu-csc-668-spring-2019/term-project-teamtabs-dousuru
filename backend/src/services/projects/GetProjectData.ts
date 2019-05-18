import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { UserManager, ProjectManager } from "../../controllers";
import { Project } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";

export class GetProjectData extends AuthenticatedService {
  public getRoute(): string {
    return "GET /:id";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { id }
      } = request;
      (request: AuthRequest, response: Response) =>
        this.validate(request, id)
          .then(_ => this.checkPermission(request, id))
          .then(_ => ProjectManager.getProject(id))
          .then(project => response.json(project))
          .catch(_ => response.sendStatus(500));
    };
  }

  public validate(request: AuthRequest, id: number): Promise<any> {
    if (!request.user || !id) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }

  public checkPermission(request: AuthRequest, id: number): Promise<any> {
    return UserManager.checkProjectPermission(request.user.id, id).then(
      hasPermission => {
        if (hasPermission) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      }
    );
  }
}
