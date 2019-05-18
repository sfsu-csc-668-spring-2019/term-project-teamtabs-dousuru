import { Request, Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { ListManager, UserManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";

export class PostListUpdate extends AuthenticatedService {
  public getRoute(): string {
    return "POST /update/:listId";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { listId },
        body: { name, description }
      } = request;
      this.validate(listId, name, description, request)
        .then(_ => {
          ListManager.update(name, description, listId).then(results => {
            response.json(results);
          });
        })
        .catch(err => response.json(err));
    };
  }

  public validate(
    listId: number,
    name: string,
    description: string,
    request: AuthRequest
  ): Promise<void> {
    if (!request.user || !listId || !name || !description) {
      return Promise.reject();
    } else {
      UserManager.checkListManage(request.user.id, listId).then(results => {
        if (results) return Promise.resolve();
        return Promise.reject();
      });
    }
  }
}