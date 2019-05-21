import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { UserQueries } from "../../queries";
import { AuthRequest } from "../../types/AuthRequest";
import { User } from "../../entity";

export class GetUserContact extends AuthenticatedService {
  public getRoute(): string {
    return "GET /id/:userId/chatlog/";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { userId: ownerId }
      } = request;
      this.validate(ownerId, request)
        .then(response.json)
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(ownerId: number, request: AuthRequest): Promise<User[]> {
    if (request.user && request.user.id === ownerId) {
      return Promise.resolve(UserQueries.getContacts(ownerId));
    } else {
      return Promise.reject();
    }
  }
}
