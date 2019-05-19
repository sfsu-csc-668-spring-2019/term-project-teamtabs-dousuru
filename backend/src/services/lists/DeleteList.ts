import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { ListQueries, ProjectQueries, PermissionQueries } from "../../queries";
import { AuthRequest } from "../../types/AuthRequest";
import { ProjectHandler } from "../../socket/handlers";

export class DeleteList extends AuthenticatedService {
  public getRoute(): string {
    return "DELETE /:listId";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { listId, projectId }
      } = request;
      this.validate(listId, request)
        .then(_ =>
          ListQueries.getListData(listId).then(list => {
            const projectId = list.baseProject.id;
            ListQueries.remove(listId).then(results =>
              ProjectQueries.getLists(projectId).then(lists => {
                ProjectHandler.getInstance().updateLists(
                  projectId.toString(),
                  lists
                );
                response.json(results);
              })
            );
          })
        )
        .catch(err => response.json(err));
    };
  }

  public validate(listId: number, request: AuthRequest): Promise<void> {
    if (!request.user || !listId) {
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
