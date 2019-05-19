import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { ListQueries, TaskQueries, PermissionQueries } from "../../queries";
import { AuthRequest } from "../../types/AuthRequest";
import { ListHandler } from "../../socket/handlers";

export class DeleteTask extends AuthenticatedService {
  public getRoute(): string {
    return "DELETE :taskId";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { taskId }
      } = request;
      this.validate(taskId, request)
        .then(_ => {
          TaskQueries.getTaskData(taskId).then(task => {
            const listId = task.baseList.id;
            TaskQueries.remove(taskId).then(results => {
              ListQueries.getTasks(listId).then(tasks => {
                ListHandler.getInstance().updateTasks(listId.toString(), tasks);
                response.json(results);
              });
            });
          });
        })
        .catch(err => response.json(err));
    };
  }

  public validate(taskId: number, request: AuthRequest): Promise<void> {
    if (!request.user || !taskId) {
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
