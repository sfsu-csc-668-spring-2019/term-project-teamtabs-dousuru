import { Request, Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { ListManager, UserManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";

export class PostListCreate extends AuthenticatedService {
  public getRoute(): string {
    return "POST /create";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        body: { name, description, projectId }
      } = request;
      this.validate(name, description, projectId, request)
        .then(_ => {
          ListManager.createList(name, description, projectId).then(list => {
            response.json(list);
          });
        })
        .catch(err => {
          response.json(err);
        });
    };
  }

  public validate(
    name: string,
    description: string,
    projectId: number,
    request: AuthRequest
  ): Promise<void> {
    if (!request.user || !name || !description || !projectId) {
      return Promise.reject();
    } else {
      UserManager.getUserHasAccessToProject(request.user.id, projectId).then(
        results => {
          if (results) return Promise.resolve();
          return Promise.reject();
        }
      );
    }
  }
}
