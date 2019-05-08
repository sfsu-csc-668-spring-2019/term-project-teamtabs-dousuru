import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { MessageManager } from "../../controllers";
import { Message } from "../../entity";
import authenticate from "../../middleware/authMiddleware";
import { AuthRequest } from "../../types/AuthRequest";

export class GetUserChatlogData implements IService {
  public getRoute(): string {
    return "GET /id/:userId/chatlog/id/:chatId";
  }

  public execute(): IMiddlewareFunction {
    return (request: Request, response: Response, __: NextFunction) => {
      const {
        body: { ownerId, receiverId }
      } = request;
      authenticate(
        request,
        response,
        (request: AuthRequest, response: Response) => {
          this.validate(ownerId, receiverId, request)
            .then(response.json)
            .catch(_ => response.sendStatus(500));
        }
      );
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
