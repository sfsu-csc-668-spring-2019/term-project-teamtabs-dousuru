import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { MessageManager } from "../../controllers";
import { Message } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";

export class GetUserChatlogData extends AuthenticatedService {
  public getRoute(): string {
    return "GET /id/:userId/chatlog/id/:chatId";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { userId: ownerId, chatId: receiverId }
      } = request;
      this.validate(ownerId, receiverId, request)
        .then(response.json)
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(
    ownerId: number,
    receiverId: number,
    request: AuthRequest
  ): Promise<Message[]> {
    if (request.user && request.user.id === ownerId) {
      return Promise.resolve(
        MessageManager.getUserMessages(ownerId, receiverId)
      );
    } else {
      return Promise.reject();
    }
  }
}
