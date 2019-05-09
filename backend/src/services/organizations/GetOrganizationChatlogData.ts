import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { MessageManager } from "../../controllers";
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
        (request: AuthRequest, response: Response) => {
          if (request.user) {
            this.validate(organizationId).then(response.json);
          } else {
            response.sendStatus(500);
          }
        }
      ).catch(_ => response.sendStatus(500));
    };
  }

  public validate(organizationId: number): Promise<Message[]> {
    return Promise.resolve(
      MessageManager.getOrganizationMessages(organizationId)
    );
  }
}
