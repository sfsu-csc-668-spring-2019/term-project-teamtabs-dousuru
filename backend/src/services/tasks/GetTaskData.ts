import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { TaskManager, UserManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";
import { TaskHandler } from "../../socket/handlers";

export class GetTaskData extends AuthenticatedService {
  public getRoute(): string {
    return "GET /id/:taskId";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { taskId },
        user
      } = request;
      this.validate(taskId, request);
      TaskManager.getTaskData(taskId)
        .then(task => {
          TaskHandler.getInstance().join(
            taskId,
            user.id.toString(),
            user.username
          );
          response.json(task);
        })
        .catch(err => {
          response.json(err);
        });
    };
  }

  public validate(taskId: number, request: AuthRequest): Promise<void> {
    if (!request.user || !taskId) {
      return Promise.reject();
    } else {
      UserManager.checkTaskPermission(request.user.id, taskId).then(results => {
        if (results) return Promise.resolve();
        return Promise.reject();
      });
    }
  }
}
