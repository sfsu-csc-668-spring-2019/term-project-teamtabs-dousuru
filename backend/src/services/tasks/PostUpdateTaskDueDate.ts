import { Request, Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { TaskManager, UserManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";

export class PostUpdateTaskDueDate extends AuthenticatedService {
  public getRoute(): string {
    return "POST /updateDueDate/:taskId";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { taskId },
        body: { date }
      } = request;
      this.validate(taskId, date, request)
        .then(_ => {
          TaskManager.updateDueDate(date, taskId).then(results => {
            response.json(results);
          });
        })
        .catch(err => response.json(err));
    };
  }

  public validate(
    taskId: number,
    date: Date,
    request: AuthRequest
  ): Promise<void> {
    if (!request.user || !taskId || !date) {
      return Promise.reject();
    } else {
      UserManager.checkTaskManage(request.user.id, taskId).then(results => {
        if (results) return Promise.resolve();
        return Promise.reject();
      });
    }
  }
}
