import { Request, Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { ListManager, UserManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";

export class GetListData extends AuthenticatedService {
  public getRoute(): string {
    return "GET /list/:listId";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: Request, response: Response, __: NextFunction) => {
      const {
        params: { listId }
      } = request;
      this.validate(listId, request);
      ListManager.getListData(listId)
        .then(list => {
          response.json(list);
        })
        .catch(err => {
          response.json(err);
        });
    };
  }

  public validate(listId: number, request: AuthRequest): Promise<void> {
    if (!request.user || !listId) {
      return Promise.reject();
    } else {
      UserManager.checkListPermission(request.user.id, listId).then(results => {
        if (results) return Promise.resolve();
        return Promise.reject();
      });
    }
  }
}
