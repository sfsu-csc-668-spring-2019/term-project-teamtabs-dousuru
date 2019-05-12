import { Request, Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { ListManager, UserManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";

export class PostListDelete extends AuthenticatedService {
  public getRoute(): string {
    return "POST /list/:listId/delete";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { listId }
      } = request;
      this.validate(listId, request)
        .then(_ => {
          ListManager.remove(listId).then(results => {
            response.json(results);
          });
        })
        .catch(err => response.json(err));
    };
  }

  public validate(listId: number, request: AuthRequest): Promise<void> {
    if (!request.user || !listId) {
      return Promise.reject();
    } else {
      UserManager.checkListManage(request.user.id, listId).then(results => {
        if (results) return Promise.resolve();
        return Promise.reject();
      });
    }
  }
}
