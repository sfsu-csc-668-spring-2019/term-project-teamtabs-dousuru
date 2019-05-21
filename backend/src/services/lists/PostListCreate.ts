import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { ListQueries, ProjectQueries, PermissionQueries } from "../../queries";
import { AuthRequest } from "../../types/AuthRequest";
import { ProjectHandler, ListHandler } from "../../socket/handlers";

export class PostListCreate extends AuthenticatedService {
  public getRoute(): string {
    return "POST /create";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        body: { name, description, projectId },
        user
      } = request;
      this.validate(name, description, projectId, request).then(_ => {
        ListQueries.createList(name, description, projectId)
          .then(list =>
            ProjectQueries.getLists(projectId).then(lists => {
              ProjectHandler.getInstance().join(
                projectId,
                user.id.toString(),
                user.username
              );
              ProjectHandler.getInstance().updateLists(projectId, lists);
              ListHandler.getInstance().join(
                list.id.toString(),
                user.id.toString(),
                user.username
              );
              response.json(list);
            })
          )
          .catch(err => {
            console.log(err);
            response.sendStatus(500);
          });
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
      return PermissionQueries.checkProjectManage(
        request.user.id,
        projectId
      ).then(results => {
        if (results) return Promise.resolve();
        return Promise.reject();
      });
    }
  }
}
