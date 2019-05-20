import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { TaskQueries, ListQueries, PermissionQueries } from "../../queries";
import { AuthRequest } from "../../types/AuthRequest";
import { ListHandler, TaskHandler } from "../../socket/handlers";

export class PostUpdateTaskDescription extends AuthenticatedService {
  public getRoute(): string {
    return "POST /updateDescription/:taskId";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { taskId },
        body: { description }
      } = request;
      this.validate(taskId, description, request)
        .then(_ => {
          TaskQueries.updateDescription(description, taskId).then(results => {
            const listId = results.baseListId;
            ListQueries.getTasks(listId).then(tasks => {
              ListHandler.getInstance().updateTasks(listId, tasks);
              TaskHandler.getInstance().update(taskId, results);
              response.json(results);
            });
          });
        })
        .catch(err => response.json(err));
    };
  }

  public validate(
    taskId: number,
    description: string,
    request: AuthRequest
  ): Promise<void> {
    if (!request.user || !taskId || !description) {
      return Promise.reject();
    } else {
      PermissionQueries.checkTaskManage(request.user.id, taskId).then(
        results => {
          if (results) return Promise.resolve();
          return Promise.reject();
        }
      );
    }
  }
}
