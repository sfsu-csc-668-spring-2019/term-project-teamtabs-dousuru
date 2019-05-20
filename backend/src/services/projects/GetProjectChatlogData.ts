import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { MessageQueries, PermissionQueries } from "../../queries";
import { AuthRequest } from "../../types/AuthRequest";

export class GetProjectChatlogData extends AuthenticatedService {
  public getRoute(): string {
    return "GET /chatlog/:id";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { id }
      } = request;
      this.validate(request, id)
        // .then(_ => this.checkPermission(request, id))
        .then(_ => MessageQueries.getProjectMessages(id))
        .then(messages => {
          console.log(messages);
          return messages;
        })
        .then(messages => response.json(messages))
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(request: AuthRequest, id: number): Promise<any> {
    if (!request.user || !id) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }

  public checkPermission(request: AuthRequest, id: number): Promise<any> {
    return PermissionQueries.checkProjectPermission(request.user.id, id).then(
      userHasPermission => {
        if (userHasPermission) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      }
    );
  }
}
