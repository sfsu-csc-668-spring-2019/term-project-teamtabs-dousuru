import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { UserManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";

export class PostUserSearchContents extends AuthenticatedService {
  public getRoute(): string {
    return "POST /id/:userId/search";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        body: { name },
        params: { userId }
      } = request;
      this.validate(userId, name)
        .then(response.json)
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(userId: number, name: string): Promise<JSON> {
    return Promise.resolve(UserManager.getContentsByName(userId, name));
  }
}
