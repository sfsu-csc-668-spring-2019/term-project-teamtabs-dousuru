import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { MessageManager, OrganizationManager } from "../../controllers";
import { Message } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";

export class GetOrganizationChatlogData extends AuthenticatedService {
  public getRoute(): string {
    return "GET /id/:organizationId/chatlog";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { organizationId }
      } = request;
      this.validate(request, organizationId)
        .then(response.json)
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(
    request: AuthRequest,
    organizationId: number
  ): Promise<Message[]> {
    if (request.user) {
      OrganizationManager.userBelongsToOrganization(
        request.user.id,
        organizationId
      ).then(userIsMember => {
        if (userIsMember) {
          return Promise.resolve(
            MessageManager.getOrganizationMessages(organizationId)
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
