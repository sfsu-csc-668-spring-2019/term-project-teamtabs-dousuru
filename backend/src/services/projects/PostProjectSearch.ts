import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { ProjectManager, UserManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";

export class PostProjectSearch extends AuthenticatedService {
  public getRoute(): string {
    return "POST /id/:projectId/search";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        body: { name },
        params: { projectId }
      } = request;
      this.validate(projectId, name, request)
        .then(response.json)
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(
    projectId: number,
    name: string,
    request: AuthRequest
  ): Promise<JSON> {
    if (request.user) {
      UserManager.checkProjectPermission(request.user.id, projectId).then(
        userHasAccess => {
          if (userHasAccess) {
            return Promise.resolve(
              ProjectManager.getContentsByName(projectId, name)
            );
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
