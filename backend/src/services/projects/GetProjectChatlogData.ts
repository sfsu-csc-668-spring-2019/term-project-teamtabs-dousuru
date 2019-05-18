import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { MessageManager, UserManager } from "../../controllers";
import { Message } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";

export class GetProjectChatlogData extends AuthenticatedService {
  public getRoute(): string {
    return "GET /id/:projectId/chatlog";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { projectId }
      } = request;
      this.validate(request, projectId)
        .then(response.json)
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(request: AuthRequest, projectId: number): Promise<Message[]> {
    if (request.user) {
      UserManager.checkProjectPermission(request.user.id, projectId).then(
        userCanAccess => {
          if (userCanAccess) {
            return Promise.resolve(
              MessageManager.getProjectMessages(projectId)
            );
          } else {
            return Promise.reject();
          }
        }
      );
    } else {
      return Promise.reject();
    }
  }
}
