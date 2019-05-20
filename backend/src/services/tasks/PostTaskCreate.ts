import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { TaskQueries, ListQueries, PermissionQueries } from "../../queries";
import { AuthRequest } from "../../types/AuthRequest";
import { ListHandler } from "../../socket/handlers";

export class PostTaskCreate extends AuthenticatedService {
  public getRoute(): string {
    return "POST /create";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        body: { name, description, listId }
      } = request;
      this.validate(name, description, listId, request)
        .then(_ => TaskQueries.createTask(name, description, listId))
        .then(task => response.json(task))
        // ListQueries.getTasks(listId).then(tasks => {
        //   ListHandler.getInstance().updateTasks(listId, tasks);
        .catch(err => response.json(500));
    };
  }

  public validate(
    name: string,
    description: string,
    listId: number,
    request: AuthRequest
  ): Promise<void> {
    if (!request.user || !name || !description || !listId) {
      return Promise.reject();
    } else {
      return Promise.resolve();
      PermissionQueries.checkListManage(request.user.id, listId).then(
        results => {
          if (results) return Promise.resolve();
          return Promise.reject();
        }
      );
    }
  }
}
