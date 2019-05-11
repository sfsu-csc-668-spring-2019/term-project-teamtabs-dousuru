import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { MessageManager } from "../../controllers";
import { Message } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";

export class PutUserChatlogData extends AuthenticatedService {
  public getRoute(): string {
    return "PUT /id/:userId/chatlog/id/:chatId";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        body: { partitions, updateId },
        params: { userId: ownerId, chatId: receiverId }
      } = request;
      this.validate(ownerId, receiverId, partitions, updateId, request)
        .then(response.json)
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(
    ownerId: number,
    receiverId: number,
    partitions: any[],
    updateId: number,
    request: AuthRequest
  ): Promise<Message> {
    if (request.user && request.user.id === ownerId) {
      if (undefined !== updateId) {
        return Promise.resolve(
          MessageManager.updateMessage(updateId, partitions)
        );
      }
      return Promise.resolve(
        MessageManager.createUserMessage(ownerId, receiverId, partitions)
      );
    } else {
      return Promise.reject();
    }
  }
}
