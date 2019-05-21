import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { ListQueries, PermissionQueries } from "../../queries";
import { AuthRequest } from "../../types/AuthRequest";
import { ListHandler } from "../../socket/handlers";

export class GetListData extends AuthenticatedService {
  public getRoute(): string {
    return "GET /id/:listId";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { listId },
        user
      } = request;
      this.validate(listId, request);
      ListQueries.getListData(listId)
        .then(list => {
          ListHandler.getInstance().join(
            listId,
            user.id.toString(),
            user.username
          );
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
      PermissionQueries.checkListPermission(request.user.id, listId).then(
        results => {
          if (results) return Promise.resolve();
          return Promise.reject();
        }
      );
    }
  }
}
