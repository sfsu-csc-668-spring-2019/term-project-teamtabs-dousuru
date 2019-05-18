import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { MessageManager, UserManager } from "../../controllers";
import { Message } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";

export class PutProjectChatlogData extends AuthenticatedService {
  public getRoute(): string {
    return "PUT /id/:projectId/chatlog";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        body: { partitions, updateId },
        params: { projectId }
      } = request;
      this.validate(projectId, partitions, updateId, request)
        .then(response.json)
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(
    projectId: number,
    partitions: any[],
    updateId: number,
    request: AuthRequest
  ): Promise<Message> {
    if (request.user) {
      UserManager.checkOrganizationPost(request.user.id, projectId).then(
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
