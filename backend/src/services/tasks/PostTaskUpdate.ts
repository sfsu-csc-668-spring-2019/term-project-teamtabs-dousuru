import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { TaskQueries, ListQueries, PermissionQueries } from "../../queries";
import { AuthRequest } from "../../types/AuthRequest";
import { ListHandler, TaskHandler } from "../../socket/handlers";

export class PostTaskUpdate extends AuthenticatedService {
  public getRoute(): string {
    return "POST /update/:taskId";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { taskId },
        body: { description, name, completed }
      } = request;
      this.validate(taskId, request)
        .then(_ => this.checkPermission(taskId, request))
        .then(_ => TaskQueries.updateTask(taskId, name, description, completed))
        .then(updatedTask => response.json(updatedTask))
        .catch(err => {
          console.log(err);
          response.sendStatus(500);
        });
    };
    /*{
          const listId = updatedTask.baseList.id;
          ListQueries.getTasks(listId).then(tasks => {
            ListHandler.getInstance().updateTasks(listId.toString(), tasks);
            TaskHandler.getInstance().update(taskId, updatedTask);
            response.json(updatedTask);
          });
        })
        .catch(err => response.json(err));
    };
    */
  }

  public validate(taskId: number, request: AuthRequest): Promise<void> {
    if (!request.user || !taskId) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }

  public checkPermission(taskId: number, request: AuthRequest): Promise<void> {
    return PermissionQueries.checkTaskManage(request.user.id, taskId).then(
      results => {
        if (results) return Promise.resolve();
        return Promise.reject();
      }
    );
  }
}
