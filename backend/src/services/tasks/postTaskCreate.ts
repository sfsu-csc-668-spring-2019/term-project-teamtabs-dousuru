import { Request, Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { TaskManager, UserManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";

export class PostTaskCreate extends AuthenticatedService {
  public getRoute(): string {
    return "POST /create";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        body: { name, description, listId, dueDate }
      } = request;
      this.validate(name, description, listId, request)
        .then(_ => {
          TaskManager.createTask(name, description, listId, dueDate).then(
            task => {
              response.json(task);
            }
          );
        })
        .catch(err => {
          response.json(err);
        });
    };
  }

  public validate(
    dueDate: Date,
    description: string,
    listId: number,
    request: AuthRequest
  ): Promise<void> {
    if (!request.user || !name || !description || !listId) {
      return Promise.reject();
    } else {
      UserManager.checkListManage(request.user.id, listId).then(results => {
        if (results) return Promise.resolve();
        return Promise.reject();
      });
    }
  }
}
