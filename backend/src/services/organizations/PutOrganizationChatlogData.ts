import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { MessageManager, OrganizationManager } from "../../controllers";
import { Message } from "../../entity";
import authenticate from "../../middleware/authMiddleware";
import { AuthRequest } from "../../types/AuthRequest";

export class PutOrganizationChatlogData implements IService {
  public getRoute(): string {
    return "PUT /id/:organizationId/chatlog";
  }

  public execute(): IMiddlewareFunction {
    return (request: Request, response: Response, __: NextFunction) => {
      const {
        body: { partitions, updateId },
        params: { organizationId }
      } = request;
      authenticate(
        request,
        response,
        (request: AuthRequest, response: Response) => {
          this.validate(organizationId, partitions, updateId, request)
            .then(response.json)
            .catch(_ => response.sendStatus(500));
        }
      );
    };
  }

  public validate(
    organizationId: number,
    partitions: any[],
    updateId: number,
    request: AuthRequest
  ): Promise<Message> {
    if (request.user) {
      OrganizationManager.userBelongsToOrganization(
        request.user.id,
        organizationId
      ).then(userIsMember => {
        if (userIsMember) {
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
