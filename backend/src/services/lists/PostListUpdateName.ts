import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { ListQueries, ProjectQueries, PermissionQueries } from "../../queries";
import { AuthRequest } from "../../types/AuthRequest";
import { ListHandler, ProjectHandler } from "../../socket/handlers";

export class PostListUpdateName extends AuthenticatedService {
  public getRoute(): string {
    return "POST /updateName/:listId";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { listId },
        body: { name }
      } = request;
      this.validate(listId, name, request)
        .then(_ => {
          ListQueries.updateName(name, listId).then(results => {
            const projectId = results.baseProjectId;
            ProjectQueries.getLists(projectId).then(data => {
              ProjectHandler.getInstance().updateLists(projectId, data);
              ListHandler.getInstance().update(results.id, results);
              response.json(results);
            });
          });
        })
        .catch(err => response.json(err));
    };
  }

  public validate(
    listId: number,
    name: string,
    request: AuthRequest
  ): Promise<void> {
    if (!request.user || !listId || !name) {
      return Promise.reject();
    } else {
      PermissionQueries.checkListManage(request.user.id, listId).then(
        results => {
          if (results) return Promise.resolve();
          return Promise.reject();
        }
      );
    }
  }
}
