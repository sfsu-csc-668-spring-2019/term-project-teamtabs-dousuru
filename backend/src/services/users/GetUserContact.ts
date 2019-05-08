import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { UserManager } from "../../controllers";
import authenticate from "../../middleware/authMiddleware";
import { AuthRequest } from "../../types/AuthRequest";

export class GetUserContact implements IService {
  public getRoute(): string {
    return "GET /id/:userId/chatlog/";
  }

  public execute(): IMiddlewareFunction {
    return (request: Request, response: Response, __: NextFunction) => {
      const {
        body: { ownerId }
      } = request;
      authenticate(
        request,
        response,
        (request: AuthRequest, response: Response) => {
          this.validate(ownerId, request)
            .then(response.json)
            .catch(_ => response.sendStatus(500));
        }
      );
    };
  }

  public validate(ownerId: number, request: AuthRequest): Promise<JSON[]> {
    if (request.user && request.user.id === ownerId) {
      return Promise.resolve(UserManager.getContacts(ownerId));
    } else {
      return Promise.reject();
    }
  }
}
