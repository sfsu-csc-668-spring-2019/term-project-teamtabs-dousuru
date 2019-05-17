import { Request, Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { TaskManager, UserManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";

export class GetTaskData extends AuthenticatedService {
  public getRoute(): string {
    return "GET /id/:taskId";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: Request, response: Response, __: NextFunction) => {
      const {
        params: { taskId }
      } = request;
      this.validate(taskId, request);
      TaskManager.getTaskData(taskId)
        .then(task => {
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
