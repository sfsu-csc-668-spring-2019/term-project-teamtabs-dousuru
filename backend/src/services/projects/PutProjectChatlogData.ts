import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { MessageQueries, PermissionQueries } from "../../queries";
import { Message } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";
import { ProjectHandler } from "../../socket/handlers";

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
        .then(data => {
          ProjectHandler.getInstance().chat(projectId, data);
          response.sendStatus(200);
        })
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
      PermissionQueries.checkOrganizationPost(request.user.id, projectId).then(
        userIsMember => {
          if (userIsMember) {
            if (undefined !== updateId) {
              return Promise.resolve(
                MessageQueries.updateMessage(updateId, partitions)
              );
            }
            return Promise.resolve(
              MessageQueries.createProjectMessage(
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
