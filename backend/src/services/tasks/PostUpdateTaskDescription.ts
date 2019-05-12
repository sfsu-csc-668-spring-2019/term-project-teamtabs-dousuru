import { Request, Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { TaskManager, UserManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";

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
          TaskManager.updateDescription(description, taskId).then(results => {
            response.json(results);
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
      UserManager.checkTaskManage(request.user.id, taskId).then(results => {
        if (results) return Promise.resolve();
        return Promise.reject();
      });
    }
  }
}
