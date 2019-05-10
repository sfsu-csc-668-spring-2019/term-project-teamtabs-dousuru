import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { MessageManager, UserManager } from "../../controllers";
import { Message } from "../../entity";
import authenticate from "../../middleware/authMiddleware";
import { AuthRequest } from "../../types/AuthRequest";

export class GetProjectChatlogData implements IService {
  public getRoute(): string {
    return "GET /id/:projectId/chatlog";
  }

  public execute(): IMiddlewareFunction {
    return (request: Request, response: Response, __: NextFunction) => {
      const {
        params: { projectId }
      } = request;
      authenticate(
        request,
        response,
        (request: AuthRequest, response: Response) =>
          this.validate(request, projectId)
            .then(response.json)
            .catch(_ => response.sendStatus(500))
      );
    };
  }

  public validate(request: AuthRequest, projectId: number): Promise<Message[]> {
    if (request.user) {
      UserManager.getUserHasAccessToProject(request.user.id, projectId).then(
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
