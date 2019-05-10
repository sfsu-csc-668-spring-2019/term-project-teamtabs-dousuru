import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { MessageManager, UserManager } from "../../controllers";
import { Message } from "../../entity";
import authenticate from "../../middleware/authMiddleware";
import { AuthRequest } from "../../types/AuthRequest";

export class PutProjectChatlogData implements IService {
  public getRoute(): string {
    return "PUT /id/:projectId/chatlog";
  }

  public execute(): IMiddlewareFunction {
    return (request: Request, response: Response, __: NextFunction) => {
      const {
        body: { partitions, updateId },
        params: { projectId }
      } = request;
      authenticate(
        request,
        response,
        (request: AuthRequest, response: Response) => {
          this.validate(projectId, partitions, updateId, request)
            .then(response.json)
            .catch(_ => response.sendStatus(500));
        }
      );
    };
  }

  public validate(
    projectId: number,
    partitions: any[],
    updateId: number,
    request: AuthRequest
  ): Promise<Message> {
    if (request.user) {
      UserManager.getUserHasAccessToProject(request.user.id, projectId).then(
        userIsMember => {
          if (userIsMember) {
            if (undefined !== updateId) {
              return Promise.resolve(
                MessageManager.updateMessage(updateId, partitions)
              );
            }
            return Promise.resolve(
              MessageManager.createProjectMessage(
                request.user.id,
                projectId,
                partitions
              )
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
