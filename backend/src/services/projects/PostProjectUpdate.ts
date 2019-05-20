import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import {
  ListQueries,
  ProjectQueries,
  PermissionQueries,
  OrganizationQueries
} from "../../queries";
import { AuthRequest } from "../../types/AuthRequest";
import {
  ListHandler,
  ProjectHandler,
  OrganizationHandler
} from "../../socket/handlers";

export class PostProjectUpdate extends AuthenticatedService {
  public getRoute(): string {
    return "POST /update/:projectId";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { projectId },
        body: { name, description, isPublic }
      } = request;
      this.validate(projectId, request)
        .then(() =>
          ProjectQueries.updateProject(projectId, name, description, isPublic)
        )
        .then(updatedProject => {
          response.json(updatedProject);
        })
        .catch(err => response.sendStatus(500));
    };
  }

  public validate(projectId: number, request: AuthRequest): Promise<void> {
    if (!request.user || !projectId) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }

  public checkPermission(
    projectId: number,
    request: AuthRequest
  ): Promise<any> {
    return PermissionQueries.checkProjectManage(
      request.user.id,
      projectId
    ).then(results => {
      if (results) return Promise.resolve(results);
      return Promise.reject();
    });
  }
}
