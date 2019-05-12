import { Request, Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { ListManager, UserManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";

export class PostListUpdateDescription extends AuthenticatedService {
  public getRoute(): string {
    return "POST /list/updateDescription/:listId";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { listId },
        body: { description }
      } = request;
      this.validate(listId, description, request)
        .then(_ => {
          ListManager.updateDescription(description, listId).then(results => {
            response.json(results);
          });
        })
        .catch(err => response.json(err));
    };
  }

  public validate(
    listId: number,
    description: string,
    request: AuthRequest
  ): Promise<void> {
    if (!request.user || !listId || !description) {
      return Promise.reject();
    } else {
      UserManager.checkListManage(request.user.id, listId).then(results => {
        if (results) return Promise.resolve();
        return Promise.reject();
      });
    }
  }
}
