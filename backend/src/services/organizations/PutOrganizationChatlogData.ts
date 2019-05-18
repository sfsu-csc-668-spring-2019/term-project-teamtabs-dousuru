import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { MessageManager, OrganizationManager } from "../../controllers";
import { Message } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";

export class PutOrganizationChatlogData extends AuthenticatedService {
  public getRoute(): string {
    return "PUT /id/:organizationId/chatlog";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        body: { partitions, updateId },
        params: { organizationId }
      } = request;
      this.validate(organizationId, partitions, updateId, request)
        .then(response.json)
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(
    organizationId: number,
    partitions: any[],
    updateId: number,
    request: AuthRequest
  ): Promise<Message> {
    if (request.user) {
      OrganizationManager.userIsAuthorized(
        request.user.id,
        organizationId
      ).then(userIsAuthorized => {
        if (userIsAuthorized) {
          if (undefined !== updateId) {
            return Promise.resolve(
              MessageManager.updateMessage(updateId, partitions)
            );
          }
          return Promise.resolve(
            MessageManager.createOrganizationMessage(
              request.user.id,
              organizationId,
              partitions
            )
          );
        } else {
          return Promise.reject();
        }
      });
    } else {
      return Promise.reject();
    }
  }
}
