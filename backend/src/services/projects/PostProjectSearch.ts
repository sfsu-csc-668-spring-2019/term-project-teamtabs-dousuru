import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { ProjectManager, UserManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";
import authenticate from "../../middleware/authMiddleware";

export class PostProjectSearch implements IService {
  public getRoute(): string {
    return "POST /id/:projectId/search";
  }

  public execute(): IMiddlewareFunction {
    return (request: Request, response: Response, __: NextFunction) => {
      const {
        body: { name },
        params: { projectId }
      } = request;
      authenticate(
        request,
        response,
        (request: AuthRequest, response: Response) => {
          this.validate(projectId, name, request)
            .then(response.json)
            .catch(_ => response.sendStatus(500));
        }
      );
    };
  }

  public validate(
    projectId: number,
    name: string,
    request: AuthRequest
  ): Promise<JSON> {
    if (request.user) {
      UserManager.getUserHasAccessToProject(request.user.id, projectId).then(
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
