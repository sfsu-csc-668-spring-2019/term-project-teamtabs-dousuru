import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { MessageManager, OrganizationManager } from "../../controllers";
import { Message } from "../../entity";
import authenticate from "../../middleware/authMiddleware";
import { AuthRequest } from "../../types/AuthRequest";

export class GetOrganizationChatlogData implements IService {
  public getRoute(): string {
    return "GET /id/:organizationId/chatlog";
  }

  public execute(): IMiddlewareFunction {
    return (request: Request, response: Response, __: NextFunction) => {
      const {
        params: { organizationId }
      } = request;
      authenticate(
        request,
        response,
        (request: AuthRequest, response: Response) =>
          this.validate(request, organizationId)
            .then(response.json)
            .catch(_ => response.sendStatus(500))
      );
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
