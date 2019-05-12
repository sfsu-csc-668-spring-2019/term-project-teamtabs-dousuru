import { Request, Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { ListManager, UserManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";

export class PostListUpdateName extends AuthenticatedService {
  public getRoute(): string {
    return "POST /list/updateName/:listId";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { listId },
        body: { name }
      } = request;
      this.validate(listId, name, request)
        .then(_ => {
          ListManager.updateName(name, listId).then(results => {
            response.json(results);
          });
        })
        .catch(err => response.json(err));
    };
  }

  public validate(
    listId: number,
    name: string,
    request: AuthRequest
  ): Promise<void> {
    if (!request.user || !listId || !name) {
      return Promise.reject();
    } else {
      UserManager.checkListManage(request.user.id, listId).then(results => {
        if (results) return Promise.resolve();
        return Promise.reject();
      });
    }
  }
}
